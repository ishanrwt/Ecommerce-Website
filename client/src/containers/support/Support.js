import React from 'react'
import Header from '../../components/Header'

function Support() {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2>Support</h2>
        <p>
          Need help? We're here to assist you with:
        </p>
        <ul>
          <li>Login or Registration Issues</li>
          <li>Problems adding to cart</li>
          <li>Product not showing correctly</li>
          <li>Admin tools and data management</li>
        </ul>
        <p>
          Please email us at <strong>help@univstore.com</strong> or use our contact page. You can also check your browser console for quick error logs.
        </p>
      </div>
    </div>
  );
}

export default Support
