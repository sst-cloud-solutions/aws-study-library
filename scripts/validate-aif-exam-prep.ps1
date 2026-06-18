# AWS Certified AI Practitioner (AIF-C01) Content Validation Script
# This script scans the Docusaurus 'docs/01-ai-practitioner' folder to audit exam topic coverage and print a readiness report.

$docsPath = Join-Path $PSScriptRoot "..\docs\01-ai-practitioner"
if (-not (Test-Path $docsPath)) {
    Write-Error "Could not find AIF-C01 docs directory at $docsPath"
    exit 1
}

# Define the checklist of critical AIF-C01 exam topics and their keywords
$checklist = @(
    # Domain 1: Cloud & AI/ML Fundamentals
    @{ Category = "Fundamentals"; Topic = "Cloud vs AI vs ML vs DL vs GenAI"; Keywords = @("machine learning", "deep learning", "generative ai", "foundation model", "transformer model", "diffusion model") },
    @{ Category = "Fundamentals"; Topic = "Supervised vs Unsupervised vs RL"; Keywords = @("supervised learning", "unsupervised learning", "reinforcement learning", "rlhf", "labeled data") },
    @{ Category = "Fundamentals"; Topic = "Model Fit, Bias & Variance"; Keywords = @("overfitting", "underfitting", "bias", "variance", "hyperparameter") },
    @{ Category = "Fundamentals"; Topic = "Evaluation Metrics"; Keywords = @("confusion matrix", "precision", "recall", "f1 score", "auc-roc", "bleu", "rouge") },

    # Domain 2: Generative AI & Amazon Bedrock
    @{ Category = "Generative AI"; Topic = "Amazon Bedrock Features"; Keywords = @("bedrock", "playgrounds", "model customization", "agent", "guardrails") },
    @{ Category = "Generative AI"; Topic = "Retrieval-Augmented Generation (RAG)"; Keywords = @("rag", "retrieval-augmented generation", "vector database", "vector embedding", "embeddings") },
    @{ Category = "Generative AI"; Topic = "Model Fine-Tuning & Customization"; Keywords = @("fine-tuning", "custom model", "transfer learning", "pre-training") },
    @{ Category = "Generative AI"; Topic = "Prompt Engineering Techniques"; Keywords = @("prompt engineering", "zero-shot", "few-shot", "chain-of-thought", "negative prompting") },
    @{ Category = "Generative AI"; Topic = "Amazon Q Suite"; Keywords = @("amazon q", "q business", "q apps", "q developer") },

    # Domain 3: AWS Managed AI/ML Services
    @{ Category = "Managed Services"; Topic = "Amazon SageMaker Studio & Canvas"; Keywords = @("sagemaker", "studio", "jumpstart", "canvas", "feature store", "pipelines") },
    @{ Category = "Managed Services"; Topic = "NLP & Speech (Comprehend/Translate/Polly/Transcribe)"; Keywords = @("comprehend", "translate", "polly", "transcribe", "lexicon", "ssml") },
    @{ Category = "Managed Services"; Topic = "Vision & Search (Rekognition/Textract/Kendra)"; Keywords = @("rekognition", "textract", "kendra", "custom labels", "content moderation") },
    @{ Category = "Managed Services"; Topic = "AI Accelerators (Trainium/Inferentia)"; Keywords = @("trainium", "inferentia", "trn1", "inf2", "hardware for ai", "accelerator") },

    # Domain 4: Responsible AI, Security & Governance
    @{ Category = "Responsible AI & Sec"; Topic = "Responsible AI Core Pillars"; Keywords = @("responsible ai", "fairness", "transparency", "explainability", "interpretability", "explainable ai") },
    @{ Category = "Responsible AI & Sec"; Topic = "Model & Service Cards"; Keywords = @("service card", "model card", "aws service cards", "aws model cards") },
    @{ Category = "Responsible AI & Sec"; Topic = "AI Security & Compliance"; Keywords = @("shared responsibility model", "macie", "artifact", "audit manager", "guardrails for bedrock") }
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "      AWS AIF-C01 EXAM PREP CONTENT VALIDATION AUDIT      " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Scanning documentation files under: $docsPath`n" -ForegroundColor Yellow

# Get all markdown files under AIF-C01
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

        $matchesTips = [regex]::Matches($file.Content, "(?i)(:::tip|> \[!TIP\]|exam tip|memory tip)")
        $tipsCount += $matchesTips.Count

        $matchesTraps = [regex]::Matches($file.Content, "(?i)(:::warning|> \[!WARNING\]|common exam traps|challenges|misuses)")
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
Write-Host " Exam/Memory Tips Callouts     : $tipsCount found" -ForegroundColor Green
Write-Host " Challenges/Traps Callouts     : $trapsCount found" -ForegroundColor Green
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
$reportPath = Join-Path $PSScriptRoot "..\aif_exam_prep_audit_report.md"
$reportMD = @"
# AWS Certified AI Practitioner (AIF-C01) Content Audit Report

Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Readiness Score: **$score%** ($coveredCount / $($checklist.Count) topics covered)

## Structural Features Audit
- **Mermaid Diagrams:** $mermaidCount found
- **Exam/Memory Tips:** $tipsCount found
- **Challenges/Traps:** $trapsCount found
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
