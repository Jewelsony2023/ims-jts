IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Categories] (
    [CategoryId] int NOT NULL IDENTITY,
    [CategoryName] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NULL,
    [IsActive] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY ([CategoryId])
);
GO

CREATE TABLE [Roles] (
    [RoleId] int NOT NULL IDENTITY,
    [RoleName] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NULL,
    CONSTRAINT [PK_Roles] PRIMARY KEY ([RoleId])
);
GO

CREATE TABLE [Products] (
    [ProductId] int NOT NULL IDENTITY,
    [CategoryId] int NOT NULL,
    [ProductName] nvarchar(max) NOT NULL,
    [SKU] nvarchar(max) NOT NULL,
    [Barcode] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NULL,
    [ProductImageUrl] nvarchar(max) NULL,
    [MinimumStockLevel] int NOT NULL,
    [IsActive] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    [DeletedAt] datetime2 NULL,
    CONSTRAINT [PK_Products] PRIMARY KEY ([ProductId]),
    CONSTRAINT [FK_Products_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([CategoryId]) ON DELETE CASCADE
);
GO

CREATE TABLE [Users] (
    [UserId] int NOT NULL IDENTITY,
    [RoleId] int NOT NULL,
    [Username] nvarchar(max) NOT NULL,
    [FullName] nvarchar(max) NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [Phone] nvarchar(max) NULL,
    [PasswordHash] nvarchar(max) NOT NULL,
    [IsActive] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    [DeletedAt] datetime2 NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([UserId]),
    CONSTRAINT [FK_Users_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([RoleId]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Products_CategoryId] ON [Products] ([CategoryId]);
GO

CREATE INDEX [IX_Users_RoleId] ON [Users] ([RoleId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260605073834_InitialCreate', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [AuditLogs] (
    [AuditLogId] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [EntityName] nvarchar(max) NOT NULL,
    [EntityId] int NOT NULL,
    [Action] nvarchar(max) NOT NULL,
    [OldValues] nvarchar(max) NULL,
    [NewValues] nvarchar(max) NULL,
    [IPAddress] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_AuditLogs] PRIMARY KEY ([AuditLogId]),
    CONSTRAINT [FK_AuditLogs_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([UserId]) ON DELETE CASCADE
);
GO

CREATE TABLE [ProductSpecifications] (
    [ProductSpecificationId] int NOT NULL IDENTITY,
    [ProductId] int NOT NULL,
    [AttributeName] nvarchar(max) NOT NULL,
    [AttributeValue] nvarchar(max) NOT NULL,
    [Unit] nvarchar(max) NULL,
    CONSTRAINT [PK_ProductSpecifications] PRIMARY KEY ([ProductSpecificationId]),
    CONSTRAINT [FK_ProductSpecifications_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
);
GO

CREATE TABLE [Suppliers] (
    [SupplierId] int NOT NULL IDENTITY,
    [SupplierName] nvarchar(max) NOT NULL,
    [ContactPerson] nvarchar(max) NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [Phone] nvarchar(max) NOT NULL,
    [Address] nvarchar(max) NOT NULL,
    [LeadTimeDays] int NOT NULL,
    [IsActive] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    CONSTRAINT [PK_Suppliers] PRIMARY KEY ([SupplierId])
);
GO

CREATE TABLE [PurchaseOrders] (
    [PurchaseOrderId] int NOT NULL IDENTITY,
    [SupplierId] int NOT NULL,
    [OrderDate] datetime2 NOT NULL,
    [TotalAmount] decimal(18,2) NOT NULL,
    [Status] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_PurchaseOrders] PRIMARY KEY ([PurchaseOrderId]),
    CONSTRAINT [FK_PurchaseOrders_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [Suppliers] ([SupplierId]) ON DELETE CASCADE
);
GO

CREATE TABLE [StockTransactionHeaders] (
    [StockTransactionHeaderId] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [SupplierId] int NULL,
    [TransactionType] nvarchar(max) NOT NULL,
    [InvoiceNumber] nvarchar(max) NOT NULL,
    [Notes] nvarchar(max) NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_StockTransactionHeaders] PRIMARY KEY ([StockTransactionHeaderId]),
    CONSTRAINT [FK_StockTransactionHeaders_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [Suppliers] ([SupplierId]),
    CONSTRAINT [FK_StockTransactionHeaders_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([UserId]) ON DELETE CASCADE
);
GO

CREATE TABLE [ProductBatches] (
    [ProductBatchId] int NOT NULL IDENTITY,
    [ProductId] int NOT NULL,
    [SupplierId] int NOT NULL,
    [PurchaseOrderId] int NULL,
    [BatchNumber] nvarchar(max) NOT NULL,
    [ManufactureDate] datetime2 NOT NULL,
    [ExpiryDate] datetime2 NOT NULL,
    [QuantityAvailable] int NOT NULL,
    [CostPrice] decimal(18,2) NOT NULL,
    [SellingPrice] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_ProductBatches] PRIMARY KEY ([ProductBatchId]),
    CONSTRAINT [FK_ProductBatches_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
    CONSTRAINT [FK_ProductBatches_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [PurchaseOrders] ([PurchaseOrderId]),
    CONSTRAINT [FK_ProductBatches_Suppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [Suppliers] ([SupplierId]) ON DELETE CASCADE
);
GO

CREATE TABLE [PurchaseOrderItems] (
    [PurchaseOrderItemId] int NOT NULL IDENTITY,
    [PurchaseOrderId] int NOT NULL,
    [ProductId] int NOT NULL,
    [OrderedQuantity] int NOT NULL,
    [ReceivedQuantity] int NOT NULL,
    [ExpectedCostPrice] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_PurchaseOrderItems] PRIMARY KEY ([PurchaseOrderItemId]),
    CONSTRAINT [FK_PurchaseOrderItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
    CONSTRAINT [FK_PurchaseOrderItems_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [PurchaseOrders] ([PurchaseOrderId]) ON DELETE CASCADE
);
GO

CREATE TABLE [StockTransactionItems] (
    [StockTransactionItemId] int NOT NULL IDENTITY,
    [StockTransactionHeaderId] int NOT NULL,
    [ProductId] int NOT NULL,
    [ProductBatchId] int NOT NULL,
    [TransactionType] nvarchar(max) NOT NULL,
    [Quantity] int NOT NULL,
    [CostPriceAtTransaction] decimal(18,2) NOT NULL,
    [SellingPriceAtTransaction] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_StockTransactionItems] PRIMARY KEY ([StockTransactionItemId]),
    CONSTRAINT [FK_StockTransactionItems_ProductBatches_ProductBatchId] FOREIGN KEY ([ProductBatchId]) REFERENCES [ProductBatches] ([ProductBatchId]) ON DELETE CASCADE,
    CONSTRAINT [FK_StockTransactionItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE NO ACTION,
    CONSTRAINT [FK_StockTransactionItems_StockTransactionHeaders_StockTransactionHeaderId] FOREIGN KEY ([StockTransactionHeaderId]) REFERENCES [StockTransactionHeaders] ([StockTransactionHeaderId]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_AuditLogs_UserId] ON [AuditLogs] ([UserId]);
GO

CREATE INDEX [IX_ProductBatches_ProductId] ON [ProductBatches] ([ProductId]);
GO

CREATE INDEX [IX_ProductBatches_PurchaseOrderId] ON [ProductBatches] ([PurchaseOrderId]);
GO

CREATE INDEX [IX_ProductBatches_SupplierId] ON [ProductBatches] ([SupplierId]);
GO

CREATE INDEX [IX_ProductSpecifications_ProductId] ON [ProductSpecifications] ([ProductId]);
GO

CREATE INDEX [IX_PurchaseOrderItems_ProductId] ON [PurchaseOrderItems] ([ProductId]);
GO

CREATE INDEX [IX_PurchaseOrderItems_PurchaseOrderId] ON [PurchaseOrderItems] ([PurchaseOrderId]);
GO

CREATE INDEX [IX_PurchaseOrders_SupplierId] ON [PurchaseOrders] ([SupplierId]);
GO

CREATE INDEX [IX_StockTransactionHeaders_SupplierId] ON [StockTransactionHeaders] ([SupplierId]);
GO

CREATE INDEX [IX_StockTransactionHeaders_UserId] ON [StockTransactionHeaders] ([UserId]);
GO

CREATE INDEX [IX_StockTransactionItems_ProductBatchId] ON [StockTransactionItems] ([ProductBatchId]);
GO

CREATE INDEX [IX_StockTransactionItems_ProductId] ON [StockTransactionItems] ([ProductId]);
GO

CREATE INDEX [IX_StockTransactionItems_StockTransactionHeaderId] ON [StockTransactionItems] ([StockTransactionHeaderId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260605080218_ExpandInventorySchema', N'8.0.11');
GO

COMMIT;
GO

