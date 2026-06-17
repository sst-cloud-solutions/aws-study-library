# AWS Certified Solutions Architect - Associate (SAA-C03) Content Validation Script
# This script scans the Docusaurus 'docs/01-solutions-architect-associate' folder to audit exam topic coverage and print a readiness report.

$docsPath = Join-Path $PSScriptRoot "..\docs\01-solutions-architect-associate"
if (-not (Test-Path $docsPath)) {
    Write-Error "Could not find SAA-C03 docs directory at $docsPath"
    exit 1
}

# Define the checklist of critical SAA-C03 exam topics and their keywords
$checklist = @(
    # Domain 1: Design Secure Architectures (30%)
    @{ Category = "Secure Architectures"; Topic = "VPC Security (SGs vs NACLs)"; Keywords = @("security group", "network access control", "nacl", "stateless", "stateful") },
    @{ Category = "Secure Architectures"; Topic = "IAM & Principal Policies"; Keywords = @("iam policy", "least privilege", "iam user", "iam role", "assume-role") },
    @{ Category = "Secure Architectures"; Topic = "Data Protection & KMS"; Keywords = @("kms", "envelope encryption", "generatedatakey", "key policy", "secrets manager", "parameter store") },
    @{ Category = "Secure Architectures"; Topic = "Infrastructure Defense (WAF/Shield)"; Keywords = @("waf", "shield", "firewall manager", "guardduty", "ddos") },

    # Domain 2: Design Resilient Architectures (26%)
    @{ Category = "Resilient Architectures"; Topic = "High Availability Compute (ELB & ASG)"; Keywords = @("load balancer", "elb", "auto scaling", "asg", "multi-az") },
    @{ Category = "Resilient Architectures"; Topic = "Resilient Storage (S3 Replication)"; Keywords = @("s3", "replication", "crr", "srr", "versioning") },
    @{ Category = "Resilient Architectures"; Topic = "Disaster Recovery (DR) & Backup"; Keywords = @("disaster recovery", "backup", "rto", "rpo", "pilot light", "warm standby") },
    @{ Category = "Resilient Architectures"; Topic = "Route 53 Routing Policies"; Keywords = @("route 53", "routing policy", "failover", "latency routing", "geolocation") },

    # Domain 3: Design High-Performing Architectures (24%)
    @{ Category = "High-Performing Architectures"; Topic = "High-Performance Storage (EBS/EFS/FSx)"; Keywords = @("ebs", "efs", "fsx", "lustre", "provisioned iops", "throughput") },
    @{ Category = "High-Performing Architectures"; Topic = "High-Performance Database (RDS/Aurora/DAX)"; Keywords = @("rds", "aurora", "read replica", "dynamodb", "dax", "cache") },
    @{ Category = "High-Performing Architectures"; Topic = "Scalable Serverless Compute"; Keywords = @("lambda", "api gateway", "serverless", "fargate", "ecs", "eks") },
    @{ Category = "High-Performing Architectures"; Topic = "Data Analytics (Athena/Kinesis/Glue)"; Keywords = @("athena", "kinesis", "data stream", "firehose", "glue", "emr") },

    # Domain 4: Design Cost-Optimized Architectures (20%)
    @{ Category = "Cost-Optimized Architectures"; Topic = "S3 Storage Classes & Lifecycles"; Keywords = @("storage class", "lifecycle rule", "intelligent-tiering", "glacier") },
    @{ Category = "Cost-Optimized Architectures"; Topic = "Cost-Effective Compute (Spot/Savings Plans)"; Keywords = @("spot instance", "savings plan", "reserved instance", "ri ") },
    @{ Category = "Cost-Optimized Architectures"; Topic = "Cost-Effective Database Configuration"; Keywords = @("aurora serverless", "on-demand", "provisioned capacity") },
    @{ Category = "Cost-Optimized Architectures"; Topic = "Billing & Cost Monitoring Tools"; Keywords = @("cost explorer", "budgets", "organizations", "consolidated billing", "billing conductor") }
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "      AWS SAA-C03 EXAM PREP CONTENT VALIDATION AUDIT      " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Scanning documentation files under: $docsPath`n" -ForegroundColor Yellow

# Get all markdown files under SAA-C03
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

        $matchesTips = [regex]::Matches($file.Content, "(?i)(:::tip|> \[!TIP\]|exam tip)")
        $tipsCount += $matchesTips.Count

        $matchesTraps = [regex]::Matches($file.Content, "(?i)(:::warning|> \[!WARNING\]|common exam traps)")
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
            Write-Host " [v] $($r.Topic.PadRight(45)) : COVERED (Matched: $($r.Details))" -ForegroundColor Green
        } else {
            Write-Host " [x] $($r.Topic.PadRight(45)) : MISSING" -ForegroundColor Red
        }
    }
}

Write-Host "`n--- Structural Features Audit ---" -ForegroundColor White
Write-Host " Mermaid Architecture Diagrams : $mermaidCount found" -ForegroundColor Green
Write-Host " Exam Tips Callouts / Sections : $tipsCount found" -ForegroundColor Green
Write-Host " Common Exam Traps Callouts    : $trapsCount found" -ForegroundColor Green
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
$reportPath = Join-Path $PSScriptRoot "..\saa_exam_prep_audit_report.md"
$reportMD = @"
# AWS Certified Solutions Architect Associate (SAA-C03) Content Audit Report

Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Readiness Score: **$score%** ($coveredCount / $($checklist.Count) topics covered)

## Structural Features Audit
- **Mermaid Diagrams:** $mermaidCount found
- **Exam Tips:** $tipsCount found
- **Common Exam Traps:** $trapsCount found
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
