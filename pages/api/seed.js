// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../database"
import { Entry } from "../../models"



export default async function handler(req, res) {

  await db.connect()

  await Entry.deleteMany()
  await Entry.insertMany([
    {
      title: 'Entrada 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      content: 'Turpis egestas integer eget aliquet nibh praesent tristique magna. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. Diam quis enim lobortis scelerisque fermentum dui faucibus. Sed odio morbi quis commodo odio aenean sed adipiscing. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Pretium quam vulputate dignissim suspendisse in est ante. Egestas congue quisque egestas diam in arcu cursus euismod. ',
      createdAd: Date.now(),
      updatedAt: Date.now(),
    }
  ])

  await db.disconnect()
  res.status(200).json({ name: 'John Doe' })


}
