const AddProductPage = ({ onNavigate }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [tokenType, setTokenType] = useState('USDT');
  const [description, setDescription] = useState('');

  const handleAddProduct = () => {
    console.log('Adding product:', { productName, price, tokenType, description });
    // Firebase: addDoc(collection(db, 'products'), { ... })
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      <SidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onNavigate={onNavigate}
      />
      
      <div className="relative">
        <LogoBar />
        
        <button
          onClick={() => setIsPanelOpen(true)}
          className="fixed top-6 left-6 z-30 p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-3xl font-bold text-white mb-8">Add Product</h1>
            
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-8 shadow-2xl space-y-6">
              <InputField
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
              
              <InputField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
              
              <Dropdown
                label="Token Type"
                options={['USDT', 'USDC', 'DAI', 'ETH']}
                value={tokenType}
                onChange={(e) => setTokenType(e.target.value)}
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter product description"
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all resize-none"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddProduct}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Add Product
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};