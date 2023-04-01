USE DataHocTap 
GO
select * from monhoc
--(TenMH,HinhAnh,SoLuong,GiaBan, chủ đề) - MH2
INSERT INTO MONHOC VALUES (N'VẬT LÍ 8',null,null,'200000',3)

--(TenLop,MaMH,MaGV)
select * from LOPHOC
INSERT INTO LOPHOC VALUES (N'VẬT LÍ 8',2,4)
--(MaMH, MaChuong) Môn học 2 - VL 8 
INSERT INTO CHUONG VALUES ('2',N'Chương I: CƠ HỌC')
INSERT INTO CHUONG VALUES ('2',N'CHƯƠNG II: NHIỆT HỌC')
INSERT INTO CHUONG VALUES ('2',N'CHƯƠNG III: ÔN TẬP VẬT LÝ 8')
select * from CHUONG
--(TenBH,MaChuong,NoiDung)
--(TenBH,MaChuong,NoiDung) MaChuong 6
INSERT INTO BAIHOC VALUES (N'Bài 1: CHUYỂN ĐỘNG CƠ HỌC','6',
N'I - CHUYỂN ĐỘNG CƠ HỌC 1. 
<br></br>Chuyển động cơ học Sự thay đổi vị trí của một vật theo thời gian so với vật khác (vật mốc) gọi là chuyển động cơ học (gọi tắt là chuyển động). 
<br></br>- Một vật được coi là đứng yên khi vị trí của vật đó không thay đổi theo thời gian so với vật khác.
<br></br>2. Tính tương đối của chuyển động Chuyển động hay đứng yên có tính tương đối, 
<br></br>vì cùng một vật có thể được xem là chuyển động so với vật này nhưng lại được xem là đứng yên so với vật khác. 
<br></br>- Tính tương đối của chuyển động tuỳ thuộc vào vật chọn làm mốc. 
<br></br>- Thông thường người ta chọn Trái Đất hay những vật gắn với Trái Đất làm vật mốc.
<br></br>3. Các dạng chuyển động thường gặp Đường mà vật chuyển động vạch ra gọi là quỹ đạo của chuyển động. 
<br></br>Tuỳ thuộc vào hình dạng của quỹ đạo mà ta chia ra các dạng chuyển động: chuyển động thẳng, chuyển động cong và chuyển động tròn. 
<br></br>II - PHƯƠNG PHÁP GIẢI BÀI TẬP CHUYỂN ĐỘNG CƠ HỌC 
<br></br>1. Chuyển động cơ học Khi nói vật này chuyển động hay đứng yên thì phải nói so với vật (làm mốc) nào? 
<br></br>Vậy muốn biết vật A chuyển động hay đứng yên so với vật B thì ta phải xem xét vị trí của vật A so với vật B.
vNếu: - Vị trí của vật A so với vật B có thay đổi theo thời gian thì ta nói vật A chuyển động so với vật B. 
<br></br>- Vị trí của vật A so với vật B không thay đổi theo thời gian thì ta nói vật A đứng yên so với vật B. 
<br></br>2. Tính tương đối của chuyển động Để chứng minh chuyển động hay đứng yên mang tính tương đối thì ta phải chọn ra ít nhất 3 vật:
<br></br>vật A, vật B và vật C. Sao cho vật A chuyển động so với vật B nhưng lại đứng yên so với vật C. 
')
INSERT INTO BAIHOC VALUES (N'Bài 2: VẬN TỐC','6',
N'I - VẬN TỐC 
<br></br>Độ lớn của vận tốc cho biết mức độ nhanh hay chậm của chuyển động và được xác định bằng độ dài quãng đường đi được trong một đơn vị thời gian. 
<br></br>II - CÔNG THỨC TÍNH VẬN TỐC Vận tốc được tính bằng công thức: v = s t 
<br></br>Trong đó: + v : vận tốc + s : quãng đường + t : thời gian đi hết quãng đường đó 
<br></br>III - ĐƠN VỊ CỦA VẬN TỐC - Đơn vị của vận tốc tuỳ thuộc vào đơn vị của chiều dài và đơn vị của thời gian. 
<br></br>- Đơn vị hợp pháp của vận tốc là m / s - Trong thực tế người ta thường dùng đơn vị vận tốc m / s hay k m / h . 
<br></br>- Mối liên hệ giữa m/s và km/h là: 1 m / s = 3 , 6 k m / h hay 1 k m / h = 1 3 , 6 m / s . 
<br></br>- Dụng cụ đo vận tốc: tốc kế (còn gọi là đồng hồ vận tốc) 
<br></br>IV -  LƯU Ý 
<br></br>- Trong hàng hải người ta thường dùng “nút” làm đơn vị đo vận tốc: 1 nút  = 1 hải lý/h = 1 , 852 km/h = 0 , 514 m/s hay 1 m/s = 1 0 , 514 nút. 
<br></br>- Vận tốc ánh sáng: 3.10 8 m / s = 300.000 k m / s - Đơn vị chiều dài người ta còn dùng là “năm ánh sáng”.  
<br></br>Năm ánh sáng là quãng đường ánh sáng truyền đi trong thời gian một năm. + Năm ánh sáng = 9 , 4608.10 12 k m = 10 16 m + Khoảng cách từ ngôi sao gần nhất đến Trái Đất là 4 , 3 năm ánh sáng gần bằng 43 triệu tỉ mét.
')
INSERT INTO BAIHOC VALUES (N'Bài 3: CHUYỂN ĐỘNG ĐỀU','6',
N'1. Định nghĩa 
<br></br>- Chuyển động đều là chuyển động mà vận tốc có độ lớn không thay đổi theo thời gian. -
<br></br>Chuyển động không đều là chuyển động mà vận tốc có độ lớn thay đổi theo thời gian. 
<br></br>2. Vận tốc trung bình của chuyển động không đều Vận tốc trung bình của một chuyển động không đều trên một quãng đường được tính bằng công thức : v t b = s t 
<br></br>Trong đó s là quãng đường đi được, t là thời gian để đi hết quãng đường đó.
<br></br>Lưu ý: Chuyển động không đều là chuyển động thường gặp hằng ngày của các vật. 
<br></br>Trong chuyển động không đều, vận tốc thay đổi theo thời gian. 
<br></br>Chẳng hạn ô tô, xe máy chuyển động trên đường, vận tốc liên tục thay đổi thể hiện ở số chỉ tốc kế. 
<br></br>- Khi đề cập đến chuyển động không đều, người ta thường đưa ra khái niệm vận tốc trung bình : v t b = s t 
<br></br>- Vận tốc trung bình trên những đoạn đường khác nhau thường có giá trị khác nhau, 
<br></br>vì vậy phải nêu rõ vận tốc trung bình trên đoạn đường cụ thể (hoặc trong thời gian cụ thể). 
<br></br>- Vận tốc trung bình không phải là trung bình cộng của các vận tốc. 
<br></br>Ví dụ: Nếu một vật chuyển động được hai đoạn đường liên tiếp s1 với vận tốc v1 trong khoảng thời gian t1 và s2 với vận tốc v2 trong khoảng thời gian là t2,  
<br></br>thì vận tốc trung bình trên cả quãng đường là: v t b = s 1 + s 2 t 1 + t 2 chứ không phải là: v t b = v 1 + v 2 2
')
--CHương 7 
select * from CHUONG
INSERT INTO BAIHOC VALUES (N'Bài 1: Các chất được cấu tạo như thế nào','7',
N'I - CÁC CHẤT ĐƯỢC CẤU TẠO NHƯ THẾ NÀO? 
<br></br>- Các chất được cấu tạo từ các hạt nhỏ riêng biệt gọi là các nguyên tử, phân tử.
<br></br>Nguyên tử là hạt chất nhỏ nhất, còn phân tử là một nhóm các nguyên tử kết hợp lại. 
<br></br>- Giữa các nguyên tử, phân tử có khoảng cách. Lực liên kết giữa các phân tử: 
<br></br>+ Lực liên kết giữa các phân tử chất khí rất yếu 
<br></br>+ Lực liên kết giữa các phân tử chất lỏng lớn hơn chất khí nhưng nhỏ hơn chất rắn 
<br></br>+ Lực liên kết giữa các phân tử chất rắn mạnh 
<br></br>II - CHUYỂN ĐỘNG CỦA CÁC NGUYÊN TỬ, PHÂN TỬ 
<br></br>- Các nguyên tử, phân tử luôn luôn chuyển động hỗn độn không ngừng về mọi phía,
<br></br>chuyển động đó gọi là chuyển động nhiệt hỗn loạn, gọi tắt là chuyển động nhiệt hay còn gọi là chuyển động Brao. 
<br></br>- Nhiệt độ của vật càng cao thì các nguyên tử, phân tử cấu tạo nên vật chuyển động càng nhanh. 
<br></br>Đó là cách nói ngược, thực ra ta cần hiểu là: Các nguyên tử, phân tử cấu tạo nên vật chuyển động càng nhanh thì nhiệt độ của vật càng cao
')
INSERT INTO BAIHOC VALUES (N'Bài 2: Lý thuyết phân tử, nguyên tử chuyển động hay đứng yên','7',
N'KIẾN THỨC TRỌNG TÂM. 
<br></br>1. Các nguyên tử, phân tử chuyển động không ngừng. 
<br></br>2. Nhiệt độ của vật càng cao thì các nguyên tử, phân tử cấu tạo nên vật chuyển động càng nhanh. 
<br></br>Lưu ý: Trong SGK có câu " nhiệt độ càng cao thì các phân tử chuyển động càng nhanh"
<br></br>không hàm nghĩa là nhiệt độ quyết định vận tốc của phân tử mà chỉ nêu lên mối quan hệ thấy được qua TN 
<br></br>giữa nhiệt độ và chuyển động phân tử. Ở lớp 6 ta quan niệm nhiệt độ biểu thị sự nóng, 
<br></br>lạnh thì ở lớp 8 ta có dịp thấy rõ hơn về bản chất của nhiệt độ. 
<br></br>Nhiệt độ có quan hệ với chuyển động hỗn độn của các phân tử cấu tạo nên vật. 
')
INSERT INTO BAIHOC VALUES (N'Bài 3: Lý thuyết Nhiệt Năng','7',
N'I - NHIỆT NĂNG
<br></br>Các phân tử cấu tạo nên vật chuyên động không ngừng, do đó chúng có động năng Nhiệt năng của một vật là tổng động năng của các phân tử cấu tạo nên vật.
<br></br>- Nhiệt năng có quan hệ chặt chẽ với nhiệt độ: Nhiệt độ của vật càng cao thì các phân tử cấu tạo nên vật chuyển động càng nhanh và nhiệt năng của vật càng lớn. 
<br></br>II - CÁC CÁCH LÀM THAY ĐỔI NHIỆT NĂNG Nhiệt năng của vật có thể thay đổi bằng 2 cách: 
<br></br>- Thực hiện công Ví dụ: Chà xát đồng tiền xu xuống mặt bàn 
<br></br>- Truyền nhiệt Ví dụ: Thả đồng tiền xu vào nước nóng III
<br></br>- NHIỆT LƯỢNG Nhiệt lượng là phần nhiệt năng mà vật nhận được hay mất bớt đi trong quá trình truyền nhiệt. 
<br></br>- Kí hiệu Q. - Đơn vị của nhiệt lượng là Jun (J), kilôJun (kJ) 1 kJ = 1000J
')
select * from BAIHOC
--(MaBH,MaChuong,MaMH,TenDeThi,ThoiGian, SL)
INSERT INTO DETHI VALUES (17,null,null,N'Kiểm tra VẬT LÍ Chương 1 - Bài 1',60,null)
INSERT INTO DETHI VALUES (18,null,null,N'Kiểm tra VẬT LÍ Chương 1 - Bài 2',60,null)
INSERT INTO DETHI VALUES (19,null,null,N'Kiểm tra VẬT LÍ Chương 1 - Bài 3',60,null)
INSERT INTO DETHI VALUES (20,null,null,N'Kiểm tra VẬT LÍ Chương 2 - Bài 1',60,20)
INSERT INTO DETHI VALUES (21,null,null,N'Kiểm tra VẬT LÍ Chương 2 - Bài 2',60,null)

select * FROM DETHI
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 1 - Môn 2
INSERT INTO CAUHOI VALUES (N'phát biểu nào là đúng khi nói về chuyển động cơ học?',N'Chuyển động cơ học là sự thay đổi vị trí của vật này so với vật khác theo thời gian.',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Quan sát một đoàn tàu đang chạy vào ga',N'So với hành khách đang ngồi trên tàu thì đoàn tàu đứng yên',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Quỹ đạo chuyển động của một vật là ?',N'Quỹ đạo chuyển động của một vật là đường mà vật chuyển động vạch ra trong không gian',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Mặt Trời mọc đằng đông, lặn đằng Tây. Trong hiện tượng này',N'Khi ta nói Mặt Trời mọc đằng đông, lặn đằng Tây, ta đã xem Mặt Trời chuyển động còn Trái Đất đứng yên.',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Chuyển động của đầu van xe đạp so với vật mốc là trục bánh xe khi xe chuyển động thẳng là',N'Tròn',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 2 - Môn 2
INSERT INTO CAUHOI VALUES (N'Công thức tính vận tốc là:','v = s/t',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N' Vận tốc phụ thuộc vào','v = s/t',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Vận tốc cho biết gì? ?',N'Tính nhanh hay chậm của chuyển động',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Đơn vị của vận tốc là',N'km/h',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'15m/s = ….. km/h',N'54km/h',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 3 - Môn 2
INSERT INTO CAUHOI VALUES (N'Khi nói đến vận tốc của các phương tiện giao thông như xe máy, ô tô… người ta nói đến',N'vận tốc trung bình',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Chuyển động đều là chuyển động có độ lớn vận tốc',N'không đổi trong suốt thời gian vật chuyển động',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N' Chuyển động nào sau đây là chuyển động đều?',N'Không có chuyển động nào kể trên là chuyển động đều.',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Đơn vị của vận tốc là','km/h',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'15m/s = ….. km/h','54km/h',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 1 CHương 2 - Môn 2
INSERT INTO CAUHOI VALUES (N' Nhiệt năng của một vật là ?',N'Tổng động năng của các phân tử cấu tạo nên vật',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Nhiệt do ngọn nến tỏa ra theo hướng nào?',N'Theo mọi hướng.',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Có mấy cách làm thay đổi nhiệt năng của vật?',N'2',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N' Nhiệt lượng là',N'Phần nhiệt năng mà vật nhận được hay mất bớt đi trong quá trình truyền nhiệt.',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Một vật có nhiệt năng 200J, sau khi nung nóng nhiệt năng của nó là 400J. Hỏi nhiệt lượng mà vật nhận được là bao nhiêu?',N'200 J',N'Kiểm Tra',null,1)
--(TenCauHoi,DapAn,LoaiCauHoi) -- Bài 2 CHương 2 - Môn 2
INSERT INTO CAUHOI VALUES (N' Tính chất nào sau đây không phải là của nguyên tử, phân tử?',N'có lúc chuyển động, có lúc đứng yên',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Hiện tượng khuếch tán là:',N'Hiện tượng khi các nguyên tử, phân tử của các chất tự hòa lẫn vào nhau..',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Khi đổ 200 cm3 giấm ăn vào 250 cm3 nước thì thu được bao nhiêu cm3 hỗn hợp?',N'< 450 cm3',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Hiện tượng nào sau đây không phải là hiện tượng khuếch tán?',N'Cát được trộn lẫn với ngô.',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Khi nhiệt độ giảm thì hiện tượng khuếch tán xảy ra như thế nào?',N'xảy ra chậm hơn',N'Kiểm Tra',null,1)
select * from CAUHOI
--Đề thi chương 1bài 1 môn 1
INSERT INTO DETHICAUHOI VALUES (56,15)
INSERT INTO DETHICAUHOI VALUES (57,15)
INSERT INTO DETHICAUHOI VALUES (58,15)
INSERT INTO DETHICAUHOI VALUES (59,15)
INSERT INTO DETHICAUHOI VALUES (60,15)

--Đề thi chương 1bài 2 môn 2
INSERT INTO DETHICAUHOI VALUES (61,16)
INSERT INTO DETHICAUHOI VALUES (62,16)
INSERT INTO DETHICAUHOI VALUES (63,16)
INSERT INTO DETHICAUHOI VALUES (64,16)
INSERT INTO DETHICAUHOI VALUES (65,16)
--Đề thi chương 1bài 2 môn 2
INSERT INTO DETHICAUHOI VALUES (66,17)
INSERT INTO DETHICAUHOI VALUES (67,17)
INSERT INTO DETHICAUHOI VALUES (68,17)
INSERT INTO DETHICAUHOI VALUES (69,17)
INSERT INTO DETHICAUHOI VALUES (70,17)
--Đề thi chương 2bài 1 môn 2
INSERT INTO DETHICAUHOI VALUES (71,18)
INSERT INTO DETHICAUHOI VALUES (72,18)
INSERT INTO DETHICAUHOI VALUES (73,18)
INSERT INTO DETHICAUHOI VALUES (74,18)
INSERT INTO DETHICAUHOI VALUES (75,18)
--Đề thi chương 2bài 2 môn 2
INSERT INTO DETHICAUHOI VALUES (76,19)
INSERT INTO DETHICAUHOI VALUES (77,19)
INSERT INTO DETHICAUHOI VALUES (78,19)
INSERT INTO DETHICAUHOI VALUES (79,19)
INSERT INTO DETHICAUHOI VALUES (80,19)
select * from DETHICAUHOI
--(MaCH,CauA,CauB,CauC,CauD)
INSERT INTO DETHI VALUES (null,null,2,N'Kiểm tra VẬT LÍ',60,null)
select * from DETHI
--ĐỀ TỔNG
INSERT INTO CAUHOI VALUES (N'Điều nào sau đây là đúng khi nói về chuyển động cơ học?',N'Chuyển động cơ học là sự thay đổi vị trí của vật này so với vật khác',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Có 3 vật chuyển động với các vận tốc tương ứng: v1 = 54km/h; v2 = 10m/s; v3 = 0,02km/s. Câu nào đúng',N'v2 < v1 < v3',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Điều nào sau đây là đúng và đủ nhất khi nói về tác dụng của lực?',N'Lực làm cho vật thay đổi vận tốc hoặc làm cho vật biến dạng hoặc cả hai',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'phương án nào hiệu quả nhất có thể tăng được ma sát giữa phấn và bảng viết?',N'Tăng độ nhám của mặt bảng',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Trong các đơn vị sau đây, đơn vị nào không phải là đơn vị vận tốc?',N'N/m',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N' Một vật đang chuyển động, chịu tác dụng của hai lực cân bằng thì:',N'sẽ tiếp tục chuyển động thẳng đều',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Khi đi trên mặt sàn trơn, ta bám chặt ngón chân xuống nền là để:',N'Tăng ma sát giữa chân với nền đất',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Hai lực cân bằng là hai lực cùng phương,',N'ngược chiều,cùng độ lớn,cùng tác dụng lên 1 vật',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Điều nào sau đây là đúng khi nói về chuyển động cơ học?',N'Chuyển động cơ học là sự thay đổi vị trí của vật này so với vật khác',N'Kiểm Tra',null,1)
INSERT INTO CAUHOI VALUES (N'Có 3 vật chuyển động với các vận tốc tương ứng: v1 = 54km/h; v2 = 10m/s; v3 = 0,02km/s. Câu nào đúng',N'v2 < v1 < v3',N'Kiểm Tra',null,1)
select * from CAUHOI
------------------------------
INSERT INTO DETHICAUHOI VALUES (81,20)
INSERT INTO DETHICAUHOI VALUES (82,20)
INSERT INTO DETHICAUHOI VALUES (83,20)
INSERT INTO DETHICAUHOI VALUES (84,20)
INSERT INTO DETHICAUHOI VALUES (85,20)
INSERT INTO DETHICAUHOI VALUES (86,20)
INSERT INTO DETHICAUHOI VALUES (87,20)
INSERT INTO DETHICAUHOI VALUES (88,20)
INSERT INTO DETHICAUHOI VALUES (89,20)
INSERT INTO DETHICAUHOI VALUES (90,20)
------------------------------
INSERT INTO CAUTRALOI VALUES (81,N'Chuyển động cơ học là sự dịch chuyển của vật',N'Chuyển động cơ học là sự thay đổi vị trí của vật này so với vật khác',N'Chuyển động cơ học là sự thay đổi vận tốc của vật',N'Chuyển động cơ học là sự chuyển dời vị trí của vật')
INSERT INTO CAUTRALOI VALUES (82,N'v1 < v2 < v3',N'v2 < v1 < v3',N'v3 < v2 < v1',N'v2 < v3 < v1')
INSERT INTO CAUTRALOI VALUES (83,N'Lực làm cho vật chuyển động',N'Lực làm cho vật thay đổi vận tốc',N'Lực làm cho vật biến dạng',N'Lực làm cho vật thay đổi vận tốc hoặc làm cho vật biến dạng hoặc cả hai')
INSERT INTO CAUTRALOI VALUES (84,N'Tì mạnh viên phấn vào bảng',N'Tăng độ nhám của mặt bảng',N'Tăng độ nhẵn của mặt bảng',N'Tất cả phương án trên đều được')
INSERT INTO CAUTRALOI VALUES (85,N'km/ph',N'm/h',N'N/m',N'km/h')
INSERT INTO CAUTRALOI VALUES (86,N'sẽ chuyển động nhanh hơn',N'sẽ tiếp tục đứng yên',N'sẽ chuyển động chậm dần',N'sẽ tiếp tục chuyển động thẳng đều')
INSERT INTO CAUTRALOI VALUES (87,N'Tăng áp lực của chân lên mặt đất',N'Giảm áp lực của chân trên nền đất',N'Tăng ma sát giữa chân với nền đất',N'Giảm ma sát giữa chân với nền đất.')
INSERT INTO CAUTRALOI VALUES (88,N'cùng chiều,cùng độ lớn',N'ngược chiều,cùng độ lớn,cùng tác dụng lên 1 vật',N'ngược chiều, cùng độ lớn',N'cùng chiều, cùng độ lớn, cùng tác dụng lên 1 vật')
INSERT INTO CAUTRALOI VALUES (89,N'Chuyển động cơ học là sự dịch chuyển của vật',N'Chuyển động cơ học là sự thay đổi vị trí của vật này so với vật khác',N'Chuyển động cơ học là sự thay đổi vận tốc của vật',N'Chuyển động cơ học là sự chuyển dời vị trí của vật')
INSERT INTO CAUTRALOI VALUES (90,N'v1 < v2 < v3',N'v2 < v1 < v3',N'v3 < v2 < v1',N'v2 < v3 < v1')
select * from CAUTRALOI

