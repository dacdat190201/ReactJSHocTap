USE DataHocTap 
GO

--(Name, Quyền, Stamp)
select * from AspNetRoles
INSERT INTO AspNetRoles
VALUES (1,'Admin',N'Quản Lý',null),
(2,'Student',N'Học Viên',null)
------------------------------
--ĐĂNG KÝ ADMIN TRƯỚC
select * from AspNetUsers
select * from AspNetUserRoles

------------------------------
--Phân Quyền-- 
update AspNetUserRoles
set RoleId = 1
where UserID = '41bbf18e-0736-49e7-8148-fd072e9e31a8' 
--------------------------------
select * from CHUDE
select * from  MONHOC

INSERT INTO CHUDE values (N'Toán','chudetoan.png')
INSERT INTO CHUDE values(N'Ngữ Văn','chudevan.png')
INSERT INTO CHUDE values(N'Vật Lý','chudevatly.jpeg')
INSERT INTO CHUDE values(N'Hóa Học','chudehoahoc.webp')
INSERT INTO CHUDE values(N'Sinh Học','chudehoahoc.webp')
INSERT INTO CHUDE values(N'Địa Lý','chudedulich.png')
INSERT INTO CHUDE values(N'Tiếng Anh','chudevan.png')
INSERT INTO CHUDE values(N'Lịch Sử','chudetoan.png')
INSERT INTO CHUDE values(N'Tin Học','chudevatly.jpeg')

INSERT INTO MAGIAMGIA VALUES (N'MENBER-2023',N'DEAL Người Mới',N'Đơn hàng tối thiểu 50.000VND',50000,10,'03-23-2023',10000)
INSERT INTO MAGIAMGIA VALUES (N'HOT-TETXUAN',N'Chào Mùa Xuân',N'Đơn hàng tối thiểu 300.000',300000,8,'02-25-2023',50000)
INSERT INTO MAGIAMGIA VALUES (N'KM-ACADE',N'Giảm giá',N'Đơn hàng tối thiểu 200.000',200000,5,'02-23-2023',70000)
INSERT INTO MAGIAMGIA VALUES (N'DATDEAL',N'DEAL hấp dẫn',N'Đơn hàng tối thiểu 75.000',75000,5,'02-23-2023',20000)

--(TenGV,SDT,NgaySinh,Email,DiaChi)
INSERT INTO GIAOVIEN VALUES(N'Lê Thị Sang','0384562311','1985-11-20','sangthi85@gmail.com',N'TP. HCM','trancaotung.jpg')
INSERT INTO GIAOVIEN VALUES(N'Phan Văn Ngang','0384562385','1985-1-23','vanngangtran85@gmail.com',N'TP. HCM','khoaluong.jpg')
INSERT INTO GIAOVIEN VALUES(N'Nguyễn Minh Anh','0384562376','1985-10-20','baonguyen76@gmail.com',N'TP. HCM','nguyenminhanh.jpg')
INSERT INTO GIAOVIEN VALUES(N'Hồ Chung Bảo','0384562345','1983-11-2','nguyenhoang45@gmail.com',N'TP. HCM','hochungbao.jpg')
INSERT INTO GIAOVIEN VALUES(N'Huỳnh Thị Thanh Hằng','0384562363','1989-1-20','thanhhang63@gmail.com',N'TP. HCM','thanhhang.jpg')
--(TenMH,HinhAnh,SoLuong,GiaBan, chủ đề)
INSERT INTO MONHOC VALUES (N'Toán Lớp 5',null,200000,'50000',1)

--(TenLop,MaMH,MaGV)
INSERT INTO LOPHOC VALUES (N'Toán Lớp 5',1,2)
--(MaMH, MaChuong) Môn học 1 - Toán Lớp 5
INSERT INTO CHUONG VALUES ('1',N'Chương I: ÔN TẬP VÀ BỔ SUNG VỀ PHÂN SỐ. GIẢI TOÁN LIÊN QUAN ĐẾN TỈ LỆ. BẢNG ĐƠN VỊ DIỆN TÍCH')
INSERT INTO CHUONG VALUES ('1',N'CHƯƠNG II: SỐ THẬP PHÂN. CÁC PHÉP TÍNH VỚI SỐ THẬP PHÂN')
INSERT INTO CHUONG VALUES ('1',N'CHƯƠNG III: CỘNG - TRỪ ĐO THỜI GIAN')
INSERT INTO CHUONG VALUES ('1',N'CHƯƠNG IV: SỐ ĐO THỜI GIAN, CHUYỂN ĐỘNG ĐỀU')
INSERT INTO CHUONG VALUES ('1',N'CHƯƠNG V: ÔN TẬP')
--(TenBH,MaChuong,NoiDung)
--(TenBH,MaChuong,NoiDung) MaChuong 1
INSERT INTO BAIHOC VALUES (N'Bài 1: Ôn tập: Khái niệm về phân số','1',
N'a) Đọc các phân số: 5/7 ; 25/100 ; 91/38 ; 60/17 ; 85/1000 . 
<br></br>
b) Nêu tử số và mẫu số của từng phân số trên. 
<br></br>
Phương pháp giải: 
<br></br>a) Cách đọc phân số: đọc tử số rồi đọc "phần" sau đó đọc mẫu số. 
<br></br>b) Tử số là số tự nhiên viết trên gạch ngang. Mẫu số là số tự nhiên khác 0 viết dưới gạch ngang. 
<br></br>Lời giải chi tiết:
<br></br>a) 5/7 : năm phần bảy;
<br></br>25/100 : hai mươi lăm phần một trăm (hoặc hai mươi lăm phần trăm); 
<br></br>91/38 : chín mươi mốt phần ba mươi tám; 
<br></br>60/17 : sáu mươi phần mười bảy;
<br></br>85/1000 : tám mươi lăm phần một nghìn (hoặc tám mươi lăm phần nghìn)')
INSERT INTO BAIHOC VALUES (N'Bài 2: Ôn tập tính chất cơ bản của phân số' ,'1',
N'Rút gọn các phân số: 15/25 ; 18/27 ; 36/64 .
<br></br>Phương pháp giải:
<br></br>Khi rút gọn phân số có thể làm như sau:
<br></br>- Xét xem tử số và mẫu số cùng chia hết cho số tự nhiên nào lớn hơn 1 . 
<br></br>- Chia tử số và mẫu số cho số đó. Cứ làm như thế cho đến khi nhận được phân số tối giản. 
<br></br>Lời giải chi tiết: 15/25 = 15 : 5 / 25 : 5 = 3/5 ; 
<br></br>18/27 = 18 : 9/27 : 9 = 2/3 ;
<br></br>36/64 = 36 : 4/64 : 4 = 9/16 . ')
INSERT INTO BAIHOC VALUES (N'Bài 3: ÔN TẬP SO SÁNH 2 PHÂN SỐ','1',
N'Điền dấu > , < , = vào chỗ chấm:
<br></br>4/11 . . . 6/11
<br></br>6/7 . . . 12/14 
<br></br>15/17 . . . 10/17
<br></br>2/3 . . . 3/4 
<br></br>Phương pháp giải: a) Trong hai phân số cùng mẫu số: 
<br></br>- Phân số nào có tử số bé hơn thì bé hơn. 
<br></br>- Phân số nào có tử số lớn hơn thì lớn hơn. 
<br></br>- Nếu tử số bằng nhau thì hai phân số đó bằng nhau. 
<br></br>b) Muốn so sánh hai phân số khác mẫu số, ta có thể quy đồng mẫu số hai phân số đó rồi so sánh các tử sổ của chúng. 
<br></br>Lời giải chi tiết: 
<br></br>+) 4/11 < 6/11 ; 
<br></br>+) 15/17 > 10/17 ; 
<br></br>+) 6/7 = 6 × 2/7 × 2 = 12/14 
<br></br>Vậy 6 7 = 12 14 ;
<br></br>+) 2/3 = 2 × 4/3 × 4 = 8/12 
<br></br>; 3/4 = 3 × 3/4 × 3 = 9/12 
<br></br>Mà 8/12 < 9/12 
<br></br>Vậy 2/3 < 3/4 .')
INSERT INTO BAIHOC VALUES (N'Bài 4: ÔN TẬP SO SÁNH 2 PHÂN SỐ(TIẾP THEO)','1',
N'Điền dấu >, <, = vào chỗ chấm: 
<br></br>a) 3/5 . . . 1 
<br></br>2/2 . . . 1
<br></br>9/4 . . . 1
<br></br>1 . . . 7/8 ; 
<br></br>b) Nêu đặc điểm của phân số lớn hơn 1 , bé hơn 1 , bằng 1 . 
<br></br>Phương pháp giải: Phân số có tử số lớn hơn mẫu số thì phân số đó lớn hơn 1 . 
<br></br>Phân số có tử số bé hơn mẫu số thì phân số đó bé hơn 1 . Phân số có tử số bằng mẫu số thì phân số đó bằng 1 . 
<br></br>Lời giải chi tiết: a) 3/5 < 1 || 2/2 = 1 || 9/4 > 1 || 1 > 7/8 . 
<br></br>b) Phân số có tử số lớn hơn mẫu số thì phân số đó lớn hơn 1 . 
<br></br>Phân số có tử số bé hơn mẫu số thì phân số đó bé hơn 1 . 
<br></br>Phân số có tử số bằng mẫu số thì phân số đó bằng 1 .')
INSERT INTO BAIHOC VALUES (N'Bài 5: Phân số thập phân','1',
N'Đọc các phân số thập phân: 
<br></br>9/10 ; 21/100 ; 625/1000 ; 2005/1000000 . 
<br></br>Phương pháp giải: Để đọc phân số, ta đọc tử số, đọc "phần" rồi sau đó đọc mẫu số. 
<br></br>Lời giải chi tiết: 9/10 : Chín phần mười; 
<br></br>21/100 : Hai mươi mốt phần trăm; 
<br></br>625/1000 : Sáu trăm hai mươi lăm phần nghìn; 
<br></br>2005/1000000 : Hai nghìn không trăm linh năm phần triệu.')
--Bài học CHương 2
INSERT INTO BAIHOC VALUES (N'Bài 1: Khái Niệm Số Thập Phân','2',
N'Phương pháp giải: Dựa vào cách đọc mẫu: 0,1 đọc là: không phẩy một;
<br></br>0,01 đọc là: không phẩy không một. 
<br></br>Các số thập phân khác đọc tương tự. 
<br></br>Lời giải chi tiết: Ta đọc lần lượt từ trái sang phải: 
<br></br>a) Một phần mười (không phẩy một) 
<br></br>Hai phần mười (không phẩy hai) 
<br></br>Ba phần mười (không phẩy ba)
<br></br>................
<br></br>Tám phần mười (không phẩy tám) Chín phần mười (không phẩy chín) 
<br></br>b) Một phần trăm (không phẩy không một ) 
<br></br>Hai phần trăm (không phẩy không hai) 
<br></br>............................................... 
<br></br>Tám phần trăm (không phẩy không tám) Chín phần trăm (không phẩy không chín).')
INSERT INTO BAIHOC VALUES (N'Bài 2: Khái Niệm Số Thập Phân (Tiếp Theo)','2',
N'Đọc mỗi số thập phân sau : 9,4  ;          7,98  ;           25,477  ;         206,075  ;
<br></br>0,307 Phương pháp giải: Đọc phần nguyên rồi đọc dấu "phẩy", sau đó đọc phần thập phân. 
<br></br>Lời giải chi tiết: 9,4 : Chín phẩy bốn. 7,98 : Bảy phẩy chín mươi tám. 
<br></br>25,477 :  Hai mươi lăm phẩy bốn trăm bảy mươi bảy. 
<br></br>206,075 : Hai trăm linh sáu phẩy không trăm bảy mươi lăm. 0,307 : Không phẩy ba trăm linh bảy.')
INSERT INTO BAIHOC VALUES (N'Bài 3: Số thập phân bằng nhau','2',
N'Bỏ các chữ số 0 ở tận cùng bên phải phần thập phân để có các số thập phân viết dưới dạng gọn hơn: 
<br></br>a) 7 , 800 ; 64 , 9000 ; 3 , 0400. 
<br></br>b) 2001 , 300 ; 35 , 020 ; 100 , 0100 . 
<br></br>Phương pháp giải: Nếu một số thập phân có chữ số 0 ở tận cùng bên phải phần thập phân thì khi bỏ chữ số 0 đó đi, 
<br></br>ta được một số thập phân bằng nó. 
<br></br>Lời giải chi tiết: 
<br></br>a) 7 , 800 = 7 , 80 = 7 , 8 64 , 9000 = 64 , 900 = 64 , 90 = 64 , 9 3 , 0400 = 3 , 040 = 3 , 04 
<br></br>b) 2001 , 300 = 2001 , 30 = 2001 , 3 35 , 020 = 35 , 02 100 , 0100 = 100 , 010 = 100 , 01')
INSERT INTO BAIHOC VALUES (N'Bài 4: So sánh 2 số thập phân','2',
N'So sánh hai số thập phân: 
<br></br>a) 48,97 và 51,02 ;
<br></br>b) 96,4 và 96,38 ;
<br></br>c) 0,7 và 0,65 
<br></br>Phương pháp giải: 
<br></br>- Số thập phân nào có phần nguyên lớn hơn thì số đó lớn hơn. 
<br></br>- Nếu phần nguyên của hai số đó bằng nhau,thì ta so sánh phần thập phân, lần lượt từ hàng phần mười, hàng phần trăm, hàng phần nghìn ... 
<br></br>đến cùng một hàng nào đó, số thập phân nào có chữ số ở hàng tương ứng lớn hơn thì số đó lớn hơn. 
<br></br>Lời giải chi tiết: 
<br></br>a) Ta có 48 < 51 nên 48 , 97 < 51 , 02 ; 
<br></br>b) So sánh  phần nguyên ta có 96 = 96 và ở hàng phần mười có 4 > 3 nên 96 , 4 > 96 , 38 ; 
<br></br>c) So sánh phần nguyên ta có 0 = 0 và ở hàng phần mười có 7 > 6 nên 0 , 7 > 0 , 65')
--Bài học CHương 3
INSERT INTO BAIHOC VALUES (N'Bài 1: Cộng Đo thời gian','3',
N'Lâm đi từ nhà đến bến xe hết 35 phút, sau đó đi ô tô đến Viện Bảo tàng Lịch sử hết 2 giờ 20 phút.
<br></br>Hỏi Lâm đi từ nhà đến Viện Bảo tàng Lịch sử hết bao nhiêu thời gian ? 
<br></br>Phương pháp giải: Để tính thời gian Lâm đi từ nhà đến Viện Bảo tàng Lịch sử ta lấy thời gian Lâm đi từ nhà đến bến xe cộng với thời gian Lâm đi ô tô đến Viện Bảo tàng Lịch sử. 
<br></br>Lời giải chi tiết: Tóm tắt Từ nhà đến bến xe: 35 phút Đi viện bảo tàng: 2 giờ 20 phút Từ nhà đến viện bảo tàng: ... phút? 
<br></br>Bài giải Thời gian Lâm đi từ nhà đến Viện Bảo tàng Lịch sử là: 35 phút + 2 giờ 20 phút = 2 giờ 55 phút 
<br></br>Đáp số: 2 giờ 55 phút.')
--Bài học CHương 3
INSERT INTO BAIHOC VALUES (N'Bài 2: Trừ Đo thời gian','3',
N'Tính: 
<br></br>a) 23 phút 25 giây – 15 phút 12 giây;
<br></br>b) 54 phút 21 giây – 21 phút 34 giây; 
<br></br>c) 22 giờ 15 phút – 12 giờ 35 phút. 
<br></br>Phương pháp giải: 
<br></br>- Đặt tính thẳng hàng và thực hiện tính như đối với phép trừ các số tự nhiên. 
<br></br>- Khi tính sau mỗi kết quả ta phải ghi đơn vị đo tương ứng. - 
<br></br>Nếu số đo theo đơn vị nào đó ở số bị trừ bé hơn số đo tương ứng ở số trừ thì cần chuyển đổi 1 đơn vị hàng lớn hơn liền kề sang đơn vị nhỏ hơn rồi thực hiện phép trừ như bình thường.')
--Bài học CHương 4
INSERT INTO BAIHOC VALUES (N'Bài 1: Bảng đo thời gian','4',
N'Phương pháp giải: 
<br></br>Từ năm 1 đến năm 100 là thế kỉ thứ nhất (thế kỉ I). 
<br></br>Từ năm 101 đến năm 200 là thế kỉ thứ hai (thế kỉ II). 
vTừ năm 201 đến năm 300 là thế kỉ thứ ba (thế kỉ III). ........ 
<br></br>Từ năm 1901 đến năm 2000 là thế kỉ hai mươi (thế kỉ XX). 
<br></br>Từ năm 2001 đến năm 2100 là thế kỉ hai mươi mốt (thế kỉ XXI). 
<br></br>Lời giải chi tiết: 
<br></br>- Kính viễn vọng phát minh vào thế kỉ 17 (XVII). 
<br></br>- Bút chì phát minh vào thế kỉ 18 (XVIII). 
<br></br>- Đầu máy xe lửa phát minh vào thế kỉ 19 (XIX). 
<br></br>- Xe đạp phát minh vào thế kỉ 19 (XIX).
<br></br>- Ô tô phát minh vào thế kỉ 19 (XIX).
<br></br>- Máy bay phát minh vào thế kỉ 20 (XX).
<br></br>- Máy tính điện tử phát minh vào thế kỉ 20 (XX). 
<br></br>- Vệ tinh nhân tạo phát minh vào thế kỉ 20 (XX)')
INSERT INTO BAIHOC VALUES (N'Bài 1: Bảng đo thời gian (Tiếp Theo)','4',
N'Viết số thích hợp vào chỗ chấm: 
<br></br>a) 6 năm = ... tháng 
<br></br>b) 3 giờ = ... phút 4 năm 2 tháng = ... tháng
<br></br>1,5 giờ = ... phút 3 năm rưỡi = ... tháng 3 4 giờ = ... phút 3 ngày = ... giờ 
<br></br>6 phút = ... giây 0,5 ngày = ... giờ 1 2 phút = ... giây 3 ngày rưỡi = ... giờ 
<br></br>1 giờ = ... giây 
<br></br>Phương pháp giải: 
<br></br>- 1 năm = 12 tháng nên để đổi một số từ đơn vị năm sang đơn vị tháng ta chỉ cần nhân số đó với 12. 
<br></br>- 1 ngày = 24 giờ nên để đổi một số từ đơn vị ngày sang đơn vị giờ ta chỉ cần nhân số đó với 24. 
<br></br>- 1 giờ = 60 phút nên để đổi một số từ đơn vị giờ sang đơn vị phút ta chỉ cần nhân số đó với 60. 
<br></br>- 1 phút = 60 giây nên để đổi một số từ đơn vị phút sang đơn vị giây ta chỉ cần nhân số đó với 60. ')
--Bài học CHương 5
INSERT INTO BAIHOC VALUES (N'Bài 1: Ôn Tập Số tự nhiên','5',
N'a) Đọc các số sau: 70815;          975 806;         5 723 600;         472 036 953. 
<br></br>b) Nêu giá trị của chữ số 5 trong mỗi số trên. Phương pháp giải: 
<br></br>a) Để đọc các số ta đọc từ trái sang phải, hay từ hàng cao đến hàng thấp. 
<br></br>b) Xác định vị trí của chữ số 5 trong mỗi số đó rồi ghi giá trị tương ứng của chữ số đó. 
<br></br>Lời giải chi tiết: 
<br></br>a) Số 70815 đọc là: bảy mươi nghìn tám trăm mười lăm. Số 975 806 đọc là: chín trăm bảy mươi lăm nghìn tám trăm linh sáu. 
<br></br>Số 5 723 600 đọc là: năm triệu bảy trăm hai mươi ba nghìn sáu trăm. 
<br></br>Số 472 036 953 đọc là: bốn trăm bảy mươi hai triệu không trăm ba mươi sáu nghìn chín trăm năm mươi ba. 
<br></br>b) Chữ số 5 trong số 70815 thuộc hàng đơn vị nên có giá trị là 5 đơn vị. 
<br></br>Chữ số 5 trong số 975 806 thuộc hàng nghìn nên có giá trị là 5000. 
<br></br>Chữ số 5 trong số 5 723 600 thuộc hàng triệu nên có giá trị là 5 000 000. 
<br></br>Chữ số 5 trong số 472 036 953 thuộc hàng chục nên có giá trị là 50.')
INSERT INTO BAIHOC VALUES (N'Bài 2: Phân Số','5',
N'Rút gọn các phân số: 3/6 ; 18/24 ; 5/35 ; 40/90 ; 75/30 . 
<br></br>Phương pháp giải: Khi rút gọn phân số có thể làm như sau: 
<br></br>- Xét xem tử số và mẫu số cùng chia hết cho số tự nhiên nào lớn hơn 1. 
<br></br>- Chia tử số và mẫu số cho số đó. Cứ làm như thế cho đến khi nhận được phân số tối giản. 
<br></br>Lời giải chi tiết: 3/6 = 3 : 3/6 : 3 = 1/2 ; 
<br></br>18/24 = 18 : 6/24 : 6 = 3/4 ; 
<br></br>5/35 = 5 : 5/35 : 5 = 1/7 ;
<br></br>40/90 = 40 : 10/90 : 10 = 4/9 ;
<br></br>75/30 = 75 : 15/30 : 15 = 5/2 .')
INSERT INTO BAIHOC VALUES (N'Bài 3: Ôn tập số thập phân','5',
N'Viết số thập phân có: 
<br></br>a) Tám đơn vị, sáu phần mười, năm phần trăm (tức là tám đơn vị và sáu mươi lăm phần trăm). 
<br></br>b) Bảy mươi hai đơn vị, bốn phần mười, chín phần trăm, ba phần nghìn (tức là bảy mươi hai đơn vị và bốn trăm chín mươi ba phần nghìn). 
<br></br>c) Không đơn vị, bốn phần trăm. Phương pháp giải: Muốn viết một số thập phân, ta viết lần lượt từ hàng cao đến hàng thấp: 
<br></br>trước hết viết phần nguyên, viết dấu “phẩy”, sau đó viết phần thập phân. 
<br></br>Lời giải chi tiết: a) Số gồm "tám đơn vị, sáu phần mười, năm phần trăm (tức là tám đơn vị và sáu mươi lăm phần trăm) được viết là 8,65. 
<br></br>b) Số gồm "Bảy mươi hai đơn vị, bốn phần mười, chín phần trăm, ba phần nghìn (tức là bảy mươi hai đơn vị và bốn trăm chín mươi ba phần nghìn)" 
<br></br>được viết là 72,493. 
<br></br>c) Số gồm "Không đơn vị, bốn phần trăm" được viết là 0,04.')
--(MaBH,MaChuong,MaMH,TenDeThi,ThoiGian, SL)
INSERT INTO DETHI VALUES (1,null,null,N'Kiểm tra Toán Lớp 5 Chương 1 - Bài 1',60,null)
INSERT INTO DETHI VALUES (2,null,null,N'Kiểm tra Toán Lớp 5 Chương 1 - Bài 2',60,null)
INSERT INTO DETHI VALUES (3,null,null,N'Kiểm tra Toán Lớp 5 Chương 1 - Bài 3',60,null)
INSERT INTO DETHI VALUES (4,null,null,N'Kiểm tra Toán Lớp 5 Chương 1 - Bài 4',60,null)
INSERT INTO DETHI VALUES (5,null,null,N'Kiểm tra Toán Lớp 5 Chương 1 - Bài 5',60,null)
--Chương 2 Môn 1
INSERT INTO DETHI VALUES (6,null,null,N'Kiểm tra Toán Lớp 5 Chương 2 - Bài 1',60,null)
INSERT INTO DETHI VALUES (7,null,null,N'Kiểm tra Toán Lớp 5 Chương 2 - Bài 2',60,null)
INSERT INTO DETHI VALUES (8,null,null,N'Kiểm tra Toán Lớp 5 Chương 2 - Bài 3',60,null)
INSERT INTO DETHI VALUES (9,null,null,N'Kiểm tra Toán Lớp 5 Chương 2 - Bài 4',60,null)
--Chương 3 Môn 1
INSERT INTO DETHI VALUES (10,null,null,N'Kiểm tra Toán Lớp 5 Chương 3 - Bài 1',60,null)
INSERT INTO DETHI VALUES (11,null,null,N'Kiểm tra Toán Lớp 5 Chương 3 - Bài 2',60,null)
--Chương 4 Môn 1
INSERT INTO DETHI VALUES (12,null,null,N'Kiểm tra Toán Lớp 5 Chương 4 - Bài 1',60,null)
INSERT INTO DETHI VALUES (13,null,null,N'Kiểm tra Toán Lớp 5 Chương 4 - Bài 2',60,null)
--Tổng
INSERT INTO DETHI VALUES (null,null,1,N'Kiểm tra Tổng Kết',60,20)
--(TenCauHoi,DapAn,LoaiCauHoi,Giải thích) -- Bài 1 - Môn 1
select * from CAUHOI
--************************************THIẾU GIẢI THÍCH, CHÚ Ý
INSERT INTO CAUHOI VALUES (N'3/7 = ?','0.428',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'4/10 = ?','0,4',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'100/34 = ?','2.94',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'17/1000 = ?','0.017',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'69/2000 = ?','0.0345',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 2 - Môn 1
INSERT INTO CAUHOI VALUES (N'2/3 = 2 × 8/ 3 × 8 = ?','16/24',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'5/8 = 5 × 3/8 × 3 = ?','15 24 ',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'1/4 = 1 × 3/4 × 3 = ?','3/12',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'5/6 = 5 × 4/6 × 4 = ? ','20/24',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'3/8 = 3 × 3/8 × 3 = ? ','9 24',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 3 - Môn 1
INSERT INTO CAUHOI VALUES (N'Viết các số sau theo thứ tự từ bé đến lớn:<br></br> a) 8/9 ; 5/6 ; 17/18 ','5/6 ; 8/9 ; 17/18 ',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'4/11 ? 6/11;?','411<611',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'15/17 ? 10/17;','15/17>10/17;',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'8/12 ? 9/12','8/12<9/12',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'2/3 ? 3/4','2/3<3/4.',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 4 - Môn 1
INSERT INTO CAUHOI VALUES (N'a) So sánh các phân số: 2/5 và 2/7 ; ','2/5>2/7',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'5/9 và 5/6','5/9 > 5/6',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'1/12 và 1/13','1/12 < 1/13',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'3/4 và 5/7;','3/4 > 5/7.',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'2/7 và 4/14','2/7 = 4/14',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 5 - Môn 1
INSERT INTO CAUHOI VALUES (N'9/10 = ?',N'Chín phần mười;',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'21/100 =?',N'Hai mươi mốt phần trăm',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'625/1000 =?',N'Sáu trăm hai mươi lăm phần nghìn',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'2005/1000000',N'Hai nghìn không trăm linh năm phần triệu',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'4/7 = ?',N'Bốn phần bảy',N'Kiểm Tra',null,1)
-------------------------------------------------------
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 1 - CHương 2 - Môn 1
INSERT INTO CAUHOI VALUES (N'7dm = 7/10 m = ?',N'0.7',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'9cm = 9/100 m = ?',N'0.09',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'5dm = 5/10 m = ?',N'0.5',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'3cm = 3/100 m = ?',N'0/03',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'2mm = 2/1000 m = ?',N'0.002',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 2 - CHương 2 - Môn 1
INSERT INTO CAUHOI VALUES (N'0,1= ?',N'1/10',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'0.02 = ?',N'2/100',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'0.004= ?',N'4/1000',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'0.095 = ?',N'9/1000',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'4/3 = ?',N'0.75',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 3 - CHương 2 - Môn 1
INSERT INTO CAUHOI VALUES (N'17.2 = ?',N'17.200',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'18 = ?',N'18.000',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'19.987= ?',N'19.98700',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'90.01 = ?',N'90.010',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'91.03 = ?',N'91.03000',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 4 - CHương 2 - Môn 1
INSERT INTO CAUHOI VALUES (N'17.2 ? 18.97',N'17.2 < 18.97',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'18.92 ? 3.789',N'18.92 > 3.789',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'19.987 ? 19.98700',N'19.987 = 19.98700',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'90.01 ? 11.987',N'90.01 > 11.987',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'0.987 ? 0.990',N'0.987 > 0.990',N'Kiểm Tra',null,1)
--------------------------------------------------------------------------------
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 1 - CHương 3 - Môn 1
INSERT INTO CAUHOI VALUES (N'Một ô tô đi từ Hà Nội đến Thanh Hóa hết 3 giờ 15 phút rồi đi tiếp đến Vinh hết 2 giờ 35 phút. Hỏi ô tô đó đi cả quãng đường từ Hà Nội đến Vinh hết bao nhiêu thời gian ','5h50',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Một người tham gia đua xe đạp, quãng đường đầu tiên đi hết 22 phút 58 giây, quãng đường thứ hai đi hết 23 phút 25 giây. Hỏi người đó đi cả hai quãng đường hết bao nhiêu thời gian ?','46p23',N'Kiểm Tra',null,1)
----(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 2 - CHương 3 - Môn 1
INSERT INTO CAUHOI VALUES (N'23 ngày 12 giờ - 3 ngày 8 giờ;',N'20n4h',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'18.92 ? 3.789',N'18.92 > 3.789',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'19.987 ? 19.98700',N'19.987 = 19.98700',N'Kiểm Tra',null,1)
----(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 1 - CHương 4 - Môn 1
INSERT INTO CAUHOI VALUES (N'6 năm = ?',N'72 tháng',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'4 năm 2 tháng =? ',N'50 tháng',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'3 năm rưỡi = ?',N'42 tháng',N'Kiểm Tra',null,1)
----(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 2 - CHương 4 - Môn 1
INSERT INTO CAUHOI VALUES (N'6 năm = ?',N'72 tháng',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'4 năm 2 tháng =? ',N'50 tháng',N'Kiểm Tra',null,1)
--select * from CAUHOI
--Đề thi chương 1bài 1 môn 1
INSERT INTO DETHICAUHOI VALUES (1,1)
INSERT INTO DETHICAUHOI VALUES (2,1)
INSERT INTO DETHICAUHOI VALUES (3,1)
INSERT INTO DETHICAUHOI VALUES (4,1)
INSERT INTO DETHICAUHOI VALUES (5,1)
--Đề thi chương 1bài 2 môn 1
INSERT INTO DETHICAUHOI VALUES (6,2)
INSERT INTO DETHICAUHOI VALUES (7,2)
INSERT INTO DETHICAUHOI VALUES (8,2)
INSERT INTO DETHICAUHOI VALUES (9,2)
INSERT INTO DETHICAUHOI VALUES (10,2)
--Đề thi chương 1bài 3 môn 1
INSERT INTO DETHICAUHOI VALUES (11,3)
INSERT INTO DETHICAUHOI VALUES (12,3)
INSERT INTO DETHICAUHOI VALUES (13,3)
INSERT INTO DETHICAUHOI VALUES (14,3)
INSERT INTO DETHICAUHOI VALUES (15,3)
--Đề thi chương 1bài 4 môn 1
INSERT INTO DETHICAUHOI VALUES (16,4)
INSERT INTO DETHICAUHOI VALUES (17,4)
INSERT INTO DETHICAUHOI VALUES (18,4)
INSERT INTO DETHICAUHOI VALUES (19,4)
INSERT INTO DETHICAUHOI VALUES (20,4)
--Đề thi chương 1bài 5 môn 1
INSERT INTO DETHICAUHOI VALUES (21,5)
INSERT INTO DETHICAUHOI VALUES (22,5)
INSERT INTO DETHICAUHOI VALUES (23,5)
INSERT INTO DETHICAUHOI VALUES (24,5)
INSERT INTO DETHICAUHOI VALUES (25,5)
--Đề thi chương 2 bài 1 môn 1
INSERT INTO DETHICAUHOI VALUES (21,6)
INSERT INTO DETHICAUHOI VALUES (22,6)
INSERT INTO DETHICAUHOI VALUES (23,6)
INSERT INTO DETHICAUHOI VALUES (24,6)
INSERT INTO DETHICAUHOI VALUES (25,6)
--Đề thi chương 2 bài 2 môn 1
INSERT INTO DETHICAUHOI VALUES (26,7)
INSERT INTO DETHICAUHOI VALUES (27,7)
INSERT INTO DETHICAUHOI VALUES (28,7)
INSERT INTO DETHICAUHOI VALUES (29,7)
INSERT INTO DETHICAUHOI VALUES (30,7)
--Đề thi chương 2 bài 3 môn 1
INSERT INTO DETHICAUHOI VALUES (31,8)
INSERT INTO DETHICAUHOI VALUES (32,8)
INSERT INTO DETHICAUHOI VALUES (33,8)
INSERT INTO DETHICAUHOI VALUES (34,8)
INSERT INTO DETHICAUHOI VALUES (35,8)
--Đề thi chương 2 bài 4 môn 1
INSERT INTO DETHICAUHOI VALUES (36,9)
INSERT INTO DETHICAUHOI VALUES (37,9)
INSERT INTO DETHICAUHOI VALUES (38,9)
INSERT INTO DETHICAUHOI VALUES (39,9)
INSERT INTO DETHICAUHOI VALUES (40,9)
----Đề thi chương 3 bài 1 môn 1
INSERT INTO DETHICAUHOI VALUES (41,10)
INSERT INTO DETHICAUHOI VALUES (42,10)
----Đề thi chương 3 bài 2 môn 1
INSERT INTO DETHICAUHOI VALUES (43,11)
INSERT INTO DETHICAUHOI VALUES (44,11)
INSERT INTO DETHICAUHOI VALUES (45,11)
----Đề thi chương 4 bài 1 môn 1
INSERT INTO DETHICAUHOI VALUES (46,12)
INSERT INTO DETHICAUHOI VALUES (47,12)
INSERT INTO DETHICAUHOI VALUES (48,12)
----Đề thi chương 4 bài 2 môn 1
INSERT INTO DETHICAUHOI VALUES (49,13)
INSERT INTO DETHICAUHOI VALUES (50,13)
--ĐỀ THI TỔNG KẾT 
INSERT INTO DETHICAUHOI VALUES (1,14)
INSERT INTO DETHICAUHOI VALUES (2,14)
INSERT INTO DETHICAUHOI VALUES (3,14)
INSERT INTO DETHICAUHOI VALUES (4,14)
INSERT INTO DETHICAUHOI VALUES (5,14)
INSERT INTO DETHICAUHOI VALUES (6,14)
INSERT INTO DETHICAUHOI VALUES (7,14)
INSERT INTO DETHICAUHOI VALUES (8,14)
INSERT INTO DETHICAUHOI VALUES (9,14)
INSERT INTO DETHICAUHOI VALUES (10,14)
INSERT INTO DETHICAUHOI VALUES (21,14)
INSERT INTO DETHICAUHOI VALUES (22,14)
INSERT INTO DETHICAUHOI VALUES (23,14)
INSERT INTO DETHICAUHOI VALUES (24,14)
INSERT INTO DETHICAUHOI VALUES (25,14)
INSERT INTO DETHICAUHOI VALUES (46,14)
INSERT INTO DETHICAUHOI VALUES (47,14)
INSERT INTO DETHICAUHOI VALUES (48,14)
INSERT INTO DETHICAUHOI VALUES (49,14)
INSERT INTO DETHICAUHOI VALUES (50,14)

--(MaCH,CauA,CauB,CauC,CauD)--Đề thi tổng mới có câu trả lời
select * from CAUHOI
select * from CAUTRALOI
INSERT INTO CAUTRALOI VALUES (1,N'0.428',N'6',N'8',N'10')
INSERT INTO CAUTRALOI VALUES (2,N'0,4',N'2.3',N'2',N'10.98')
INSERT INTO CAUTRALOI VALUES (3,N'0,4',N'2.94',N'2.3',N'1.98')
INSERT INTO CAUTRALOI VALUES (4,N'0,4',N'1',N'0.097',N'1.98')
INSERT INTO CAUTRALOI VALUES (5,N'0.0345',N'1.2',N'0.097',N'1.98')
INSERT INTO CAUTRALOI VALUES (6,N'16/24',N'1/2',N'10/97',N'1/65')
INSERT INTO CAUTRALOI VALUES (7,N'16/24',N'15/24',N'10/97',N'1/65')
INSERT INTO CAUTRALOI VALUES (8,N'16/2',N'12/21',N'3/12',N'65')
INSERT INTO CAUTRALOI VALUES (9,N'20/23',N'12/21',N'3/12',N'65')
INSERT INTO CAUTRALOI VALUES (10,N'9 24',N'12/12',N'3/1',N'65/1')
INSERT INTO CAUTRALOI VALUES (21,N'Chín phần mười;',N'một phần trăm',N'Năm',N'Sáu')
INSERT INTO CAUTRALOI VALUES (22,N'Chín phần mười;',N'Hai mươi mốt phần trăm',N'Năm phần trăm',N'Sáu phần ngàn')
INSERT INTO CAUTRALOI VALUES (23,N'Sáu trăm hai mươi lăm phần nghìn',N'Hai lăm trăm',N'Năm phần trăm',N'Sáu phần ngàn')
INSERT INTO CAUTRALOI VALUES (24,N'Hai nghìn không trăm linh năm phần triệu',N'Hai lăm trăm',N'Năm phần trăm',N'Sáu phần ngàn')
INSERT INTO CAUTRALOI VALUES (25,N'Sáu trăm hai mươi lăm phần nghìn',N'Bốn phần bảy',N'Năm phần trăm',N'Sáu phần ngàn')
INSERT INTO CAUTRALOI VALUES (46,N'5h50',N'1h2',N'10h7',N'1h5')
INSERT INTO CAUTRALOI VALUES (47,N'46p23',N'25p2',N'10p97',N'1p65')
INSERT INTO CAUTRALOI VALUES (48,N'20n4h',N'12n21h',N'3n12h',N'65n')
INSERT INTO CAUTRALOI VALUES (49,N'18.92>2.789',N'12.21',N'3.12',N'65')
INSERT INTO CAUTRALOI VALUES (50,N'19.987 = 19.98700',N'12/12',N'3/1',N'65/1')
--(MaCH,MaDe)
--INSERT INTO DETHICAUHOI VALUES (1,1)
--INSERT INTO DETHICAUHOI VALUES (2,1)
--INSERT INTO DETHICAUHOI VALUES (3,1)
--INSERT INTO DETHICAUHOI VALUES (4,1)
--INSERT INTO DETHICAUHOI VALUES (5,1)