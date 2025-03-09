import postgres from "postgres";
import { players } from "@/app/lib/sampletata" // Assuming your player data is in sampletata.ts

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export default async function addplayers() {
    try {
        for (const player of players) { // Use for...of for sequential execution
            await sql`
                INSERT INTO players (
                    name, 
                    university, 
                    category, 
                    totalruns, 
                    ballsfaced, 
                    inningsplayed, 
                    wickets, 
                    oversbowled, 
                    runsconceded
                ) VALUES (
                    ${player.Name}, 
                    ${player.University}, 
                    ${player.Category}, 
                    ${player["Total Runs"]}, 
                    ${player["Balls Faced"]}, 
                    ${player["Innings Played"]}, 
                    ${player.Wickets}, 
                    ${player["Overs Bowled"]}, 
                    ${player["Runs Conceded"]}
                )
            `;
            console.log(`Player ${player.Name} added successfully.`);
        }
        console.log("All players added successfully.");
    } catch (error) {
        console.error("Error adding players:", error);
    }
}

export async function GET() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await sql.begin((sql) => [
        addplayers(),
       
      ]);
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }
