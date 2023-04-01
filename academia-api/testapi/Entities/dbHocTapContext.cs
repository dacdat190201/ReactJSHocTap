using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace testapi.Entities
{
    public partial class dbHocTapContext : DbContext
    {
        public dbHocTapContext()
        {
        }

        public dbHocTapContext(DbContextOptions<dbHocTapContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<Baihoc> Baihoc { get; set; }
        public virtual DbSet<Bailam> Bailam { get; set; }
        public virtual DbSet<Cauhoi> Cauhoi { get; set; }
        public virtual DbSet<Cautraloi> Cautraloi { get; set; }
        public virtual DbSet<Chude> Chude { get; set; }
        public virtual DbSet<Chuong> Chuong { get; set; }
        public virtual DbSet<Cthoadon> Cthoadon { get; set; }
        public virtual DbSet<Dethi> Dethi { get; set; }
        public virtual DbSet<Dethicauhoi> Dethicauhoi { get; set; }
        public virtual DbSet<Giaovien> Giaovien { get; set; }
        public virtual DbSet<Giohang> Giohang { get; set; }
        public virtual DbSet<Hoadon> Hoadon { get; set; }
        public virtual DbSet<Kiemtra> Kiemtra { get; set; }
        public virtual DbSet<Lichsuhoc> Lichsuhoc { get; set; }
        public virtual DbSet<Lophoc> Lophoc { get; set; }
        public virtual DbSet<Magiamgia> Magiamgia { get; set; }
        public virtual DbSet<Monhoc> Monhoc { get; set; }
        public virtual DbSet<UserRefreshTokens> UserRefreshTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-QDRGJQ8\\SQLEXPRESS;Database=DataHocTap;Trusted_Connection=True;MultipleActiveResultSets=true;persist security info=True;user id=sa;password=123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.Property(e => e.RoleId)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(450);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(450);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Role");
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.DiaChi).HasMaxLength(150);

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.EmailReal).HasMaxLength(150);

                entity.Property(e => e.ImagesUser).HasMaxLength(256);

                entity.Property(e => e.MaSinhVien).ValueGeneratedOnAdd();

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });
            });

            modelBuilder.Entity<Baihoc>(entity =>
            {
                entity.HasKey(e => e.MaBh);

                entity.ToTable("BAIHOC");

                entity.Property(e => e.MaBh).HasColumnName("MaBH");

                entity.Property(e => e.NoiDung).HasMaxLength(2500);

                entity.Property(e => e.TenBh)
                    .HasColumnName("TenBH")
                    .HasMaxLength(500);

                entity.HasOne(d => d.MaChuongNavigation)
                    .WithMany(p => p.Baihoc)
                    .HasForeignKey(d => d.MaChuong)
                    .HasConstraintName("FK_MaChuong");
            });

            modelBuilder.Entity<Bailam>(entity =>
            {
                entity.HasKey(e => e.MaBl);

                entity.ToTable("BAILAM");

                entity.Property(e => e.MaBl).HasColumnName("MaBL");

                entity.Property(e => e.DapAn).HasMaxLength(500);

                entity.Property(e => e.MaCh).HasColumnName("MaCH");

                entity.Property(e => e.MaKt).HasColumnName("MaKT");

                entity.HasOne(d => d.MaChNavigation)
                    .WithMany(p => p.Bailam)
                    .HasForeignKey(d => d.MaCh)
                    .HasConstraintName("FK_BL_CH");

                entity.HasOne(d => d.MaKtNavigation)
                    .WithMany(p => p.Bailam)
                    .HasForeignKey(d => d.MaKt)
                    .HasConstraintName("FK_BL_KT");
            });

            modelBuilder.Entity<Cauhoi>(entity =>
            {
                entity.HasKey(e => e.MaCh);

                entity.ToTable("CAUHOI");

                entity.Property(e => e.MaCh).HasColumnName("MaCH");

                entity.Property(e => e.DapAn).HasMaxLength(500);

                entity.Property(e => e.GiaiThich).HasMaxLength(2000);

                entity.Property(e => e.LoaiCauHoi).HasMaxLength(100);

                entity.Property(e => e.TenCauHoi).HasMaxLength(200);
            });

            modelBuilder.Entity<Cautraloi>(entity =>
            {
                entity.HasKey(e => e.MaCtl);

                entity.ToTable("CAUTRALOI");

                entity.Property(e => e.MaCtl).HasColumnName("MaCTL");

                entity.Property(e => e.CauA).HasMaxLength(500);

                entity.Property(e => e.CauB).HasMaxLength(500);

                entity.Property(e => e.CauC).HasMaxLength(500);

                entity.Property(e => e.CauD).HasMaxLength(500);

                entity.Property(e => e.MaCh).HasColumnName("MaCH");

                entity.HasOne(d => d.MaChNavigation)
                    .WithMany(p => p.Cautraloi)
                    .HasForeignKey(d => d.MaCh)
                    .HasConstraintName("FK_CTL_CH");
            });

            modelBuilder.Entity<Chude>(entity =>
            {
                entity.HasKey(e => e.MaChuDe);

                entity.ToTable("CHUDE");

                entity.Property(e => e.Images).HasMaxLength(100);

                entity.Property(e => e.TenChuDe).HasMaxLength(100);
            });

            modelBuilder.Entity<Chuong>(entity =>
            {
                entity.HasKey(e => e.MaChuong);

                entity.ToTable("CHUONG");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.TenChuong).HasMaxLength(200);

                entity.HasOne(d => d.MaMhNavigation)
                    .WithMany(p => p.Chuong)
                    .HasForeignKey(d => d.MaMh)
                    .HasConstraintName("FK_MaMH");
            });

            modelBuilder.Entity<Cthoadon>(entity =>
            {
                entity.HasKey(e => new { e.MaDh, e.MaMh });

                entity.ToTable("CTHOADON");

                entity.Property(e => e.MaDh).HasColumnName("MaDH");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.GiaBan).HasColumnType("money");

                entity.Property(e => e.ThanhTien).HasColumnType("money");

                entity.HasOne(d => d.MaDhNavigation)
                    .WithMany(p => p.Cthoadon)
                    .HasForeignKey(d => d.MaDh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CTHD_DH");

                entity.HasOne(d => d.MaMhNavigation)
                    .WithMany(p => p.Cthoadon)
                    .HasForeignKey(d => d.MaMh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CTHD_MONHOC");
            });

            modelBuilder.Entity<Dethi>(entity =>
            {
                entity.HasKey(e => e.MaDe);

                entity.ToTable("DETHI");

                entity.Property(e => e.MaBh).HasColumnName("MaBH");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.Soluong).HasColumnName("SOLUONG");

                entity.Property(e => e.TenDeThi).HasMaxLength(100);

                entity.HasOne(d => d.MaBhNavigation)
                    .WithMany(p => p.Dethi)
                    .HasForeignKey(d => d.MaBh)
                    .HasConstraintName("FK_DT_BAIHOC");

                entity.HasOne(d => d.MaChuongNavigation)
                    .WithMany(p => p.Dethi)
                    .HasForeignKey(d => d.MaChuong)
                    .HasConstraintName("FK_DT_MaChuong");

                entity.HasOne(d => d.MaMhNavigation)
                    .WithMany(p => p.Dethi)
                    .HasForeignKey(d => d.MaMh)
                    .HasConstraintName("FK_DT_MONHOC");
            });

            modelBuilder.Entity<Dethicauhoi>(entity =>
            {
                entity.HasKey(e => new { e.MaCh, e.MaDe });

                entity.ToTable("DETHICAUHOI");

                entity.Property(e => e.MaCh).HasColumnName("MaCH");

                entity.HasOne(d => d.MaChNavigation)
                    .WithMany(p => p.Dethicauhoi)
                    .HasForeignKey(d => d.MaCh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DTCH_CauHoi");

                entity.HasOne(d => d.MaDeNavigation)
                    .WithMany(p => p.Dethicauhoi)
                    .HasForeignKey(d => d.MaDe)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DT_DeThi");
            });

            modelBuilder.Entity<Giaovien>(entity =>
            {
                entity.HasKey(e => e.MaGv);

                entity.ToTable("GIAOVIEN");

                entity.Property(e => e.MaGv).HasColumnName("MaGV");

                entity.Property(e => e.Diachi)
                    .HasColumnName("DIACHI")
                    .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .HasColumnName("EMAIL")
                    .HasMaxLength(256);

                entity.Property(e => e.HinhAnhGv).HasMaxLength(50);

                entity.Property(e => e.Ngaysinh)
                    .HasColumnName("NGAYSINH")
                    .HasColumnType("date");

                entity.Property(e => e.Sdt)
                    .HasColumnName("SDT")
                    .HasMaxLength(15);

                entity.Property(e => e.TenGv)
                    .HasColumnName("TenGV")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Giohang>(entity =>
            {
                entity.HasKey(e => new { e.MaMh, e.Id });

                entity.ToTable("GIOHANG");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Ngaytao)
                    .HasColumnName("NGAYTAO")
                    .HasColumnType("date");

                entity.Property(e => e.Tinhtrang)
                    .HasColumnName("TINHTRANG")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdNavigation)
                    .WithMany(p => p.Giohang)
                    .HasForeignKey(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GioHang_User");

                entity.HasOne(d => d.MaMhNavigation)
                    .WithMany(p => p.Giohang)
                    .HasForeignKey(d => d.MaMh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GioHang_MonHoc");
            });

            modelBuilder.Entity<Hoadon>(entity =>
            {
                entity.HasKey(e => e.MaDh);

                entity.ToTable("HOADON");

                entity.Property(e => e.MaDh).HasColumnName("MaDH");

                entity.Property(e => e.Id).HasMaxLength(450);

                entity.Property(e => e.NgayLap).HasColumnType("date");

                entity.Property(e => e.TinhTrang).HasMaxLength(50);

                entity.Property(e => e.TongTien).HasColumnType("money");

                entity.HasOne(d => d.IdNavigation)
                    .WithMany(p => p.Hoadon)
                    .HasForeignKey(d => d.Id)
                    .HasConstraintName("FK_HOADON_ID");
            });

            modelBuilder.Entity<Kiemtra>(entity =>
            {
                entity.HasKey(e => e.MaKt);

                entity.ToTable("KIEMTRA");

                entity.Property(e => e.MaKt).HasColumnName("MaKT");

                entity.Property(e => e.Id).HasMaxLength(450);

                entity.Property(e => e.TenKt)
                    .HasColumnName("TenKT")
                    .HasMaxLength(50);

                entity.Property(e => e.Thoigian).HasMaxLength(20);

                entity.HasOne(d => d.IdNavigation)
                    .WithMany(p => p.Kiemtra)
                    .HasForeignKey(d => d.Id)
                    .HasConstraintName("FK_KT_USER");

                entity.HasOne(d => d.MaDeNavigation)
                    .WithMany(p => p.Kiemtra)
                    .HasForeignKey(d => d.MaDe)
                    .HasConstraintName("FK_KT_Dethi");
            });

            modelBuilder.Entity<Lichsuhoc>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.MaBh });

                entity.ToTable("LICHSUHOC");

                entity.Property(e => e.MaBh).HasColumnName("MaBH");

                entity.Property(e => e.TrangThai).HasMaxLength(20);

                entity.HasOne(d => d.IdNavigation)
                    .WithMany(p => p.Lichsuhoc)
                    .HasForeignKey(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LICHSUHOC_User");

                entity.HasOne(d => d.MaBhNavigation)
                    .WithMany(p => p.Lichsuhoc)
                    .HasForeignKey(d => d.MaBh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LICHSUHOC_BAIHOC");
            });

            modelBuilder.Entity<Lophoc>(entity =>
            {
                entity.HasKey(e => e.MaLop);

                entity.ToTable("LOPHOC");

                entity.Property(e => e.MaGv).HasColumnName("MaGV");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.TenLop).HasMaxLength(30);

                entity.HasOne(d => d.MaGvNavigation)
                    .WithMany(p => p.Lophoc)
                    .HasForeignKey(d => d.MaGv)
                    .HasConstraintName("FK_DT_GV");

                entity.HasOne(d => d.MaMhNavigation)
                    .WithMany(p => p.Lophoc)
                    .HasForeignKey(d => d.MaMh)
                    .HasConstraintName("FK_LOP_MONHOC");
            });

            modelBuilder.Entity<Magiamgia>(entity =>
            {
                entity.HasKey(e => e.MaSale);

                entity.ToTable("MAGIAMGIA");

                entity.Property(e => e.MaSale)
                    .HasMaxLength(200)
                    .ValueGeneratedNever();

                entity.Property(e => e.MoTa).HasMaxLength(200);

                entity.Property(e => e.NgayHetHan).HasColumnType("date");

                entity.Property(e => e.TenSale).HasMaxLength(200);
            });

            modelBuilder.Entity<Monhoc>(entity =>
            {
                entity.HasKey(e => e.MaMh);

                entity.ToTable("MONHOC");

                entity.Property(e => e.MaMh).HasColumnName("MaMH");

                entity.Property(e => e.GiaBan).HasColumnType("money");

                entity.Property(e => e.HinhAnh).HasMaxLength(50);

                entity.Property(e => e.TenMh)
                    .HasColumnName("TenMH")
                    .HasMaxLength(100);

                entity.HasOne(d => d.MaChuDeNavigation)
                    .WithMany(p => p.Monhoc)
                    .HasForeignKey(d => d.MaChuDe)
                    .HasConstraintName("FK_MONHOC_CHUDE");
            });
        }
    }
}
