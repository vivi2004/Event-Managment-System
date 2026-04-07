# 🚀 Deployment Guide

This guide will walk you through deploying the Event Management System to production.

## 📋 Prerequisites

Before deploying, ensure you have:
- A Vercel account (for frontend): https://vercel.com/signup
- A Railway account (for backend): https://railway.app/ (recommended) OR Render: https://render.com/
- A MongoDB Atlas account: https://www.mongodb.com/atlas/database
- Your code pushed to GitHub

---

## 🎨 Step 1: Deploy Frontend to Vercel

### 1.1 Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### 1.2 Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard

2. **Click "Add New Project"**

3. **Import from GitHub:**
   - Select your repository: `vivi2004/Event-Managment-System`
   - Click "Import"

4. **Configure Project:**
   - **Project Name:** `event-management-frontend`
   - **Framework Preset:** Select "Vite"
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Environment Variables:**
   Add these environment variables (if needed):
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

6. **Click "Deploy"**

7. **Wait for deployment to complete** (usually 1-2 minutes)

8. **Your frontend is now live!** 🎉

---

## ⚙️ Step 2: Setup MongoDB Atlas (Database)

### 2.1 Create MongoDB Cluster

1. **Go to MongoDB Atlas:** https://cloud.mongodb.com

2. **Create New Cluster:**
   - Click "Build a Cluster"
   - Choose "FREE" tier (M0)
   - Select region closest to your users (e.g., Mumbai for India)
   - Click "Create Cluster"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Generate a secure password
   - Click "Add User"

4. **Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `event_management`

   Example:
   ```
   mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/event_management?retryWrites=true&w=majority
   ```

---

## 🖥️ Step 3: Deploy Backend to Railway (Recommended)

Railway is the best choice for Node.js backends with MongoDB.

### 3.1 Deploy Backend

1. **Go to Railway Dashboard:** https://railway.app/dashboard

2. **Click "New Project"**

3. **Select "Deploy from GitHub repo"**

4. **Configure Project:**
   - Select your GitHub repository
   - Railway will auto-detect it's a Node.js project

5. **Set Environment Variables:**
   Go to "Variables" tab and add:
   ```
   PORT=5001
   MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/event_management?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
   ```

6. **Add MongoDB Plugin (Optional but recommended):**
   - Click "New" → "Database" → "Add MongoDB"
   - This creates a managed MongoDB instance
   - Railway provides the connection string automatically

7. **Deploy:**
   - Railway auto-deploys on every push
   - Click "Deploy" if needed

8. **Get Backend URL:**
   - Go to "Settings" tab
   - Copy the "Domain" URL
   - Example: `https://event-management-backend.up.railway.app`

---

## 🔄 Step 4: Update Frontend with Backend URL

### 4.1 Update API Configuration

1. **Go to your frontend code:**
   ```bash
   cd frontend/src/services
   ```

2. **Update api.js with production URL:**
   ```javascript
   // Change from localhost to production URL
   const API_URL = 'https://your-backend-url.railway.app/api'
   ```

3. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "update: production backend URL"
   git push origin main
   ```

4. **Vercel will auto-deploy** the updated frontend

---

## ☁️ Alternative: Deploy Backend to Render

If you prefer Render over Railway:

### Deploy to Render

1. **Go to Render Dashboard:** https://dashboard.render.com

2. **Click "New Web Service"**

3. **Connect GitHub Repository**

4. **Configure Service:**
   - **Name:** `event-management-backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`

5. **Add Environment Variables:**
   Same as Railway (see Step 3.5)

6. **Click "Create Web Service"**

7. **Wait for deployment** (2-3 minutes)

---

## 🔗 Step 5: Connect Frontend and Backend

### 5.1 Update CORS in Backend

Edit `backend/server.js`:

```javascript
const corsOptions = {
  origin: [
    'https://your-frontend-url.vercel.app',
    'http://localhost:5175'  // for local development
  ],
  credentials: true
}
app.use(cors(corsOptions))
```

### 5.2 Update Frontend API URL

Edit `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
```

Then add environment variable in Vercel:
- `VITE_API_URL=https://your-backend-url.railway.app/api`

---

## ✅ Verification Steps

### Test Frontend
1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Check if landing page loads
3. Test login functionality

### Test Backend
1. Visit: `https://your-backend-url.railway.app`
2. Should show "API is running..."
3. Test API: `https://your-backend-url.railway.app/api/auth/register`

### Test Database
1. Create a user account
2. Check if data persists (not lost on refresh)

---

## 🐛 Troubleshooting

### Common Issues

**1. CORS Errors**
```
Access-Control-Allow-Origin header missing
```
**Solution:** Update CORS origin in backend with correct frontend URL

**2. MongoDB Connection Error**
```
MongoNetworkError: failed to connect to server
```
**Solution:** 
- Check MongoDB Atlas network access (whitelist all IPs: 0.0.0.0/0)
- Verify connection string password
- Ensure database user has correct permissions

**3. Build Failures on Vercel**
```
Command "vite build" exited with 1
```
**Solution:**
- Check that all dependencies are in package.json
- Ensure no import errors in code
- Run `npm run build` locally to test

**4. Environment Variables Not Working**
**Solution:**
- Vercel: Prefix with `VITE_` for frontend
- Railway/Render: Restart service after adding variables

---

## 📊 Monitoring & Logs

### Vercel
- **Analytics:** https://vercel.com/analytics
- **Logs:** Project dashboard → "Functions" tab

### Railway
- **Logs:** Project dashboard → "Deployments" → Click on deployment
- **Metrics:** Dashboard shows CPU, memory usage

### Render
- **Logs:** Service dashboard → "Logs" tab
- **Metrics:** Dashboard shows request history

---

## 🔄 Continuous Deployment

Both Vercel and Railway support auto-deployment:

1. **Push code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Auto-deployment triggers:**
   - Vercel: Rebuilds and deploys frontend
   - Railway: Rebuilds and deploys backend

3. **Zero-downtime deployments:**
   - Both platforms handle this automatically

---

## 🎉 Deployment Complete!

Your Event Management System is now live:

- 🌐 **Frontend:** https://your-app.vercel.app
- ⚙️ **Backend:** https://your-backend.railway.app
- 💾 **Database:** MongoDB Atlas

**Share your live app with the world!** 🚀

---

## 📞 Need Help?

If you encounter issues:
1. Check platform documentation:
   - Vercel: https://vercel.com/docs
   - Railway: https://docs.railway.app/
   - Render: https://render.com/docs

2. Common solutions in this guide's Troubleshooting section

3. Contact support for specific platform issues

---

## 🔒 Security Checklist

- [ ] JWT_SECRET is strong and random (min 32 characters)
- [ ] MongoDB password is complex
- [ ] Environment variables are set in production
- [ ] CORS is configured correctly (specific origins, not '*')
- [ ] No sensitive data in GitHub repository
- [ ] HTTPS enabled (Vercel/Railway provide this automatically)

---

**Happy Deploying! 🚀**
