import AppDataSource from './config/data-source'; // Fixed path: ./config/ (no 'src/')

async function testConnection() {
  try {
    // Debug: Confirm env vars (remove after)
    console.log(
      'Password from env:',
      process.env.POSTGRES_PASSWORD ? '***LOADED***' : 'MISSING!',
    );
    console.log('DB Config:', {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DATABASE,
    });

    await AppDataSource.initialize();
    console.log('✅ DB Connected successfully!');

    // Optional: Test a simple query
    const result = await AppDataSource.query('SELECT NOW()');
    console.log('Current DB time:', result[0].now);

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.code === 'ENOTFOUND') {
      console.log('💡 Tip: Ensure Postgres is running on localhost:5432');
    } else if (error.code === '28P01') {
      console.log('💡 Tip: Check username/password in .env');
    }
  }
}

testConnection();
