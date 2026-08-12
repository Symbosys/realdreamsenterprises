import { prisma } from "@/config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type AdminRole = "ADMIN" | "SUBADMIN";

export interface CreateAdminInput {
  name: string;
  email: string;
  password: string;
  role?: AdminRole;
  isActive?: boolean;
}

export interface UpdateAdminInput {
  name?: string;
  email?: string;
  password?: string;
  role?: AdminRole;
  isActive?: boolean;
}

export async function getAllAdmins() {
  const admins = await prisma.admin.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return admins;
}

export async function createAdmin(input: CreateAdminInput) {
  const { name, email, password, role = "ADMIN", isActive = true } = input;

  if (!name || !email || !password) {
    return { success: false, message: "Name, email, and password are required" };
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    return { success: false, message: "Admin with this email already exists" };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newAdmin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      isActive,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return { success: true, message: "Admin created successfully", data: newAdmin };
}

export async function AdminLogin(email: string, password: string) {
  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    return { success: false, message: "Invalid email or password" };
  }

  if (!admin.isActive) {
    return { success: false, message: "Account is disabled. Please contact the system administrator." };
  }

  const isPasswordValid = bcrypt.compareSync(password, admin.password);

  if (!isPasswordValid) {
    return { success: false, message: "Invalid email or password" };
  }

  const secret = process.env.JWT_SECRET || "realdreams_secret_key_2026";
  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    secret,
    { expiresIn: "24h" }
  );

  const { password: _, ...adminData } = admin;

  return { success: true, message: "Login successful", data: adminData, token };
}

export async function updateAdmin(id: number, input: UpdateAdminInput) {
  const existingAdmin = await prisma.admin.findUnique({
    where: { id },
  });

  if (!existingAdmin) {
    return { success: false, message: "Admin not found" };
  }

  if (input.email && input.email !== existingAdmin.email) {
    const emailCheck = await prisma.admin.findUnique({
      where: { email: input.email },
    });
    if (emailCheck) {
      return { success: false, message: "Email is already in use by another admin" };
    }
  }

  const updateData: {
    name?: string;
    email?: string;
    password?: string;
    role?: AdminRole;
    isActive?: boolean;
  } = {};

  if (input.name !== undefined) updateData.name = input.name;
  if (input.email !== undefined) updateData.email = input.email;
  if (input.password) updateData.password = bcrypt.hashSync(input.password, 10);
  if (input.role !== undefined) updateData.role = input.role;
  if (input.isActive !== undefined) updateData.isActive = input.isActive;

  const updatedAdmin = await prisma.admin.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return { success: true, message: "Admin updated successfully", data: updatedAdmin };
}

export async function deleteAdmin(id: number) {
  const existingAdmin = await prisma.admin.findUnique({
    where: { id },
  });

  if (!existingAdmin) {
    return { success: false, message: "Admin not found" };
  }

  await prisma.admin.delete({
    where: { id },
  });

  return { success: true, message: "Admin deleted successfully" };
}

