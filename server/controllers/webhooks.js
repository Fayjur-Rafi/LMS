// import { Webhook } from "svix";
// import User from "../models/User.js";

// const clerkWebhooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });
//     const { data, type } = req.body;
//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           imageUrl: data.image_url,
//         };
//         await User.create(userData);
//         res.json({});
//         break;
//       }
//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           imageUrl: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData);
//         res.json({});
//         break;
//       }
//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         res.json({});
//         break;
//       }

//       default:
//         break;
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhooks;


import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
  console.log("🔔 Webhook endpoint hit!"); // ADD
  console.log("Headers:", req.headers); // ADD
  console.log("Body type:", req.body.type); // ADD
  
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
    console.log("Verifying webhook..."); // ADD
    
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    
    console.log("✅ Webhook verified successfully"); // ADD
    
    const { data, type } = req.body;
    
    switch (type) {
      case "user.created": {
        console.log("📝 Creating new user..."); // ADD
        console.log("User data:", data); // ADD
        
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        
        console.log("Prepared user data:", userData); // ADD
        
        const newUser = await User.create(userData);
        console.log("✅ User created in DB:", newUser); // ADD
        
        res.json({ success: true });
        break;
      }
      case "user.updated": {
        console.log("📝 Updating user..."); // ADD
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("✅ User updated"); // ADD
        res.json({ success: true });
        break;
      }
      case "user.deleted": {
        console.log("🗑️ Deleting user..."); // ADD
        await User.findByIdAndDelete(data.id);
        console.log("✅ User deleted"); // ADD
        res.json({ success: true });
        break;
      }
      default:
        console.log("⚠️ Unknown event type:", type); // ADD
        break;
    }
  } catch (error) {
    console.error("❌ ERROR:", error.message); // ADD
    console.error("Full error:", error); // ADD
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;