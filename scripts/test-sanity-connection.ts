/**
 * Test Sanity Connection Script
 * Run this to verify your Sanity setup and see what data exists
 * 
 * Usage: npx ts-node scripts/test-sanity-connection.ts
 */

import { client } from '../lib/sanity.client.js';

async function testConnection() {
  console.log('🔍 Testing Sanity Connection...\n');

  try {
    // Test 1: Check client configuration
    console.log('📋 Configuration:');
    console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET'}`);
    console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT SET'}`);
    console.log(`   API Token: ${process.env.SANITY_API_TOKEN ? '✅ Set' : '❌ NOT SET'}\n`);

    // Test 2: Fetch all projects
    console.log('📦 Fetching all projects...');
    const allProjects = await client.fetch(`*[_type == "project"]`);
    console.log(`   Found ${allProjects.length} projects\n`);

    if (allProjects.length > 0) {
      console.log('   Projects:');
      allProjects.forEach((project: any, index: number) => {
        console.log(`   ${index + 1}. ${project.title}`);
        console.log(`      - Slug: ${project.slug?.current || 'NO SLUG'}`);
        console.log(`      - Featured: ${project.featured ? '✅ Yes' : '❌ No'}`);
        console.log(`      - Has Hero Image: ${project.heroImage ? '✅ Yes' : '❌ No'}`);
        console.log(`      - Category: ${project.category || 'NO CATEGORY'}`);
      });
      console.log('');
    }

    // Test 3: Fetch featured projects
    console.log('⭐ Fetching featured projects...');
    const featuredProjects = await client.fetch(`*[_type == "project" && featured == true]`);
    console.log(`   Found ${featuredProjects.length} featured projects\n`);

    if (featuredProjects.length > 0) {
      console.log('   Featured Projects:');
      featuredProjects.forEach((project: any, index: number) => {
        console.log(`   ${index + 1}. ${project.title}`);
      });
      console.log('');
    } else {
      console.log('   ⚠️  No projects are marked as featured!');
      console.log('   💡 Tip: Go to Sanity Studio and mark some projects as "Featured"\n');
    }

    // Test 4: Fetch all products
    console.log('🛍️  Fetching all products...');
    const allProducts = await client.fetch(`*[_type == "product"]`);
    console.log(`   Found ${allProducts.length} products\n`);

    // Test 5: Fetch all journal posts
    console.log('📰 Fetching all journal posts...');
    const allPosts = await client.fetch(`*[_type == "journalPost"]`);
    console.log(`   Found ${allPosts.length} journal posts\n`);

    // Test 6: Fetch all authors
    console.log('👤 Fetching all authors...');
    const allAuthors = await client.fetch(`*[_type == "author"]`);
    console.log(`   Found ${allAuthors.length} authors\n`);

    // Summary
    console.log('✅ Connection successful!\n');
    console.log('📊 Summary:');
    console.log(`   - Projects: ${allProjects.length} (${featuredProjects.length} featured)`);
    console.log(`   - Products: ${allProducts.length}`);
    console.log(`   - Journal Posts: ${allPosts.length}`);
    console.log(`   - Authors: ${allAuthors.length}\n`);

    if (allProjects.length === 0) {
      console.log('⚠️  No content found! Run the seed script:');
      console.log('   npx ts-node scripts/seed-sanity.ts\n');
    } else if (featuredProjects.length === 0) {
      console.log('⚠️  No featured projects! To fix:');
      console.log('   1. Go to your Sanity Studio');
      console.log('   2. Open a project');
      console.log('   3. Check the "Featured" checkbox');
      console.log('   4. Click "Publish"\n');
    }

  } catch (error) {
    console.error('❌ Error connecting to Sanity:', error);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Check that .env.local exists with correct credentials');
    console.log('   2. Verify NEXT_PUBLIC_SANITY_PROJECT_ID is correct');
    console.log('   3. Verify SANITY_API_TOKEN has read permissions');
    console.log('   4. Restart your dev server after adding .env.local\n');
  }
}

testConnection();
