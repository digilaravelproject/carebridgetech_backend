import React, { useState, useEffect } from 'react';
import { Box, Button, Loader, Text, H2, Icon, Input } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

const api = new ApiClient();

const MediaGallery = () => {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredFiles(files);
      return;
    }
    const lower = search.toLowerCase();
    setFilteredFiles(files.filter(f => f.name.toLowerCase().includes(lower)));
  }, [search, files]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      // We need to use the axios instance from ApiClient or fetch directly
      const response = await fetch('/api/upload/files');
      const data = await response.json();
      
      if (data.success) {
        setFiles(data.files);
        setFilteredFiles(data.files);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (path, type) => {
    let textToCopy = path;
    
    if (type === 'url') {
      const origin = window.location.origin;
      textToCopy = `${origin}${path}`;
    }
    
    // For type === 'path', we just use the relative path as is
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(path + type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box variant="grey">
      <Box variant="white" data-css="default-dashboard" padding={40}>
        <H2>Media Gallery</H2>
        <Text>View and copy URLs for all uploaded media files.</Text>
        
        <Box marginY={20}>
            <Input 
                width="100%" 
                placeholder="Search files..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </Box>

        <Box style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '20px',
            marginTop: '20px'
        }}>
          {filteredFiles.map((file, index) => (
            <Box key={index} style={{ 
                border: '1px solid #eee', 
                borderRadius: '8px', 
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
              <Box style={{ 
                  height: '150px', 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '10px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                  overflow: 'hidden'
              }}>
                <img 
                    src={file.path} 
                    alt={file.name} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </Box>
              <Text style={{ fontSize: '12px', marginBottom: '8px', wordBreak: 'break-all', textAlign: 'center' }}>
                {file.name}
              </Text>
              <Box flex flexDirection="row" style={{ gap: '10px' }}>
                <Button 
                  size="sm" 
                  onClick={() => copyToClipboard(file.path, 'url')}
                  variant={copied === file.path + 'url' ? 'success' : 'primary'}
                >
                  {copied === file.path + 'url' ? 'Copied URL!' : 'Copy URL'}
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => copyToClipboard(file.path, 'path')}
                  variant={copied === file.path + 'path' ? 'success' : 'secondary'}
                >
                  {copied === file.path + 'path' ? 'Copied Path!' : 'Copy Path'}
                </Button>
              </Box>
            </Box>
          ))}
          
          {filteredFiles.length === 0 && (
              <Box>
                  <Text>No files found.</Text>
              </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MediaGallery;
