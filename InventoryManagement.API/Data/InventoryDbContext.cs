using Microsoft.EntityFrameworkCore;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Data;

public class InventoryDbContext : DbContext
{
    public InventoryDbContext(
        DbContextOptions<InventoryDbContext> options)
        : base(options)
    {
    }

    public DbSet<Role> Roles { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<ForecastResult> ForecastResults { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<ProductSpecification> ProductSpecifications { get; set; }

    public DbSet<Supplier> Suppliers { get; set; }

    public DbSet<PurchaseOrder> PurchaseOrders { get; set; }

    public DbSet<PurchaseOrderItem> PurchaseOrderItems { get; set; }

    public DbSet<ProductBatch> ProductBatches { get; set; }

    public DbSet<StockTransactionHeader> StockTransactionHeaders { get; set; }

    public DbSet<StockTransactionItem> StockTransactionItems { get; set; }

    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasOne(u => u.Role)
            .WithMany()
            .HasForeignKey(u => u.RoleId);

        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany()
            .HasForeignKey(p => p.CategoryId);

        modelBuilder.Entity<ProductSpecification>()
            .HasOne(ps => ps.Product)
            .WithMany()
            .HasForeignKey(ps => ps.ProductId);

        modelBuilder.Entity<ForecastResult>()
            .HasKey(fr => fr.ForecastId);

        modelBuilder.Entity<PurchaseOrder>()
            .HasOne(po => po.Supplier)
            .WithMany()
            .HasForeignKey(po => po.SupplierId);

        modelBuilder.Entity<PurchaseOrderItem>()
            .HasOne(poi => poi.PurchaseOrder)
            .WithMany()
            .HasForeignKey(poi => poi.PurchaseOrderId);

        modelBuilder.Entity<PurchaseOrderItem>()
            .HasOne(poi => poi.Product)
            .WithMany()
            .HasForeignKey(poi => poi.ProductId);

        modelBuilder.Entity<ProductBatch>()
            .HasOne(pb => pb.Product)
            .WithMany()
            .HasForeignKey(pb => pb.ProductId);

        modelBuilder.Entity<ProductBatch>()
            .HasOne(pb => pb.Supplier)
            .WithMany()
            .HasForeignKey(pb => pb.SupplierId);

        modelBuilder.Entity<ProductBatch>()
            .HasOne(pb => pb.PurchaseOrder)
            .WithMany()
            .HasForeignKey(pb => pb.PurchaseOrderId);

        modelBuilder.Entity<StockTransactionHeader>()
            .HasOne(sth => sth.User)
            .WithMany()
            .HasForeignKey(sth => sth.UserId);

        modelBuilder.Entity<StockTransactionHeader>()
            .HasOne(sth => sth.Supplier)
            .WithMany()
            .HasForeignKey(sth => sth.SupplierId);

        modelBuilder.Entity<StockTransactionItem>()
            .HasOne(sti => sti.StockTransactionHeader)
            .WithMany()
            .HasForeignKey(sti => sti.StockTransactionHeaderId);

        modelBuilder.Entity<StockTransactionItem>()
            .HasOne(sti => sti.Product)
            .WithMany()
            .HasForeignKey(sti => sti.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<StockTransactionItem>()
            .HasOne(sti => sti.ProductBatch)
            .WithMany()
            .HasForeignKey(sti => sti.ProductBatchId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<AuditLog>()
            .HasOne(al => al.User)
            .WithMany()
            .HasForeignKey(al => al.UserId)
            .OnDelete(DeleteBehavior.Restrict);
            
        modelBuilder.Entity<ProductBatch>()
            .Property(x => x.CostPrice)
            .HasPrecision(18, 2);

        modelBuilder.Entity<ProductBatch>()
            .Property(x => x.SellingPrice)
            .HasPrecision(18, 2);

        modelBuilder.Entity<PurchaseOrder>()
            .Property(x => x.TotalAmount)
            .HasPrecision(18, 2);

        modelBuilder.Entity<PurchaseOrderItem>()
            .Property(x => x.ExpectedCostPrice)
            .HasPrecision(18, 2);

        modelBuilder.Entity<StockTransactionItem>()
            .Property(x => x.CostPriceAtTransaction)
            .HasPrecision(18, 2);

        modelBuilder.Entity<StockTransactionItem>()
            .Property(x => x.SellingPriceAtTransaction)
            .HasPrecision(18, 2);
    }
}
