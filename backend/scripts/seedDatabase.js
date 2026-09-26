require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');

// Load models
const User = require('../src/models/User');
const Room = require('../src/models/Room');
const Guest = require('../src/models/Guest');
const Booking = require('../src/models/Booking');
const StaffRoster = require('../src/models/StaffRoster');
const PantryInventory = require('../src/models/PantryInventory');
const OperationalTicket = require('../src/models/OperationalTicket');
const ActionCard = require('../src/models/ActionCard');
const AuditLog = require('../src/models/AuditLog');

const connectDB = require('../src/config/database');

const seedData = async () => {
  try {
    await connectDB();
    console.log('Clearing existing data...');
    
    await User.deleteMany({});
    await Room.deleteMany({});
    await Guest.deleteMany({});
    await Booking.deleteMany({});
    await StaffRoster.deleteMany({});
    await PantryInventory.deleteMany({});
    await OperationalTicket.deleteMany({});
    await ActionCard.deleteMany({});
    await AuditLog.deleteMany({});

    console.log('Inserting seed data...');

    // 1. Users
    const users = await User.insertMany([
      { name: 'Alice GM', role: 'gm', email: 'alice@smartresort.com' },
      { name: 'Bob Rev', role: 'revenue_manager', email: 'bob@smartresort.com' },
      { name: 'Charlie Fac', role: 'facilities_lead', email: 'charlie@smartresort.com' },
      { name: 'Dave Staff', role: 'staff', email: 'dave@smartresort.com' }
    ]);

    // 2. Guests
    const guests = await Guest.insertMany(
      Array.from({ length: 15 }).map((_, i) => ({
        guestCode: `G-${1000 + i}`,
        name: `Guest Name ${i}`,
        segment: i % 3 === 0 ? 'VIP' : 'Standard'
      }))
    );

    // 3. Rooms
    const roomStatuses = ['available', 'occupied', 'cleaning', 'maintenance'];
    const rooms = await Room.insertMany(
      Array.from({ length: 20 }).map((_, i) => {
        const rNum = i === 3 ? '304' : `${100 + i}`;
        return {
          roomNumber: rNum,
          roomType: i % 2 === 0 ? 'Suite' : 'Standard',
          floor: Math.floor(i / 10) + 1,
          status: roomStatuses[i % 4],
          housekeepingStatus: roomStatuses[i % 4] === 'available' ? 'ready' : (roomStatuses[i % 4] === 'cleaning' ? 'cleaning' : 'dirty'),
          baseRate: 200,
          currentRate: 250,
          currentGuestId: roomStatuses[i % 4] === 'occupied' ? guests[i % guests.length]._id : null
        };
      })
    );

    // 4. Bookings
    const bookings = await Booking.insertMany(
      Array.from({ length: 25 }).map((_, i) => ({
        bookingCode: `B-${2000 + i}`,
        roomNumber: rooms[i % rooms.length].roomNumber,
        guestId: guests[i % guests.length]._id,
        checkIn: new Date(),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 3)),
        status: i % 2 === 0 ? 'confirmed' : 'checked_in',
        adults: 2,
        roomRate: 250,
        leadTimeDays: 14
      }))
    );

    // 5. Staff
    const depts = ['Housekeeping', 'Front Office', 'F&B', 'Engineering', 'Spa'];
    const staff = await StaffRoster.insertMany(
      Array.from({ length: 20 }).map((_, i) => ({
        staffCode: `S-${3000 + i}`,
        name: `Staff Member ${i}`,
        department: depts[i % 5],
        role: 'Attendant',
        shiftDate: new Date(),
        shiftStart: new Date(),
        shiftEnd: new Date(new Date().setHours(new Date().getHours() + 8)),
        hourlyCost: 20,
        skills: ['General']
      }))
    );

    // 6. Pantry Inventory
    const pantry = await PantryInventory.insertMany([
      { itemCode: 'INV-001', itemName: 'Fresh Salmon', category: 'Seafood', currentStockKg: 5, reorderLevelKg: 10, maxStockKg: 50, unitCost: 15 },
      { itemCode: 'INV-002', itemName: 'Chicken Breast', category: 'Meat', currentStockKg: 20, reorderLevelKg: 15, maxStockKg: 100, unitCost: 8 },
      { itemCode: 'INV-003', itemName: 'Rice', category: 'Dry Goods', currentStockKg: 50, reorderLevelKg: 20, maxStockKg: 200, unitCost: 2 },
      { itemCode: 'INV-004', itemName: 'Tomatoes', category: 'Produce', currentStockKg: 15, reorderLevelKg: 10, maxStockKg: 30, unitCost: 3 },
      { itemCode: 'INV-005', itemName: 'Olive Oil', category: 'Pantry', currentStockKg: 12, reorderLevelKg: 5, maxStockKg: 25, unitCost: 10 }
    ]);

    // 7. Operational Tickets
    const tickets = await OperationalTicket.insertMany([
      { ticketCode: 'T-001', source: 'manual', roomNumber: '304', department: 'Engineering', category: 'Maintenance', priority: 'high', title: 'AC Not Working', status: 'todo', slaMinutes: 30 },
      { ticketCode: 'T-002', source: 'system_alert', department: 'F&B', category: 'Inventory', priority: 'medium', title: 'Low Salmon Stock', status: 'todo', slaMinutes: 60 },
      { ticketCode: 'T-003', source: 'review', department: 'Housekeeping', category: 'Cleanliness', priority: 'low', title: 'Dusty Room', status: 'completed', slaMinutes: 120 },
      { ticketCode: 'T-004', source: 'manual', department: 'Front Office', category: 'Guest Request', priority: 'medium', title: 'Extra Towels', status: 'in_progress', slaMinutes: 15 },
      { ticketCode: 'T-005', source: 'system_alert', department: 'Spa', category: 'Booking', priority: 'low', title: 'Overbooked Schedule', status: 'todo', slaMinutes: 45 }
    ]);

    // 8. Action Cards
    const cards = await ActionCard.insertMany([
      { actionCode: 'AC-001', type: 'maintenance_routing', title: 'Reroute AC Repair', summary: 'Route engineering to Room 304', situation: 'AC broken in 304', recommendedAction: 'Assign Charlie to Room 304 immediately', riskLevel: 'low', status: 'pending' },
      { actionCode: 'AC-002', type: 'inventory_reorder', title: 'Emergency Salmon Order', summary: 'Order fresh salmon due to high demand', situation: 'Stock at 5kg, below 10kg threshold', recommendedAction: 'Place emergency order for 20kg', riskLevel: 'medium', status: 'pending' }
    ]);

    // 9. Audit Log
    const logs = await AuditLog.insertMany([
      { action: 'system_startup', actorId: users[0]._id, actorRole: 'gm', entityType: 'System', entityId: users[0]._id }
    ]);

    console.log('--- Seeding Complete ---');
    console.log(`Users: ${users.length}`);
    console.log(`Rooms: ${rooms.length}`);
    console.log(`Guests: ${guests.length}`);
    console.log(`Bookings: ${bookings.length}`);
    console.log(`Staff: ${staff.length}`);
    console.log(`Pantry: ${pantry.length}`);
    console.log(`Tickets: ${tickets.length}`);
    console.log(`Action Cards: ${cards.length}`);
    console.log(`Audit Logs: ${logs.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
