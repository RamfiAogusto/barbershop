#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Limpiando cache de Next.js...');

try {
  // Limpiar el cache de Next.js
  const nextCacheDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextCacheDir)) {
    fs.rmSync(nextCacheDir, { recursive: true, force: true });
    console.log('✅ Cache de .next eliminado');
  }

  // Limpiar node_modules/.cache si existe
  const nodeModulesCache = path.join(process.cwd(), 'node_modules', '.cache');
  if (fs.existsSync(nodeModulesCache)) {
    fs.rmSync(nodeModulesCache, { recursive: true, force: true });
    console.log('✅ Cache de node_modules eliminado');
  }

  // Limpiar cache de npm/yarn
  console.log('🧹 Limpiando cache de npm...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  
  console.log('✅ Cache limpiado exitosamente');
  console.log('🚀 Iniciando servidor de desarrollo...');
  
  // Iniciar el servidor de desarrollo
  execSync('npm run dev', { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Error al limpiar cache:', error.message);
  process.exit(1);
} 