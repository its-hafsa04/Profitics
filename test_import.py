# test_import.py
try:
    import google.generativeai as gemini
    print("Import successful!")
except ModuleNotFoundError as e:
    print(f"Import failed: {e}")
