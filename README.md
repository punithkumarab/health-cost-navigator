# 💳 MediCost AI — Medical Insurance Cost Prediction

## 📌 Project Overview

MediCost AI is a machine-learning web application that estimates annual medical insurance charges based on a user's age, gender, BMI, number of children, smoking status, and region.

The application uses a Random Forest regression model trained on the public Kaggle medical insurance dataset containing 1,338 records. Users can enter six details and receive an estimated insurance cost in Indian Rupees and US Dollars, along with a risk level and the main factors influencing the prediction.

> ⚠️ **Disclaimer:** MediCost AI is intended for educational and demonstration purposes only. It does not provide an official insurance quote, medical advice, financial advice, or guaranteed future costs.

## ✨ Features

- 🧮 Instant medical insurance cost prediction
- 👤 Age and gender input
- ⚖️ BMI-based analysis
- 👶 Number of children input
- 🚭 Smoking-status analysis
- 🌎 Region selection
- 💰 Estimated cost in ₹ and $
- 📊 Risk-level assessment
- 🔍 Cost-driver breakdown
- ✅ Input validation
- 📱 Mobile-responsive design
- ⚡ Real-time prediction interface
- 🚫 No signup required

## 🎯 Project Objectives

- Build a practical machine-learning regression application.
- Estimate annual medical insurance charges.
- Understand how lifestyle and demographic factors affect insurance cost.
- Create an easy-to-use prediction interface.
- Display model results in a clear and understandable format.
- Demonstrate the integration of a machine-learning model with a React frontend.

## 🧾 Input Features

The application uses the following six input fields:

| Feature | Description |
|---|---|
| Age | Age of the person in years |
| Gender | Male or female |
| BMI | Body Mass Index |
| Children | Number of dependent children |
| Smoker | Whether the person smokes |
| Region | Geographic region of the person |

Available regions:

- Northeast
- Northwest
- Southeast
- Southwest

## 📊 Dataset

MediCost AI uses the public medical-insurance dataset available through Kaggle.

The dataset contains 1,338 records and includes information related to:

- Age
- Gender
- BMI
- Number of children
- Smoking status
- Residential region
- Medical insurance charges

The target variable is:

```text
charges
```

## 🤖 Machine-Learning Model

The application uses a **Random Forest regression model** to estimate annual medical insurance charges.

Random Forest combines multiple decision trees to generate a more stable prediction. The model learns patterns between demographic, lifestyle, regional, and insurance-charge data.

The model achieves an approximate \(R^2\) score of 0.87 on the selected evaluation setup.

> Model performance may vary depending on preprocessing, train-test splitting, random state, and evaluation method.

## 🔍 Main Cost Drivers

According to the model analysis, the strongest cost-related factors include:

- Smoking status
- BMI
- Age

Other features, such as the number of children, gender, and region, may also influence the prediction.

The model identifies statistical patterns in the dataset. It does not determine an individual's actual medical expenses or guarantee an insurance premium.

## 🔄 Application Workflow

```text
User Enters Personal Details
            ↓
Input Validation
            ↓
Categorical Values Are Encoded
            ↓
Random Forest Model Processes Inputs
            ↓
Estimated Annual Cost Is Generated
            ↓
Cost Is Displayed in ₹ and $
            ↓
Risk Level and Cost Drivers Are Shown
```

## 🛠️ Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Machine Learning
- Random Forest Regression
- Python
- Scikit-learn
- Kaggle Dataset
- JavaScript
- Responsive Web Design

## 📁 Project Structure

```text
medicost-ai/
│
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   ├── assets/           # Images and static assets
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
│
├── public/               # Public static files
├── model/                # Machine-learning model files, if included
├── package.json          # Project dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## 💻 Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git
- A code editor such as VS Code

Check your installed versions:

```bash
node --version
npm --version
```

## ▶️ Run Locally

### 1. Clone the Repository

Replace the URL below with your actual GitHub repository URL:

```bash
git clone [https://github.com/punithkumarab/medicost-ai.git](https://github.com/punithkumarab/medicost-ai.git)
```

### 2. Navigate to the Project Folder

```bash
cd medicost-ai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal. It is usually:

```text
http://localhost:5173
```

## 📜 Available Commands

### Start Development Server

```bash
npm run dev
```

### Create Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

## 🌐 Deployment

The application can be deployed using:

- Vercel
- Netlify
- Render
- GitHub Pages, if the application does not require a backend
- Other static hosting platforms

### Build the Project

```bash
npm run build
```

The production files will be generated in:

```text
dist/
```

### Deploy on Vercel

1. Push the project to GitHub.
2. Sign in to Vercel.
3. Select **Add New Project**.
4. Import the GitHub repository.
5. Configure environment variables if required.
6. Click **Deploy**.

### Deploy on Netlify

1. Push the project to GitHub.
2. Sign in to Netlify.
3. Select **Add new site**.
4. Import the GitHub repository.
5. Use this build command:

```text
npm run build
```

6. Use this publish directory:

```text
dist
```

7. Click **Deploy site**.

## 🧪 Example Input

```text
Age:  thirty
Gender:  Male
BMI:  27.5
Children:  1
Smoker:  No
Region:  Southwest
```

The application processes these values and displays:

- Estimated annual cost
- Cost in Indian Rupees
- Cost in US Dollars
- Risk level
- Main cost drivers

The displayed amount is an estimate generated from the trained model and should not be treated as an official insurance quote.

## 📊 Results

Add your actual model evaluation results here:

| Metric | Result |
|---|---:|
| Algorithm | Random Forest Regressor |
| Dataset records | 1,338 |
| \(R^2\) score | Approximately 0.87 |
| MAE | Add actual value |
| RMSE | Add actual value |

Do not add MAE or RMSE values unless they were calculated by your model.

## ⚠️ Responsible Use

MediCost AI should be used carefully because:

- The prediction is based on historical data.
- The dataset may not represent all countries or insurance providers.
- Medical costs vary by location, provider, coverage, treatment, and policy.
- The model may contain biases from the original dataset.
- The result is not a diagnosis or official insurance quote.
- The application should not be used to make financial or medical decisions.
- Users should contact a licensed insurance provider for an actual quote.

## 🔒 Privacy

This application does not require user signup.

However, when deploying or extending the project:

- Do not collect unnecessary personal information.
- Do not store user input without clear consent.
- Do not expose private API keys.
- Store secrets in environment variables.
- Add a clear privacy policy before production use.
- Avoid collecting medical information that is not necessary for the prediction.

## 🚀 Future Improvements

- Add a Python Flask or FastAPI backend.
- Deploy the trained model as an API.
- Add model explainability using SHAP.
- Add confidence or uncertainty ranges.
- Add support for more insurance datasets.
- Add user authentication only when necessary.
- Add prediction history with user consent.
- Add downloadable prediction reports.
- Add a comparison between predicted and actual charges.
- Improve accessibility.
- Add multilingual support.
- Add automated model monitoring.
- Retrain the model using larger and more recent datasets.

## 📸 Screenshots

Add screenshots of your application here:

```markdown







```

## 🔗 Live Demo

Add your deployed application link here:

```text
[https://your-medicost-ai-url.vercel.app](https://your-medicost-ai-url.vercel.app)
```

## 👨‍💻 Author

**Punith Kumar AB**

B.E. Artificial Intelligence and Machine Learning

- GitHub: [@punithkumarab](https://github.com/punithkumarab)
- Portfolio: Add your portfolio link
- LinkedIn: Add your LinkedIn profile link
- Email: Add your email address

## 📜 License

This project was created for educational and demonstration purposes.

---

⭐ If you find this project useful, consider giving the repository a star.
