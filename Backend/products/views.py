from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.using('mongo').all()

    def perform_create(self, serializer):
        serializer.save(using='mongo')

class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.using('mongo').all()

    def perform_update(self, serializer):
        serializer.save(using='mongo')

    def perform_destroy(self, instance):
        instance.delete(using='mongo')
