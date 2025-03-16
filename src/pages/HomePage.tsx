
            </h2>
            <div className="mb-6">
              <ProductFilters onFilterChange={handleFilterChange} />
            </div>

            {/* Product Grid */}
            <ProductGrid
              title="Все товары"
              products={allProducts}
              onAddToCart={handleAddToCart}
              showFilters={false}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
