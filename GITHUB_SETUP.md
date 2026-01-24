# GitHub Repository Setup Instructions

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `surabhii-fresh-milk` (or your preferred name)
3. Description: "Premium organic cow milk delivery website - React + Vite + Tailwind CSS"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/surabhii-fresh-milk.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Alternative: If you prefer SSH

```bash
# Add SSH remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin git@github.com:YOUR_USERNAME/surabhii-fresh-milk.git

# Push your code
git push -u origin main
```

## Step 3: Verify

After pushing, refresh your GitHub repository page. You should see all your files there!

## Future Updates

To push future changes:

```bash
git add .
git commit -m "Your commit message"
git push
```
