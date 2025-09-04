// Simple script to test different registration data formats
// Run this in the browser console to test the backend

function testBackendRegistration() {
  const testFormats = [
    // Format 1: Original format
    {
      name: "Original Format",
      data: {
        Username: "testuser" + Math.floor(Math.random() * 10000),
        Password: "TestPass123!",
        Email: "test" + Math.floor(Math.random() * 10000) + "@example.com",
        Birthday: "1990-01-01"
      }
    },
    
    // Format 2: Lowercase fields
    {
      name: "Lowercase Fields",
      data: {
        username: "testuser" + Math.floor(Math.random() * 10000),
        password: "TestPass123!",
        email: "test" + Math.floor(Math.random() * 10000) + "@example.com",
        birthday: "1990-01-01"
      }
    },
    
    // Format 3: Minimal required
    {
      name: "Minimal Required",
      data: {
        Username: "testuser" + Math.floor(Math.random() * 10000),
        Password: "TestPass123!",
        Email: "test" + Math.floor(Math.random() * 10000) + "@example.com"
      }
    }
  ];

  testFormats.forEach(async (format, index) => {
    console.log(`\n=== Testing ${format.name} ===`);
    console.log("Data:", JSON.stringify(format.data, null, 2));
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(format.data)
      });
      
      console.log(`Status: ${response.status} ${response.statusText}`);
      
      const responseText = await response.text();
      console.log("Response:", responseText);
      
      if (response.ok) {
        console.log(`✅ ${format.name} WORKED!`);
        return; // Stop testing if one works
      } else {
        console.log(`❌ ${format.name} failed`);
      }
    } catch (error) {
      console.error(`Error with ${format.name}:`, error);
    }
  });
}

// Add to window for browser console access
if (typeof window !== 'undefined') {
  window.testBackendRegistration = testBackendRegistration;
  console.log("Use testBackendRegistration() in the browser console to test different formats");
}
