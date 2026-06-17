# AWS Certified Solutions Architect - Professional (SAP-C02) Content Validation Script
# This script scans the Docusaurus 'docs' folder to audit exam topic coverage and print a readiness report.

$docsPath = Join-Path $PSScriptRoot "..\docs"
if (-not (Test-Path $docsPath)) {
    Write-Error "Could not find docs directory at $docsPath"
    exit 1
}

# Define the checklist of critical exam topics and their keywords
$checklist = @(
    # Domain 1: Organizational Complexity
    @{ Category = "Org Complexity & Governance"; Topic = "AWS Organizations"; Keywords = @("organizations", "root account", "management account") },
    @{ Category = "Org Complexity & Governance"; Topic = "Service Control Policies (SCPs)"; Keywords = @("scp", "service control polic", "guardrail") },
    @{ Category = "Org Complexity & Governance"; Topic = "AWS Control Tower"; Keywords = @("control tower", "landing zone", "guardrail") },
    @{ Category = "Identity & Access"; Topic = "IAM Identity Center / SSO"; Keywords = @("identity center", "sso", "single sign-on") },
    @{ Category = "Identity & Access"; Topic = "SAML 2.0 WebSSO Federation"; Keywords = @("saml", "assumerolewithsaml", "idp") },
    @{ Category = "Identity & Access"; Topic = "SCIM Provisioning"; Keywords = @("scim", "provisioning", "synchroniz") },
    @{ Category = "Identity & Access"; Topic = "Confused Deputy & External ID"; Keywords = @("confused deputy", "externalid") },
    @{ Category = "Advanced Networking"; Topic = "VPC & Subnets"; Keywords = @("vpc", "subnet", "cidr", "route table") },
    @{ Category = "Advanced Networking"; Topic = "Transit Gateway"; Keywords = @("transit gateway", "tgw", "peering") },
    @{ Category = "Advanced Networking"; Topic = "Direct Connect (DX) & Failover"; Keywords = @("direct connect", "dx", "bgp", "as-path", "prepending") },
    @{ Category = "Advanced Networking"; Topic = "Route 53 Resolvers"; Keywords = @("inbound resolver", "outbound resolver", "forwarding rule") },

    # Domain 2: Design for New Solutions
    @{ Category = "Compute & Containers"; Topic = "Auto Scaling Groups (ASG)"; Keywords = @("auto scaling", "asg", "scaling policy") },
    @{ Category = "Compute & Containers"; Topic = "ECS / EKS"; Keywords = @("ecs", "eks", "fargate", "kubernetes") },
    @{ Category = "Compute & Containers"; Topic = "Serverless (Lambda / API Gateway)"; Keywords = @("lambda", "api gateway", "rest api") },
    @{ Category = "Data & Storage"; Topic = "Amazon S3 & Replication"; Keywords = @("s3", "glacier", "crr", "srr", "replication") },
    @{ Category = "Data & Storage"; Topic = "Amazon EBS & EFS"; Keywords = @("ebs", "efs", "provisioned iops", "max i/o") },
    @{ Category = "Data & Storage"; Topic = "Amazon FSx (Lustre / Windows)"; Keywords = @("fsx", "lustre", "ontap") },
    @{ Category = "Data & Databases"; Topic = "Amazon Aurora & Global DB"; Keywords = @("aurora", "global database", "write forwarding") },
    @{ Category = "Data & Databases"; Topic = "Amazon RDS & Proxy"; Keywords = @("rds", "rds proxy", "read replica") },
    @{ Category = "Data & Databases"; Topic = "Amazon DynamoDB & Global Tables"; Keywords = @("dynamodb", "global table", "dax", "wcu", "rcu") },
    @{ Category = "Data & Databases"; Topic = "Amazon Redshift & Resizing"; Keywords = @("redshift", "elastic resize", "classic resize") },
    @{ Category = "Infrastructure as Code"; Topic = "CloudFormation & StackSets"; Keywords = @("cloudformation", "stackset", "template") },

    # Domain 3: Continuous Improvement
    @{ Category = "Observability & Security"; Topic = "CloudWatch & CloudTrail"; Keywords = @("cloudwatch", "cloudtrail", "metric", "alarm") },
    @{ Category = "Observability & Security"; Topic = "AWS Config & Auditing"; Keywords = @("aws config", "compliance", "remediat") },
    @{ Category = "Observability & Security"; Topic = "KMS Encryption & Key Policies"; Keywords = @("kms", "key policy", "envelope encryption") },
    @{ Category = "Cost Optimization"; Topic = "Billing Conductor & Custom Pricing"; Keywords = @("billing conductor", "billing group") },
    @{ Category = "Cost Optimization"; Topic = "Savings Plans & RIs"; Keywords = @("savings plan", "reserved instance", "ri ") },
    @{ Category = "Cost Optimization"; Topic = "Cost Explorer & Budgets"; Keywords = @("cost explorer", "budgets", "anomaly detection") },
    @{ Category = "Fault Tolerance & DR"; Topic = "Disaster Recovery Strategies"; Keywords = @("pilot light", "warm standby", "active-active", "failover", "failback") },
    @{ Category = "Fault Tolerance & DR"; Topic = "AWS Elastic Disaster Recovery (DRS)"; Keywords = @("drs", "elastic disaster recovery", "staging area") },

    # Domain 4: Workload Migration & Modernization
    @{ Category = "Migrations"; Topic = "Migration Strategies (6Rs)"; Keywords = @("rehost", "replatform", "refactor", "6r") },
    @{ Category = "Migrations"; Topic = "Discovery (ADS)"; Keywords = @("application discovery", "ads ", "dependency map") },
    @{ Category = "Migrations"; Topic = "Server Migration (MGN)"; Keywords = @("application migration", "mgn", "replication agent") },
    @{ Category = "Migrations"; Topic = "Database Migration (DMS & SCT)"; Keywords = @("database migration", "dms", "sct", "schema conversion") },
    @{ Category = "Migrations"; Topic = "Online Data Transfer (DataSync / Snow)"; Keywords = @("datasync", "snowball", "snowcone") }
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "      AWS SAP-C02 EXAM PREP CONTENT VALIDATION AUDIT      " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Scanning documentation files under: $docsPath`n" -ForegroundColor Yellow

# Get all markdown files
$mdFiles = Get-ChildItem -Path $docsPath -Filter *.md -Recurse
if ($mdFiles.Count -eq 0) {
    Write-Error "No markdown files found in $docsPath!"
    exit 1
}

# Read content of all files into memory
$fileContents = @()
foreach ($file in $mdFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $fileContents += [PSCustomObject]@{
        Name = $file.Name
        FullName = $file.FullName
        Content = $content
        Length = $file.Length
    }
}

$coveredCount = 0
$results = @()

foreach ($item in $checklist) {
    $found = $false
    $matchingKeywords = @()
    
    # Check if any keyword matches across any file content
    foreach ($file in $fileContents) {
        foreach ($kw in $item.Keywords) {
            if ($file.Content -match "(?i)$([regex]::Escape($kw))") {
                $found = $true
                if ($matchingKeywords -notcontains $kw) {
                    $matchingKeywords += $kw
                }
            }
        }
    }
    
    if ($found) {
        $coveredCount++
        $status = "COVERED"
        $color = "Green"
    } else {
        $status = "MISSING"
        $color = "Red"
    }
    
    $results += [PSCustomObject]@{
        Category = $item.Category
        Topic = $item.Topic
        Status = $status
        Color = $color
        Details = ($matchingKeywords -join ", ")
    }
}

# Structural audits
$mermaidCount = 0
$tipsCount = 0
$trapsCount = 0
$tablesCount = 0

foreach ($file in $fileContents) {
    if ($file.Content) {
        $matchesMermaid = [regex]::Matches($file.Content, "(?s)```mermaid")
        $mermaidCount += $matchesMermaid.Count

        $matchesTips = [regex]::Matches($file.Content, "(?i)(:::tip|> \[!TIP\])")
        $tipsCount += $matchesTips.Count

        $matchesTraps = [regex]::Matches($file.Content, "(?i)(:::warning|> \[!WARNING\])")
        $trapsCount += $matchesTraps.Count

        $matchesSeparators = [regex]::Matches($file.Content, "(?m)^\|\s*:?-+:?\s*\|")
        $tablesCount += $matchesSeparators.Count
    }
}

# Calculate Score
$score = [Math]::Round(($coveredCount / $checklist.Count) * 100, 2)

# Print Detailed Table to Console
$results | Group-Object Category | ForEach-Object {
    Write-Host "`n--- Category: $($_.Name) ---" -ForegroundColor White
    foreach ($r in $_.Group) {
        if ($r.Status -eq "COVERED") {
            Write-Host " [v] $($r.Topic.PadRight(40)) : COVERED (Matched: $($r.Details))" -ForegroundColor Green
        } else {
            Write-Host " [x] $($r.Topic.PadRight(40)) : MISSING" -ForegroundColor Red
        }
    }
}

Write-Host "`n--- Structural Features Audit ---" -ForegroundColor White
Write-Host " Mermaid Architecture Diagrams : $mermaidCount found" -ForegroundColor Green
Write-Host " Exam Tip Callouts (> [!TIP])  : $tipsCount found" -ForegroundColor Green
Write-Host " Common Exam Traps (> [!WARNING]): $trapsCount found" -ForegroundColor Green
Write-Host " Service Comparison Tables     : $tablesCount found" -ForegroundColor Green

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "                    AUDIT SUMMARY                         " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Total Exam Topics Checked : $($checklist.Count)"
Write-Host "Covered Topics            : $coveredCount"
Write-Host "Missing Topics            : $($checklist.Count - $coveredCount)"

if ($score -ge 90) {
    Write-Host "Readiness Score           : $score% (Excellent!)" -ForegroundColor Green
} elseif ($score -ge 75) {
    Write-Host "Readiness Score           : $score% (Good - close to complete)" -ForegroundColor Yellow
} else {
    Write-Host "Readiness Score           : $score% (Needs improvement)" -ForegroundColor Red
}

# Generate Markdown Audit Report file in the workspace root
$reportPath = Join-Path $PSScriptRoot "..\exam_prep_audit_report.md"
$reportMD = @"
# AWS Solutions Architect Professional (SAP-C02) Content Audit Report

Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Readiness Score: **$score%** ($coveredCount / $($checklist.Count) topics covered)

## Structural Features Audit
- **Mermaid Diagrams:** $mermaidCount found
- **Exam Tips (:::tip):** $tipsCount found
- **Common Exam Traps (:::warning):** $trapsCount found
- **Comparison Tables:** $tablesCount found

## Coverage Summary by Domain

"@

$results | Group-Object Category | ForEach-Object {
    $reportMD += "`n### Category: $($_.Name)`n`n"
    $reportMD += "| Topic | Status | Matched Keywords |`n| :--- | :--- | :--- |`n"
    foreach ($r in $_.Group) {
        $statusBadge = if ($r.Status -eq "COVERED") { "[COVERED]" } else { "[MISSING]" }
        $reportMD += "| $($r.Topic) | $statusBadge | $($r.Details) |`n"
    }
}

$reportMD | Out-File -FilePath $reportPath -Encoding UTF8
Write-Host "`nDetailed Markdown audit report written to: $reportPath" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
