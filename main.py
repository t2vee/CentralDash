import os
import json
from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
icons = []
app.mount("/res", StaticFiles(directory="res"), name="res")
templates = Jinja2Templates(directory="templates")


def load_icons():
    with open('config/icons.json', 'r') as file:
        return json.load(file)


def save_icons(icons):
    with open('config/icons.json', 'w') as file:
        json.dump(icons, file, indent=4)


@app.get("/")
async def home(request: Request):
    icons = load_icons()
    return templates.TemplateResponse("index.html", {"request": request, "icons": icons})


@app.get("/Editor/Icons.html")
async def icons_editor(request: Request):
    return templates.TemplateResponse("Editor.Icons.html", {"request": request})


@app.get("/Editor/Nginx.html")
async def nginx_editor(request: Request):
    return templates.TemplateResponse("Editor.Nginx.html", {"request": request})


@app.post("/API/AddIcon")
async def add_icon(request: Request, serviceName: str = Form(...), iconURL: str = Form(...),
                   accessURI: str = Form(...)):
    # Load the current icons
    icons = load_icons()

    # Add the new icon
    icons.append({
        "name": serviceName,
        "icon_url": iconURL,
        "uri": accessURI
    })

    # Save the updated icons
    save_icons(icons)

    return {"message": "Icon added successfully"}


@app.post("/API/DeleteService")
async def delete_service(s: str = None):
    if not s:
        raise HTTPException(status_code=400, detail="Service parameter 's' is required!")
    filepath = "config/icons.json"
    if not os.path.exists(filepath):
        raise HTTPException(status_code=500, detail="icons.json file not found!")
    with open(filepath, "r") as file:
        data = json.load(file)
        icon_index = next((index for (index, icon) in enumerate(data) if icon['uri'] == s), None)
        if icon_index is not None:
            data.pop(icon_index)
        else:
            raise HTTPException(status_code=404, detail=f"No icon found for service {s}")
    with open(filepath, "w") as file:
        json.dump(data, file)

    return {"message": "Icon deleted successfully"}
