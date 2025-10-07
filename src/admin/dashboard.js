const Dashboard = () => {
  return `
    <div style="padding: 40px; max-width: 1200px; margin: 0 auto;">
      <h1 style="color: #005783; margin-bottom: 10px; font-size: 32px;">Welcome to CareBridge Admin Panel</h1>
      <p style="color: #666; margin-bottom: 40px; font-size: 16px;">Manage your website content, team, products, and more.</p>
      
      <!-- Quick Actions Card -->
      <div style="background: linear-gradient(135deg, #007BA7 0%, #009EE0 100%); border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <h2 style="color: white; margin: 0 0 20px 0; font-size: 24px; display: flex; align-items: center;">
          <span style="font-size: 32px; margin-right: 10px;">🚀</span>
          Quick Actions
        </h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
          <!-- Upload Tool Button -->
          <a href="/upload-test.html" target="_blank" style="background: white; color: #007BA7; text-decoration: none; padding: 20px; border-radius: 8px; display: flex; align-items: center; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0, 0, 0, 0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.1)';">
            <span style="font-size: 40px; margin-right: 15px;">📸</span>
            <div>
              <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">Upload Images</div>
              <div style="font-size: 13px; color: #666;">Drag & drop image uploader</div>
            </div>
          </a>
          
          <!-- Content Management -->
          <a href="/admin/resources/ContentItem" style="background: white; color: #007BA7; text-decoration: none; padding: 20px; border-radius: 8px; display: flex; align-items: center; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0, 0, 0, 0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.1)';">
            <span style="font-size: 40px; margin-right: 15px;">📝</span>
            <div>
              <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">Content Items</div>
              <div style="font-size: 13px; color: #666;">Edit page content</div>
            </div>
          </a>
          
          <!-- Team Management -->
          <a href="/admin/resources/TeamMember" style="background: white; color: #007BA7; text-decoration: none; padding: 20px; border-radius: 8px; display: flex; align-items: center; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0, 0, 0, 0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.1)';">
            <span style="font-size: 40px; margin-right: 15px;">👥</span>
            <div>
              <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">Team Members</div>
              <div style="font-size: 13px; color: #666;">Manage team profiles</div>
            </div>
          </a>
          
          <!-- Products -->
          <a href="/admin/resources/Product" style="background: white; color: #007BA7; text-decoration: none; padding: 20px; border-radius: 8px; display: flex; align-items: center; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0, 0, 0, 0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.1)';">
            <span style="font-size: 40px; margin-right: 15px;">📦</span>
            <div>
              <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">Products</div>
              <div style="font-size: 13px; color: #666;">Manage product catalog</div>
            </div>
          </a>
        </div>
      </div>
      
      <!-- Upload Instructions Card -->
      <div style="background: #f8f9fa; border-left: 4px solid #007BA7; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
        <h3 style="color: #005783; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
          <span style="margin-right: 10px;">💡</span>
          How to Upload Images for Content Items
        </h3>
        <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: #333;">
          <li>Click the <strong>"📸 Upload Images"</strong> button above</li>
          <li>Drag & drop your image or click to browse</li>
          <li>Click <strong>"Copy"</strong> to copy the generated URL</li>
          <li>Go to Content Management → Content Items</li>
          <li>Paste the URL into the <strong>"Image Url"</strong> field</li>
          <li>Save your changes</li>
        </ol>
        <div style="margin-top: 15px; padding: 12px; background: #e8f4fd; border-radius: 6px; font-size: 14px; color: #005783;">
          <strong>📖 Tip:</strong> The upload tool opens in a new tab, so you can keep AdminJS open while uploading!
        </div>
      </div>
      
      <!-- Stats Card -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <div style="color: #999; font-size: 13px; margin-bottom: 5px;">SUPPORTED FORMATS</div>
          <div style="color: #005783; font-size: 16px; font-weight: bold;">JPG, PNG, GIF, WebP, SVG</div>
        </div>
        
        <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <div style="color: #999; font-size: 13px; margin-bottom: 5px;">MAX FILE SIZE</div>
          <div style="color: #005783; font-size: 16px; font-weight: bold;">5 MB</div>
        </div>
        
        <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <div style="color: #999; font-size: 13px; margin-bottom: 5px;">STORAGE LOCATION</div>
          <div style="color: #005783; font-size: 16px; font-weight: bold;">/uploads/content/</div>
        </div>
      </div>
      
      <!-- Resources Card -->
      <div style="background: white; border-radius: 8px; padding: 25px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <h3 style="color: #005783; margin: 0 0 20px 0; font-size: 20px;">📚 Documentation</h3>
        <div style="display: grid; gap: 12px;">
          <a href="https://github.com/SoftwareBrothers/adminjs" target="_blank" style="color: #007BA7; text-decoration: none; padding: 12px; background: #f8f9fa; border-radius: 6px; display: block; transition: background 0.2s;" onmouseover="this.style.background='#e8f4fd';" onmouseout="this.style.background='#f8f9fa';">
            → AdminJS Documentation
          </a>
          <div style="color: #007BA7; text-decoration: none; padding: 12px; background: #f8f9fa; border-radius: 6px; display: block;">
            → Image Upload Guide: See <code style="background: white; padding: 3px 8px; border-radius: 4px; color: #005783;">IMAGE_UPLOAD_GUIDE.md</code>
          </div>
          <div style="color: #007BA7; text-decoration: none; padding: 12px; background: #f8f9fa; border-radius: 6px; display: block;">
            → Quick Start: See <code style="background: white; padding: 3px 8px; border-radius: 4px; color: #005783;">QUICK_START_IMAGE_UPLOAD.md</code>
          </div>
        </div>
      </div>
    </div>
  `;
};

module.exports = Dashboard;
