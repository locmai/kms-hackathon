import pdftotext

# Load your PDF

def pdf_to_text(file_path):
    with open(file_path, "rb") as f:
        pdf = pdftotext.PDF(f)
        res  = " ".join(pdf)

    return res

# print(pdf_to_text('./resume.pdf'))