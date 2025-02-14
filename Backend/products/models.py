from djongo import models

class Product(models.Model):
    product_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    stock_status = models.CharField(max_length=50)
    rating = models.FloatField()
    reviews = models.IntegerField()
    brand = models.CharField(max_length=100)
    image_url = models.URLField()
    availability = models.CharField(max_length=50)

    class Meta:
        db_table = "product"  # Explicitly set the collection name in MongoDB
