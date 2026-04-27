const getOrderTemplate = (order, user) => {
    const orderItemsHtml = order.orderItems.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f5ede0; color: #333;">
                <div style="font-weight: 600; color: #1a1209;">${item.name}</div>
                <div style="font-size: 12px; color: #b08040; margin-top:2px;">LKR ${item.price.toLocaleString()} each</div>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #f5ede0; text-align: center; color: #555;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #f5ede0; text-align: right; color: #1a1209; font-weight: 600;">
                LKR ${(item.price * item.quantity).toLocaleString()}
            </td>
        </tr>
    `).join('');

    // Safe address line — skip empty postalCode
    const postalPart = order.shippingInfo.postalCode ? `, ${order.shippingInfo.postalCode}` : '';
    const addressLine = `${order.shippingInfo.address}, ${order.shippingInfo.city}${postalPart}`;

    // Use customer name from shippingInfo if available, fallback to user.name
    const customerName = user.name && user.name !== 'Valued Customer'
        ? user.name
        : 'Valued Customer';

    const orderId = order._id.toString().slice(-8).toUpperCase();

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation — Sarinni</title>
    </head>
    <body style="margin:0;padding:0;background-color:#fdf6ec;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#fdf6ec;padding:32px 16px;">
            <tr>
                <td align="center">
                    <table width="580" border="0" cellspacing="0" cellpadding="0" style="max-width:580px;width:100%;background-color:#ffffff;border:1px solid #f0e4cc;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">

                        <!-- Header -->
                        <tr>
                            <td align="center" style="padding:36px 40px 28px;background:linear-gradient(135deg,#1a1209 0%,#2d1f0a 100%);">
                                <div style="font-size:11px;letter-spacing:4px;color:#e8a020;text-transform:uppercase;margin-bottom:8px;">🌸 &nbsp;Avurudu Collection 2026</div>
                                <h1 style="margin:0;font-size:34px;letter-spacing:5px;color:#e8a020;text-transform:uppercase;font-family:Georgia,serif;">SARINNI</h1>
                                <p style="margin:8px 0 0;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.45);text-transform:uppercase;">Luxury Sarongs · Sri Lanka</p>
                            </td>
                        </tr>

                        <!-- Confirmation Banner -->
                        <tr>
                            <td style="padding:0;">
                                <div style="background:#e8a020;padding:14px 40px;text-align:center;">
                                    <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:2px;color:#fff;text-transform:uppercase;">
                                        ✓ &nbsp;Order Confirmed
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- Greeting -->
                        <tr>
                            <td style="padding:36px 40px 20px;">
                                <h2 style="margin:0 0 12px;font-size:22px;color:#1a1209;font-family:Georgia,serif;">
                                    Thank you, ${customerName}! 🎉
                                </h2>
                                <p style="margin:0;color:#666;line-height:1.7;font-size:14px;">
                                    Your order has been received and is being prepared with care. We will contact you shortly to confirm your delivery details.
                                </p>

                                <!-- Order ID Box -->
                                <div style="margin:24px 0 0;background:#fdf6ec;border:1px solid #f0e4cc;border-left:4px solid #e8a020;padding:16px 20px;border-radius:4px;">
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;">Order Reference</td>
                                            <td align="right" style="font-size:14px;font-weight:700;color:#1a1209;letter-spacing:1px;">#${orderId}</td>
                                        </tr>
                                        <tr>
                                            <td style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;padding-top:6px;">Payment Method</td>
                                            <td align="right" style="font-size:13px;color:#3d7a5c;font-weight:600;padding-top:6px;">Cash on Delivery</td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>

                        <!-- Order Items -->
                        <tr>
                            <td style="padding:0 40px 24px;">
                                <h3 style="margin:0 0 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#e8a020;font-family:'Helvetica Neue',Arial,sans-serif;">Your Items</h3>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-radius:6px;overflow:hidden;border:1px solid #f0e4cc;">
                                    <thead>
                                        <tr style="background:#fdf6ec;">
                                            <th align="left" style="padding:10px 12px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:600;border-bottom:1px solid #f0e4cc;">Product</th>
                                            <th align="center" style="padding:10px 12px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:600;border-bottom:1px solid #f0e4cc;">Qty</th>
                                            <th align="right" style="padding:10px 12px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:600;border-bottom:1px solid #f0e4cc;">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${orderItemsHtml}
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        <!-- Price Summary -->
                        <tr>
                            <td style="padding:0 40px 32px;">
                                <table width="100%" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td style="padding:8px 0;color:#888;font-size:14px;">Subtotal</td>
                                        <td align="right" style="padding:8px 0;color:#333;font-size:14px;">LKR ${order.itemsPrice.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:8px 0;color:#888;font-size:14px;">Shipping</td>
                                        <td align="right" style="padding:8px 0;color:#3d7a5c;font-size:14px;font-weight:600;">${order.shippingPrice === 0 ? 'FREE' : 'LKR ' + order.shippingPrice.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="padding:4px 0;"><div style="height:1px;background:#f0e4cc;"></div></td>
                                    </tr>
                                    <tr>
                                        <td style="padding:14px 0 0;font-size:18px;font-weight:700;color:#1a1209;font-family:Georgia,serif;">Total</td>
                                        <td align="right" style="padding:14px 0 0;font-size:18px;font-weight:700;color:#e8a020;font-family:Georgia,serif;">LKR ${order.totalPrice.toLocaleString()}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Delivery Info -->
                        <tr>
                            <td style="padding:0 40px 36px;">
                                <div style="background:#fdf6ec;border:1px dashed #e0c898;border-radius:6px;padding:20px 24px;">
                                    <h4 style="margin:0 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#e8a020;">📦 &nbsp;Delivery Details</h4>
                                    <p style="margin:0;font-size:14px;color:#555;line-height:1.8;">
                                        <strong style="color:#1a1209;">${addressLine}</strong><br>
                                        <span style="color:#888;">Phone: ${order.shippingInfo.phoneNo}</span>
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- Help Note -->
                        <tr>
                            <td style="padding:0 40px 32px;text-align:center;">
                                <p style="margin:0;font-size:13px;color:#aaa;line-height:1.6;">
                                    Questions? Reply to this email or contact us at<br>
                                    <a href="mailto:fashionsarini@gmail.com" style="color:#e8a020;text-decoration:none;font-weight:600;">fashionsarini@gmail.com</a>
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding:20px 40px;background:#1a1209;text-align:center;">
                                <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#e8a020;text-transform:uppercase;">SARINNI</p>
                                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">© 2026 Sarinni Luxury Sarongs · Sri Lanka</p>
                                <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.2);">අලුත් අවුරුද්ද සුභ වේවා 🌸</p>
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
