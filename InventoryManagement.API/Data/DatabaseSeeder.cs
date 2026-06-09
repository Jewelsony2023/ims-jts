using InventoryManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Data;

public static class DatabaseSeeder
{
    public static async Task SeedSampleInventoryAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<InventoryDbContext>();

        if (!await context.Categories.AnyAsync())
        {
            context.Categories.AddRange(GetSampleCategories());
            await context.SaveChangesAsync();
        }

        if (!await context.Products.AnyAsync())
        {
            var categories = await context.Categories.ToDictionaryAsync(
                category => category.CategoryName,
                category => category.CategoryId);
            var supplierId = await EnsureSampleSupplierAsync(context);

            context.Products.AddRange(GetSampleProducts(categories));
            await context.SaveChangesAsync();

            var products = await context.Products.ToDictionaryAsync(
                product => product.SKU,
                product => product.ProductId);

            context.ProductBatches.AddRange(GetSampleBatches(products, supplierId));
            await context.SaveChangesAsync();
        }
    }

    private static IEnumerable<Category> GetSampleCategories()
    {
        return
        [
            new Category { CategoryName = "Antibiotics", Description = "Pharmaceutical antibiotics and antimicrobial medications" },
            new Category { CategoryName = "Pain Relief", Description = "Analgesics and pain management medications" },
            new Category { CategoryName = "Diabetes", Description = "Insulin and diabetes management products" },
            new Category { CategoryName = "PPE", Description = "Personal Protective Equipment" },
            new Category { CategoryName = "Hygiene", Description = "Sanitizers, soaps, and hygiene products" },
            new Category { CategoryName = "Vitamins", Description = "Vitamins and nutritional supplements" },
            new Category { CategoryName = "Beverages", Description = "Juices, drinks, and beverage products" },
            new Category { CategoryName = "Dairy", Description = "Milk, yogurt, cheese, and dairy products" },
            new Category { CategoryName = "Surgical Supplies", Description = "Surgical instruments and medical supplies" },
            new Category { CategoryName = "Baby Care", Description = "Baby food, diapers, and care products" },
            new Category { CategoryName = "Cosmetics", Description = "Beauty and cosmetic products" },
            new Category { CategoryName = "First Aid", Description = "First aid kits and emergency supplies" }
        ];
    }

    private static IEnumerable<Product> GetSampleProducts(
        IReadOnlyDictionary<string, int> categories)
    {
        return
        [
            new Product { CategoryId = categories["Antibiotics"], ProductName = "Amoxicillin 500mg", SKU = "MED-001", Barcode = "8901234567890", Description = "Broad-spectrum antibiotic capsule for prescription inventory.", ProductImageUrl = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop", MinimumStockLevel = 50 },
            new Product { CategoryId = categories["Pain Relief"], ProductName = "Paracetamol 500mg", SKU = "MED-002", Barcode = "8901234567891", Description = "Pain relief and fever medicine.", ProductImageUrl = "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop", MinimumStockLevel = 50 },
            new Product { CategoryId = categories["Diabetes"], ProductName = "Insulin Vials", SKU = "MED-003", Barcode = "8901234567892", Description = "Cold-chain insulin vial inventory.", ProductImageUrl = "https://images.unsplash.com/photo-1550572017-4814c5a3f8e4?w=100&h=100&fit=crop", MinimumStockLevel = 50 },
            new Product { CategoryId = categories["PPE"], ProductName = "Surgical Masks (Box)", SKU = "PPE-001", Barcode = "8901234567893", Description = "Disposable protective masks box.", ProductImageUrl = "https://images.unsplash.com/photo-1582719366531-3f7e0eccd93a?w=100&h=100&fit=crop", MinimumStockLevel = 50 },
            new Product { CategoryId = categories["Hygiene"], ProductName = "Hand Sanitizer 500ml", SKU = "HYG-001", Barcode = "8901234567894", Description = "Alcohol-based hand sanitizer bottle.", ProductImageUrl = "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=100&h=100&fit=crop", MinimumStockLevel = 50 },
            new Product { CategoryId = categories["Vitamins"], ProductName = "Vitamin C Tablets", SKU = "VIT-001", Barcode = "8901234567895", Description = "Vitamin supplement tablets.", ProductImageUrl = "https://images.unsplash.com/photo-1571769267292-a9089022f7f6?w=100&h=100&fit=crop", MinimumStockLevel = 50 },
            new Product { CategoryId = categories["Beverages"], ProductName = "Organic Apple Juice 1L", SKU = "BEV-001", Barcode = "8901234567896", Description = "Packaged organic apple juice.", ProductImageUrl = "https://images.unsplash.com/photo-1505575967455-8e8f83e8511f?w=100&h=100&fit=crop", MinimumStockLevel = 50 },
            new Product { CategoryId = categories["Dairy"], ProductName = "Fresh Yogurt Strawberry", SKU = "DAI-001", Barcode = "8901234567897", Description = "Fresh strawberry yogurt.", ProductImageUrl = string.Empty, MinimumStockLevel = 50 }
        ];
    }

    private static IEnumerable<ProductBatch> GetSampleBatches(
        IReadOnlyDictionary<string, int> products,
        int supplierId)
    {
        return
        [
            CreateBatch(products["MED-001"], supplierId, "SEED-MED-001", 450, DateTime.UtcNow.AddYears(1)),
            CreateBatch(products["MED-002"], supplierId, "SEED-MED-002", 890, DateTime.UtcNow.AddYears(1)),
            CreateBatch(products["MED-003"], supplierId, "SEED-MED-003", 180, DateTime.UtcNow.AddYears(1)),
            CreateBatch(products["PPE-001"], supplierId, "SEED-PPE-001", 45, DateTime.UtcNow.AddYears(1)),
            CreateBatch(products["HYG-001"], supplierId, "SEED-HYG-001", 320, DateTime.UtcNow.AddYears(1)),
            CreateBatch(products["VIT-001"], supplierId, "SEED-VIT-001", 12, DateTime.UtcNow.AddDays(20)),
            CreateBatch(products["BEV-001"], supplierId, "SEED-BEV-001", 245, DateTime.UtcNow.AddYears(1)),
            CreateBatch(products["DAI-001"], supplierId, "SEED-DAI-001", 0, DateTime.UtcNow.AddDays(-10))
        ];
    }

    private static ProductBatch CreateBatch(
        int productId,
        int supplierId,
        string batchNumber,
        int quantityAvailable,
        DateTime expiryDate)
    {
        return new ProductBatch
        {
            ProductId = productId,
            SupplierId = supplierId,
            BatchNumber = batchNumber,
            ManufactureDate = DateTime.UtcNow.AddMonths(-3),
            ExpiryDate = expiryDate,
            QuantityAvailable = quantityAvailable,
            CostPrice = 45,
            SellingPrice = 50
        };
    }

    private static async Task<int> EnsureSampleSupplierAsync(
        InventoryDbContext context)
    {
        var supplier = await context.Suppliers.FirstOrDefaultAsync();

        if (supplier != null)
        {
            return supplier.SupplierId;
        }

        supplier = new Supplier
        {
            SupplierName = "MediPharm Solutions Ltd.",
            ContactPerson = "Sample Contact",
            Email = "orders@medipharm.com",
            Phone = "+1 (555) 123-4567",
            Address = "Sample warehouse address",
            LeadTimeDays = 4
        };

        context.Suppliers.Add(supplier);
        await context.SaveChangesAsync();

        return supplier.SupplierId;
    }
}
