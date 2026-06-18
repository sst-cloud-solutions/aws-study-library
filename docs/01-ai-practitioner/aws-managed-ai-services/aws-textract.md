# Amazon Textract

- Automatically extracts text, handwriting, and data from any scanned documents using AI and ML
- Is a ML product used to detect and analyse text contained in input documents such as JPEG, PNG, PDF or TIFF
- The output is extracted text, structure of that text and any analysis that can be performed on that text
- Extract data from forms and tables
- For most documents Textract is capable to operate in a synchronous way (real time)
- For large documents it will operate in asynchronous way
- It is pay per usage, custom pricing being available for large volume of documents
- Use cases:
  - Detection of text and the relationship between the text, example receipt - dates, items, prices.
  - Document analysis:
    - For generic documents might detect names, addresses, birth date, etc.
    - For receipts: prices, vendors, line items, dates, etc.
    - Identity documents: abstraction of certain fields to being able to store them in a table of a database
  - Financial Services (e.g., invoices, financial reports)
  - Healthcare (e.g., medical records, insurance claims)
  - Public Sector (e.g., tax forms, ID documents, passports)
- It can be integrated with other AWS services

---

## Prerequisites

- [Amazon Personalize](aws-personalize.md)

## Recommended Next Topics

- [Amazon Kendra](aws-kendra.md)

## Related Topics

- [Introduction of AWS Managed AI Services](introduction-of-aws-managed-ai-services.md)
- [Amazon Comprehend](aws-comprehend.md)
- [Amazon Translate](aws-translate.md)
