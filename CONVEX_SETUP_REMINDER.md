# Convex Setup Reminder

## ⚠️ Important: Schema Updates Require Convex Restart

When you update the Convex schema (like adding the `displayOrder` field), you MUST have Convex running to deploy the changes.

## 🚀 Steps to Apply Schema Changes

### 1. Make sure Convex is running:

```bash
npx convex dev
```

**Keep this terminal open!** Convex watches for schema changes and auto-deploys them.

### 2. If you see errors after schema changes:

```bash
# Stop Convex (Ctrl+C)
# Then restart:
npx convex dev
```

### 3. Verify schema is deployed:

Check the Convex terminal output for:
```
✓ Schema deployed successfully
```

## 🔧 Common Issues

### Issue: "Server Error" when updating display order

**Solution:**
1. Make sure `npx convex dev` is running
2. Wait for schema to deploy (check terminal)
3. Refresh your browser
4. Try the operation again

### Issue: Field doesn't exist errors

**Solution:**
- The schema wasn't deployed
- Run `npx convex dev` to deploy schema changes
- Schema changes are automatic when Convex dev is running

## 📝 What Changed

Added `displayOrder` field to products:
- Type: `number` (optional)
- Purpose: Control product display order on homepage
- Index: `by_displayOrder` for efficient sorting

## ✅ Verify Everything Works

1. **Start both servers:**
   ```bash
   # Terminal 1
   npm run dev
   
   # Terminal 2
   npx convex dev
   ```

2. **Go to Admin Products:**
   - Navigate to `/admin/products`
   - Try setting a display order
   - Click "Save"
   - Should work without errors!

3. **Check Homepage:**
   - Products should appear in order
   - Lower numbers first
   - No order = appears last

## 🆘 Still Having Issues?

1. Check Convex dashboard: https://dashboard.convex.dev/
2. Look for your deployment
3. Check "Schema" tab to verify `displayOrder` field exists
4. Check "Logs" tab for error details

---

**Remember:** Always keep `npx convex dev` running when developing! 🚀

