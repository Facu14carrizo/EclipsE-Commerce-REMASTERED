import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export function Cart() {
  const { 
    items, 
    totalItems, 
    subtotal,
    shipping,
    tax,
    finalTotal,
    isOpen, 
    isProcessing,
    orderComplete,
    setIsOpen, 
    updateQuantity, 
    removeItem, 
    clearCart,
    processOrder
  } = useCart();

  if (!isOpen) return null;

  if (orderComplete) {
    return (
      <div className="fixed inset-0 z-[100] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 border-l border-white/10 shadow-2xl">
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <CheckCircle className="h-20 w-20 text-green-400 mb-6 animate-bounce" />
            <h2 className="text-2xl font-bold text-white mb-4">¡Pedido Confirmado!</h2>
            <p className="text-gray-300 mb-6">
              Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación pronto.
            </p>
            <div className="text-sm text-gray-400">
              Cerrando automáticamente...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 border-l border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">
              Carrito ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500 mt-2">
                  Agrega algunos telescopios increíbles
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{item.product.brand}</p>
                      <p className="text-cyan-400 font-semibold">${item.product.price}</p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        
                        <span className="text-white font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-white/10 p-6 space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Truck className="h-4 w-4" />
                    <span>Envío:</span>
                  </div>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>
                    {shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Impuestos:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                {shipping === 0 && (
                  <div className="flex items-center space-x-1 text-green-400 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Envío gratis en compras +$500</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold text-white">
                  <span>Total:</span>
                  <span className="text-cyan-400">${finalTotal.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <button 
                    onClick={processOrder}
                    disabled={isProcessing}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        <span>Proceder al Pago</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={clearCart}
                    disabled={isProcessing}
                    className="w-full py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}