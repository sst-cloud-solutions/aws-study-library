# AWS Certified Developer - Associate (DVA-C02) Content Validation Script
# This script scans the Docusaurus 'docs/Developer Associate' folder to audit exam topic coverage and print a readiness report.

$docsPath = Join-Path $PSScriptRoot "..\docs\Developer Associate"
if (-not (Test-Path $docsPath)) {
    Write-Error "Could not find DVA-C02 docs directory at $docsPath"
    exit 1
}

# Define the checklist of critical DVA-C02 exam topics and their keywords
$checklist = @(
    # Domain 1: Development with AWS Services
    @{ Category = "Development with AWS Services"; Topic = "Lambda Execution Context & Lifecycle"; Keywords = @("execution context", "cold start", "warm start", "layers", "handler") },
    @{ Category = "Development with AWS Services"; Topic = "Lambda Invocation Models"; Keywords = @("synchronous", "asynchronous", "event source mapping", "dlq", "destination") },
    @{ Category = "Development with AWS Services"; Topic = "API Gateway Integrations & CORS"; Keywords = @("aws_proxy", "lambda authorizer", "cors", "mapping template", "throttling", "stages") },
    @{ Category = "Development with AWS Services"; Topic = "DynamoDB Capacity Calculations"; Keywords = @("rcu", "wcu", "strongly consistent", "eventually consistent", "transactional") },
    @{ Category = "Development with AWS Services"; Topic = "DynamoDB Indexes (LSI vs GSI)"; Keywords = @("lsi", "gsi", "local secondary index", "global secondary index", "provisioned capacity") },
    @{ Category = "Development with AWS Services"; Topic = "DynamoDB Advanced Operations"; Keywords = @("conditionalcheckfailedexception", "optimistic locking", "versionnumber", "streams", "dax") },
    @{ Category = "Development with AWS Services"; Topic = "Step Functions & State Machines"; Keywords = @("step functions", "standard vs express", "choice state", "retry", "catch") },

    # Domain 2: Security
    @{ Category = "Security"; Topic = "Cognito User Pools vs Identity Pools"; Keywords = @("user pool", "identity pool", "hosted ui", "id token", "access token", "temporary credentials") },
    @{ Category = "Security"; Topic = "IAM & Least Privilege"; Keywords = @("least privilege", "execution role", "policy", "credential", "assume-role") },
    @{ Category = "Security"; Topic = "KMS & Envelope Encryption"; Keywords = @("kms", "envelope encryption", "generatedatakey", "key policy", "cmk") },
    @{ Category = "Security"; Topic = "Secrets Manager & SSM Parameter Store"; Keywords = @("secrets manager", "parameter store", "rotation", "securestring") },

    # Domain 3: Deployment
    @{ Category = "Deployment"; Topic = "CI/CD Orchestration (CodePipeline & CodeBuild)"; Keywords = @("codepipeline", "codebuild", "buildspec.yml", "cache") },
    @{ Category = "Deployment"; Topic = "CI/CD Deployment (CodeDeploy & AppSpec)"; Keywords = @("codedeploy", "appspec.yml", "lifecycle hook", "rollback", "deploy") },
    @{ Category = "Deployment"; Topic = "Deployment Strategies"; Keywords = @("blue/green", "canary", "linear", "all-at-once", "rolling") },
    @{ Category = "Deployment"; Topic = "Infrastructure as Code (CloudFormation & SAM)"; Keywords = @("cloudformation", "nested stack", "stackset", "sam ", "template.yaml", "aws::serverless") },
    @{ Category = "Deployment"; Topic = "AWS CDK & Constructs"; Keywords = @("cdk", "construct", "synthesis", "synthesize") },

    # Domain 4: Troubleshooting & Optimization
    @{ Category = "Troubleshooting & Optimization"; Topic = "AWS X-Ray Trace & Instrumentation"; Keywords = @("x-ray", "segment", "subsegment", "annotation", "metadata", "service map") },
    @{ Category = "Troubleshooting & Optimization"; Topic = "CloudWatch Logs & Metric Filters"; Keywords = @("cloudwatch agent", "log group", "metric filter", "filter pattern") },
    @{ Category = "Troubleshooting & Optimization"; Topic = "Developer Performance Tuning"; Keywords = @("connection pool", "api gateway cache", "query vs scan") }
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "      AWS DVA-C02 EXAM PREP CONTENT VALIDATION AUDIT      " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Scanning documentation files under: $docsPath`n" -ForegroundColor Yellow

# Get all markdown files under Developer Associate
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
$reportPath = Join-Path $PSScriptRoot "..\dva_exam_prep_audit_report.md"
$reportMD = @"
# AWS Certified Developer Associate (DVA-C02) Content Audit Report

Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Readiness Score: **$score%** ($coveredCount / $($checklist.Count) topics covered)

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
