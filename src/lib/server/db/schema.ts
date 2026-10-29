import {
	doublePrecision,
	integer,
	pgEnum,
	pgTable,
	text,
	time,
	timestamp,
	uuid
} from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

export * from './auth.schema';

/**
 * Kullanıcı rolleri için enum tanımı
 *
 * admin: Yönetici (tüm yetkilere sahip)
 * manager: Mağaza yöneticisi (vardiya yöneticisi)
 * personel: Mağaza personeli
 */
export const userRoleEnum = pgEnum('user_role', ['admin', 'manager', 'personel']);

/**
 * Mola türleri için enum tanımı (4857 sayılı İş Kanunu'na göre)
 *
 * short: 15 dk (4 saat veya daha kısa)
 * medium: 30 dk (4 saatten fazla, 7,5 saate kadar)
 * long: 60 dk (7,5 saatten fazla)
 */
export const breakTypeEnum = pgEnum('break_type', ['short', 'medium', 'long']);

/**
 * Giriş/Çıkış türleri için enum tanımı
 *
 * check-in: Giriş
 * check-out: Çıkış
 */
export const attendanceTypeEnum = pgEnum('attendance_type', ['check-in', 'check-out']);

/**
 * Mola düzeltme durumları için enum tanımı
 *
 * pending: Beklemede (yönetici onayı bekliyor)
 * approved: Onaylandı (yönetici tarafından onaylandı)
 * rejected: Reddedildi (yönetici tarafından reddedildi)
 */
export const correctionStatusEnum = pgEnum('correction_status', [
	'pending',
	'approved',
	'rejected'
]);

/**
 * Konum tablosu
 *
 * QR kodu ile giriş/çıkış yapabilmek için konum bilgilerini saklar. Her konumun bir adı, koordinatları ve bir yarıçapı vardır. Ayrıca her konum için benzersiz bir QR token üretilir.
 */
export const location = pgTable('location', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	latitude: doublePrecision('latitude').notNull(),
	longitude: doublePrecision('longitude').notNull(),
	radiusMeters: integer('radius_meters').notNull(),
	qrToken: uuid('qr_token').defaultRandom().notNull().unique(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

/**
 * Vardiya tablosu
 *
 * Her vardiyanın bir adı, başlangıç ve bitiş zamanı vardır. Vardiyalar, kullanıcıların giriş/çıkış yapabilmesi için kullanılır.
 */
export const shift = pgTable('shift', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	startTime: time('start_time').notNull(),
	endTime: time('end_time').notNull()
});

/**
 * Audit log tablosu
 *
 * Kullanıcıların yaptığı işlemleri kaydeder.
 */
export const auditLog = pgTable('audit_log', {
	id: uuid('id').primaryKey().defaultRandom(),
	actorId: text('actor_id').references(() => user.id, { onDelete: 'set null' }),
	action: text('action').notNull(),
	details: text('details'),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
