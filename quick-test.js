// quick-test.js
console.log('🔍 Quick Test - Checking Public Pages\n');

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' }
];

async function testPage(page) {
  try {
    const response = await fetch(`http://localhost:5173${page.path}`);
    if (response.ok) {
      console.log(`✅ ${page.name} page: Working (Status ${response.status})`);
      return true;
    } else {
      console.log(`❌ ${page.name} page: Failed (Status ${response.status})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${page.name} page: Error - ${error.message}`);
    return false;
  }
}

async function runTest() {
  console.log('Make sure your frontend is running on port 5173\n');
  
  let allWorking = true;
  
  for (const page of pages) {
    const working = await testPage(page);
    if (!working) allWorking = false;
  }
  
  console.log('\n📋 Summary:');
  if (allWorking) {
    console.log('✅ All public pages are accessible!');
    console.log('\n🌐 You can now view:');
    console.log('   http://localhost:5173/');
    console.log('   http://localhost:5173/about');
    console.log('   http://localhost:5173/services');
    console.log('   http://localhost:5173/contact');
  } else {
    console.log('❌ Some pages failed. Check your server.');
  }
}

runTest();