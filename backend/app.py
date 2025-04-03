import os
from fastapi import FastAPI, File, UploadFile, Response, HTTPException
from rembg import remove
from PIL import Image
import io
import traceback
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS settings
origins = ["https://nf-image.netlify.app", "http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running!"}

@app.get("/naved")
def naved():
    return {"message": "naved running!"}

@app.post("/remove_background")
async def remove_background(image: UploadFile = File(...)):
    try:
        image_data = await image.read()
        input_image = Image.open(io.BytesIO(image_data)).convert("RGBA")

        max_size = 1024
        if max(input_image.size) > max_size:
            input_image.thumbnail((max_size, max_size))

        output_image = remove(input_image)

        img_io = io.BytesIO()
        output_image.save(img_io, format="PNG")
        img_io.seek(0)

        return Response(content=img_io.getvalue(), media_type="image/png")
    except Exception as e:
        error_message = traceback.format_exc()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}\n{error_message}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
