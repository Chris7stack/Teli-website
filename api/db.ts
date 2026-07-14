import pg from 'pg';


// Determine if we should use PostgreSQL
const isPostgres = !!process.env.DATABASE_URL;

let pgPool: pg.Pool | null = null;


export async function getDb() {
  if (isPostgres) {
    if (!pgPool) {
      pgPool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false // Required for many hosted database providers like Supabase/Neon
        }
      });
      
      // Initialize Postgres tables on connection
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          first_name TEXT,
          last_name TEXT,
          email TEXT,
          phone TEXT,
          institution TEXT,
          role TEXT,
          program TEXT,
          message TEXT,
          timestamp TEXT
        );

        CREATE TABLE IF NOT EXISTS applications (
          id SERIAL PRIMARY KEY,
          first_name TEXT,
          last_name TEXT,
          email TEXT,
          phone TEXT,
          institution TEXT,
          role TEXT,
          experience TEXT,
          statement TEXT,
          challenges TEXT,
          mentor_preference TEXT,
          resume_name TEXT,
          resume_base64 TEXT,
          app_ref_id TEXT,
          timestamp TEXT
        );
      `);
    }
    return {
      type: 'postgres',
      pool: pgPool,
      async insertContact(data: any) {
        const result = await pgPool!.query(`
          INSERT INTO contact_submissions (first_name, last_name, email, phone, institution, role, program, message, timestamp)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING id
        `, [
          data.firstName, data.lastName, data.email, data.phone || '',
          data.institution || '', data.role || '', data.program || '',
          data.message || '', data.timestamp || new Date().toISOString()
        ]);
        return result.rows[0].id;
      },
      async insertApplication(data: any) {
        const result = await pgPool!.query(`
          INSERT INTO applications (
            first_name, last_name, email, phone, institution, role, experience,
            statement, challenges, mentor_preference, resume_name, resume_base64, app_ref_id, timestamp
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          RETURNING id
        `, [
          data.firstName, data.lastName, data.email, data.phone || '',
          data.institution || '', data.role || '', data.experience || '',
          data.statement, data.challenges, data.mentorPreference || '',
          data.resumeName || '', data.resumeBase64 || '', data.appRefId || '',
          data.timestamp || new Date().toISOString()
        ]);
        return result.rows[0].id;
      },
      async getSubmissions() {
        const contactsResult = await pgPool!.query('SELECT * FROM contact_submissions ORDER BY id DESC');
        const applicationsResult = await pgPool!.query('SELECT * FROM applications ORDER BY id DESC');
        
        // Map postgres fields to both camelCase and snake_case for maximum frontend compatibility
        const contacts = contactsResult.rows.map(row => ({
          id: row.id,
          firstName: row.first_name,
          first_name: row.first_name,
          lastName: row.last_name,
          last_name: row.last_name,
          email: row.email,
          phone: row.phone,
          institution: row.institution,
          role: row.role,
          program: row.program,
          message: row.message,
          timestamp: row.timestamp
        }));

        const applications = applicationsResult.rows.map(row => ({
          id: row.id,
          firstName: row.first_name,
          first_name: row.first_name,
          lastName: row.last_name,
          last_name: row.last_name,
          email: row.email,
          phone: row.phone,
          institution: row.institution,
          role: row.role,
          experience: row.experience,
          statement: row.statement,
          challenges: row.challenges,
          mentorPreference: row.mentor_preference,
          mentor_preference: row.mentor_preference,
          resumeName: row.resume_name,
          resume_name: row.resume_name,
          resumeBase64: row.resume_base64,
          resume_base64: row.resume_base64,
          appRefId: row.app_ref_id,
          app_ref_id: row.app_ref_id,
          timestamp: row.timestamp
        }));

        return { contacts, applications };
      }
    };
  }
}
