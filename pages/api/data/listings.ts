let listings = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  car: ['Toyota Corolla', 'Honda Civic', 'Ford Focus', 'BMW X3', 'Hyundai i20', 'Tata Nexon', 'Kia Seltos'][i % 7],
  owner: ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Farhan', 'Gauri'][i % 7],
  status: ['Approved', 'Rejected'][i % 2],
}));

export {listings}