# 🖼️ Image-to-Image Generator (Next.js + Replicate API)

This project is an **Image-to-Image Generator** built with **Next.js** and **TypeScript**. It enables users to upload product images, describe a new scene, and generate AI-powered variations using [Replicate's `stability-ai/sdxl`](https://replicate.com/stability-ai/sdxl) model.

---

## 🚀 Features

- Upload product images (via `<input type="file">`)
- Automatically convert images to **Base64** format for API processing
- Send the **image**, **aspect ratio**, and **prompt** to Replicate’s SDXL model
- Render generated images with scene modifications — users can modify prompts and re-generate multiple times
- Generated image **gallery** with all previous results (each image includes a **download button** on the top right corner)
- Ability to **reset** the current state via the **reset button** (bottom right corner)
- **Light and dark mode** support
- **Form validation and management** using `react-hook-form`

---

## 🛠️ Tech Stack & Packages

| Package           | Purpose                                                       |
| ----------------- | ------------------------------------------------------------- |
| `next`            | React framework for production apps                           |
| `typescript`      | Provides static typing for better development experience      |
| `axios`           | For making API calls to Replicate                             |
| `react-hook-form` | Manages form state and validation efficiently                 |
| `zod`             | Schema-based form validation used alongside `react-hook-form` |
| `replicate`       | Node SDK to interface with Replicate's AI APIs                |
| `react-icons`     | Icon library used for UI enhancements                         |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/image-to-image-generator.git
cd image-to-image-generator
npm install

```

## ⚙️ Setup Instructions

### Create `.env.local`

```env
REPLICATE_API_TOKEN=will_provide_in_email
```

### Run the project locally

```bash
npm run dev
```

### Then open your browser and go to:

```arduino
http://localhost:3000
```

---

## 🧪 Testing

This project is manually tested through UI interactions:

- Upload an image
- Enter a prompt (e.g., change the product background)
- Submit and observe the generated results
- Try modifying the prompt and regenerate
- Download or reset using UI buttons

---

## 📁 Project Structure

```bash
/components        - Reusable UI components
/context           - React Context for image state (generated images)
/pages             - Next.js routing system
/api               - Backend API route handlers
/public            - Static assets
/types             - TypeScript interfaces and types
/constants         - Reusable constants
.env.local         - Environment variables (excluded from git)
```

## 📤 Future Improvements

- Add preview of uploaded image before generation
- Add drag-and-drop file input
- Enable selection of different models
- Add more responsive design by tailwind

---

## 🙋‍♀️ Author

Built with ❤️ by Shina
