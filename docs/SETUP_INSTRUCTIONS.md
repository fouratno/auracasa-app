# Quick Setup Instructions

## 📝 Step 1: Add Your Sanity Credentials

I've created `.env.local` file in `auracasa-premium/` folder. You need to replace the placeholder values with your actual Sanity credentials.

### How to Get Your Credentials:

1. **Go to Sanity Dashboard:** https://www.sanity.io/manage

2. **Select Your Project** (or create a new one if you haven't)

3. **Get Project ID:**
   - Go to **Settings** → **Project details**
   - Copy your **Project ID**
   - Paste it in `.env.local` replacing `your_project_id_here`

4. **Get API Token:**
   - Go to **API** → **Tokens**
   - Click **Add API token**
   - Name it: "Development Token"
   - Permissions: Select **Editor** (for write access)
   - Click **Add token**
   - **IMPORTANT:** Copy the token immediately (you won't see it again!)
   - Paste it in `.env.local` replacing `your_api_token_here`

5. **Dataset Name:**
   - Usually `production` (default)
   - If you created a different dataset, update it in `.env.local`

### Your `.env.local` should look like this:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skAbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

---

## 🚀 Step 2: Install Dependencies & Run Seed Script

After adding your credentials:

```bash
cd auracasa-premium

# Install ts-node if not already installed
npm install -D ts-node @types/node

# Run the seed script to populate Sanity with sample content
npx ts-node scripts/seed-sanity.ts
```

This will create:
- ✅ 1 author (Auracasa Team)
- ✅ 6 products (furniture, lighting, decor, textiles)
- ✅ 5 projects (Sunset Loft, Desert Atelier, etc.)
- ✅ 3 journal posts (with SEO metadata)

---

## 📸 Step 3: Add Images in Sanity Studio

1. **Open your Sanity Studio:**
   - Go to: `https://your-project.sanity.studio`
   - Or run locally: `cd auracasa && npm run dev`

2. **Upload images for each project:**
   - Go to **Projects** in the studio
   - Click on each project
   - Upload hero image (use images from `auracasa-premium/public/` or `sample,posts/` folders)
   - Optionally add gallery images
   - Click **Publish**

3. **Upload product images:**
   - Go to **Products**
   - Add images for each product
   - Click **Publish**

4. **Upload journal post images:**
   - Go to **Journal Posts**
   - Add hero images
   - Click **Publish**

---

## 🧪 Step 4: Test the Integration

After adding credentials and running the seed script:

```bash
cd auracasa-premium

# Start the development server
npm run dev
```

Then open: http://localhost:3000

**What to test:**
1. ✅ Homepage loads
2. ✅ Featured projects section shows (should be empty until you add images)
3. ✅ No console errors
4. ✅ After adding images in Sanity, refresh and see them appear

---

## ⚠️ Important Notes

1. **Restart Dev Server:** After creating `.env.local`, restart your dev server
2. **Images Required:** Projects won't display properly until you add images in Sanity Studio
3. **60-Second Cache:** Changes in Sanity appear within 60 seconds (ISR revalidation)
4. **Git Ignore:** `.env.local` is already in `.gitignore` - never commit it!

---

## 🐛 Troubleshooting

### Error: "Client is not configured"
- Make sure `.env.local` exists in `auracasa-premium/` folder
- Verify credentials are correct (no extra spaces)
- Restart dev server

### Error: "Unauthorized" or "Permission denied"
- Check that API token has "Editor" permissions
- Verify token is correctly copied (no extra characters)

### Images not loading
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that images are uploaded and published in Sanity Studio
- Clear browser cache and refresh

### Seed script fails
- Ensure API token has write permissions (Editor role)
- Check that all required fields are filled
- Look at error message for specific field issues

---

## ✅ Success Checklist

- [ ] `.env.local` created with real credentials
- [ ] Seed script ran successfully
- [ ] Images uploaded in Sanity Studio
- [ ] Dev server running without errors
- [ ] Homepage displays featured projects
- [ ] Images load from Sanity CDN

---

## 📞 Need Help?

Check these files for more details:
- `SANITY_SETUP_GUIDE.md` - Detailed setup guide
- `SANITY_INTEGRATION_GUIDE.md` - Integration details
- `PHASE_2.1_STATUS.md` - Current progress status

---

**Once you've completed these steps, let me know and I'll test the integration!**
