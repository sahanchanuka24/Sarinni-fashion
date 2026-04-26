const getOrderTemplate = (order, user) => {
    const orderItemsHtml = order.orderItems.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #333;">
                <div style="font-weight: 600;">${item.name}</div>
                <div style="font-size: 12px; color: #888;">LKR ${item.price.toLocaleString()} each</div>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: center; color: #333;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: right; color: #1a1a1a; font-weight: 600;">
                LKR ${(item.price * item.quantity).toLocaleString()}
            </td>
        </tr>
    `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap');
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #faf9f6; font-family: 'Inter', sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #faf9f6; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e5e1da; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                        <!-- Header -->
                        <tr>
                            <td align="center" style="padding: 40px 0 20px 0; background-color: #1a1a1a;">
                                <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 32px; letter-spacing: 4px; color: #c5a059; text-transform: uppercase;">
                                    SARINNI
                                </h1>
                                <p style="margin: 10px 0 0 0; font-size: 10px; letter-spacing: 3px; color: rgba(255,255,255,0.5); text-transform: uppercase;">
                                    Luxury Sarongs
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Body -->
                        <tr>
                            <td style="padding: 40px 40px 20px 40px;">
                                <h2 style="margin: 0 0 20px 0; font-family: 'Playfair Display', serif; font-size: 24px; color: #1a1a1a;">
                                    Confirming Your Order
                                </h2>
                                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.6;">
                                    Hello ${user.name}, your order has been received and is now being processed by our artisans.
                                </p>
                                
                                <div style="background-color: #fcfbf8; border: 1px solid #f0ede6; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                                    <table width="100%">
                                        <tr>
                                            <td style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Order ID</td>
                                            <td align="right" style="font-size: 12px; color: #1a1a1a; font-weight: 600;">#${order._id.toString().slice(-8).toUpperCase()}</td>
                                        </tr>
                                    </table>
                                </div>

                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                            <th align="left" style="padding-bottom: 12px; border-bottom: 2px solid #c5a059; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a;">Item</th>
                                            <th align="center" style="padding-bottom: 12px; border-bottom: 2px solid #c5a059; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a;">Qty</th>
                                            <th align="right" style="padding-bottom: 12px; border-bottom: 2px solid #c5a059; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a;">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${orderItemsHtml}
                                    </tbody>
                                </table>

                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #666;">Items Subtotal</td>
                                        <td align="right" style="padding: 8px 0; color: #1a1a1a;">LKR ${order.itemsPrice.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #666;">Shipping Fee</td>
                                        <td align="right" style="padding: 8px 0; color: #1a1a1a;">LKR ${order.shippingPrice.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px 0; border-top: 1px solid #e5e1da; font-size: 18px; font-weight: 600; color: #c5a059;">Total Amount</td>
                                        <td align="right" style="padding: 20px 0; border-top: 1px solid #e5e1da; font-size: 18px; font-weight: 600; color: #c5a059;">
                                            LKR ${order.totalPrice.toLocaleString()}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Shipping Info -->
                        <tr>
                            <td style="padding: 0 40px 40px 40px;">
                                <div style="background-color: #fafafa; border: 1px dashed #ddd; padding: 20px;">
                                    <h4 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a;">Delivery Address</h4>
                                    <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.6;">
                                        ${order.shippingInfo.address},<br>
                                        ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}<br>
                                        Phone: ${order.shippingInfo.phoneNo}
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 30px; background-color: #fcfbf8; border-top: 1px solid #f0ede6; font-size: 12px; color: #999;">
                                <p style="margin: 0 0 10px 0;">© 2026 Sarinni Luxury Sarongs. All Rights Reserved.</p>
                                <p style="margin: 0;">You are receiving this email because you placed an order at sarinni.com</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

module.exports = { getOrderTemplate };
