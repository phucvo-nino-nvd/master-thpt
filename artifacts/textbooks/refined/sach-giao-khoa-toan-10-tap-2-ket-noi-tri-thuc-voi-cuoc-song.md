# CHƯƠNG VI. HÀM SỐ, ĐỒ THỊ VÀ ỨNG DỤNG

## Bài 15. Hàm số

#### THUẬT NGỮ

- Tập xác định
- Tập giá trị
- Đồ thị của hàm số
- Hàm số đồng biến
- Hàm số nghịch biến

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết những mô hình dẫn đến khái niệm hàm số.
- Mô tả các khái niệm cơ bản về hàm số: định nghĩa hàm số, tập xác định, tập giá trị, hàm số đồng biến, hàm số nghịch biến, đồ thị của hàm số.
- Mô tả dạng đồ thị của hàm số đồng biến, nghịch biến.
- Vận dụng kiến thức của hàm số vào giải quyết một số bài toán thực tiễn.

Quan sát hoá đơn tiền điện ở hình bên. Hãy cho biết tổng lượng điện tiêu thụ trong tháng và số tiền phải trả (chưa tính thuế giá trị gia tăng).

Có cách nào mô tả sự phụ thuộc của số tiền phải trả vào tổng lượng điện tiêu thụ hay không?

ST: 0100020036 GT: 00438 545 575  
 Mã khách hàng: 110000011628  
 Mã khách hàng: 110000011628  
 Ngày: 1 Tháng: 3 năm 2021  
 Mã khách hàng: 32414  
 XET KH: 56 đồng/hệ: 02414

| Chí số chỉ<br>kw          | Chí số mới<br>kw | Số đồng<br>kw | BH TT<br>kw           | Đơn giá<br>đồng/hệ | Thành tiền<br>(Amount) |
|---------------------------|------------------|---------------|-----------------------|--------------------|------------------------|
| 4324                      | 4402             | 110           |                       |                    |                        |
| Ngày: 1 Tháng: 3 năm 2021 |                  |               | 50                    | 1 878              | 83 90                  |
|                           |                  |               | 50                    | 1 734              | 86 70                  |
|                           |                  |               | 18                    | 2 014              | 36 25                  |
|                           |                  |               | Trong đó              |                    |                        |
|                           |                  |               | Cộng:                 |                    | 206 85                 |
|                           |                  |               | Thuế 0927 19%:        |                    | 20 08                  |
|                           |                  |               | Tổng tiền thanh toán: |                    | 227 53                 |

Bằng chữ: Hai trăm hai mươi bảy nghìn, năm trăm ba mươi bảy đồng chẵn.

#### 1. KHÁI NIỆM HÀM SỐ

» **HĐ1.** Bảng 6.1 cho biết nồng độ bụi PM 2.5 trong không khí theo thời gian trong ngày 25-3-2021 tại một trạm quan trắc ở Thủ đô Hà Nội:

| Thời điểm (giờ)                                 | 0     | 4     | 8    | 12    | 16    |
|-------------------------------------------------|-------|-------|------|-------|-------|
| Nồng độ bụi PM 2.5 ( $\mu\text{g}/\text{m}^3$ ) | 74,27 | 64,58 | 57,9 | 69,07 | 81,78 |

*Bảng 6.1 (Theo moitruongthudo.vn)*

- Hãy cho biết nồng độ bụi PM 2.5 tại mỗi thời điểm 8 giờ, 12 giờ, 16 giờ.
- Trong Bảng 6.1, mỗi thời điểm tương ứng với bao nhiêu giá trị của nồng độ bụi PM 2.5?

Bụi PM 2.5 là hạt bụi mịn có đường kính nhỏ hơn 2,5 micrômét, gây tác hại cho sức khoẻ.

» **HĐ2.** Quan sát Hình 6.1.

- Thời gian theo dõi mực nước biển ở Trường Sa được thể hiện trong hình từ năm nào đến năm nào?
- Trong khoảng thời gian đó, năm nào mực nước biển trung bình tại Trường Sa cao nhất, thấp nhất?

*Hình 6.1 (Theo Tổng cục Thống kê)*

» **HĐ3.** Tính tiền điện

- Dựa vào Bảng 6.2 về giá bán lẻ điện sinh hoạt, hãy tính số tiền phải trả ứng với mỗi lượng điện tiêu thụ ở Bảng 6.3:

| Lượng điện tiêu thụ (kWh) | 50 | 100 | 200 |
|---------------------------|----|-----|-----|
| Số tiền (nghìn đồng)      | ?  | ?   | ?   |

*Bảng 6.3*

| Mức điện tiêu thụ               | Giá bán điện (đồng/kWh) |
|---------------------------------|-------------------------|
| Bậc 1 (từ 0 đến 50 kWh)         | 1 678                   |
| Bậc 2 (từ trên 50 đến 100 kWh)  | 1 734                   |
| Bậc 3 (từ trên 100 đến 200 kWh) | 2 014                   |
| Bậc 4 (từ trên 200 đến 300 kWh) | 2 536                   |
| Bậc 5 (từ trên 300 đến 400 kWh) | 2 834                   |
| Bậc 6 (từ trên 400 kWh trở lên) | 2 927                   |

*Bảng 6.2*

*(Theo Tập đoàn Điện lực Việt Nam ngày 20-3-2019)*

- Gọi  $x$  là lượng điện tiêu thụ (đơn vị kWh) và  $y$  là số tiền phải trả tương ứng (đơn vị nghìn đồng). Hãy viết công thức mô tả sự phụ thuộc của  $y$  vào  $x$  khi  $0 \leq x \leq 50$ .

kWh hay kW.h (kilôoát giờ, còn gọi là số điện) là đơn vị để đo lượng điện tiêu thụ. Ví dụ, một chiếc bàn là công suất 2 kW, nếu sử dụng liên tục trong 1 giờ sẽ tiêu thụ lượng điện là 2 kWh.

Trong HĐ1, nếu gọi  $x$  là thời điểm và  $y$  là nồng độ bụi PM 2.5 thì với mỗi giá trị của  $x$ , xác định được chỉ một giá trị tương ứng của  $y$ . Ta tìm thấy mối quan hệ phụ thuộc tương tự giữa các đại lượng trong HĐ2, HĐ3.

Giả sử có đại lượng  $y$  phụ thuộc vào đại lượng thay đổi  $x$ , trong đó  $x$  nhận giá trị thuộc tập hợp số  $D$ .

Nếu với mỗi giá trị của  $x$  thuộc tập hợp số  $D$  có một và chỉ một giá trị tương ứng của  $y$  thuộc tập số thực  $\mathbb{R}$  thì ta có một hàm số.

Ta gọi  $x$  là **biến số** và  $y$  là **hàm số** của  $x$ .

Tập hợp  $D$  gọi là **tập xác định** của hàm số.

Tập tất cả các giá trị  $y$  nhận được, gọi là **tập giá trị** của hàm số.

Khi  $y$  là hàm số của  $x$ , ta có thể viết

$y = f(x)$ ,  $y = g(x)$ , ...

» **Ví dụ 1.** Trong HD1, nếu gọi  $x$  là thời điểm,  $y$  là nồng độ bụi PM 2.5 thì  $x$  là biến số và  $y$  là hàm số của  $x$ . Đó là **hàm số được cho bằng bảng**.

Tập xác định của hàm số là  $D = \{0; 4; 8; 12; 16\}$ .

Tập giá trị của hàm số là  $\{74,27; 64,58; 57,9; 69,07; 81,78\}$ .

» **Ví dụ 2.** Viết hàm số mô tả sự phụ thuộc của quãng đường đi được vào thời gian của một vật chuyển động thẳng đều với vận tốc 2 m/s. Tìm tập xác định của hàm số đó. Tính quãng đường vật đi được sau 5 s, 10 s.

**Giải**

Một vật chuyển động thẳng đều với vận tốc  $v = 2$  m/s thì quãng đường đi được  $S$  (mét) phụ thuộc vào thời gian  $t$  (giây) theo công thức  $S = 2t$ , trong đó  $t$  là biến số,  $S = S(t)$  là hàm số của  $t$ . Tập xác định của hàm số là  $D = [0; +\infty)$ .

Quãng đường vật đi được sau 5 s là:  $S_1 = S(5) = 2 \cdot 5 = 10$  (m).

Quãng đường vật đi được sau 10 s là:  $S_2 = S(10) = 2 \cdot 10 = 20$  (m).

**Chú ý.** Khi cho **hàm số bằng công thức**  $y = f(x)$  mà không chỉ rõ tập xác định của nó thì ta quy ước tập xác định của hàm số là tập hợp tất cả các số thực  $x$  sao cho biểu thức  $f(x)$  có nghĩa.

» **Ví dụ 3.** Tìm tập xác định của các hàm số sau:

a)  $y = \sqrt{2x - 4}$ ;

b)  $y = \frac{1}{x - 1}$ .

**Giải**

a) Biểu thức  $\sqrt{2x - 4}$  có nghĩa khi  $2x - 4 \geq 0$ , tức là khi  $x \geq 2$ .

Vậy tập xác định của hàm số đã cho là  $D = [2; +\infty)$ .

b) Biểu thức  $\frac{1}{x - 1}$  có nghĩa khi  $x - 1 \neq 0$ , tức là khi  $x \neq 1$ .

Vậy tập xác định của hàm số đã cho là  $D = \mathbb{R} \setminus \{1\}$ .

» **Luyện tập 1.** a) Hãy cho biết Bảng 6.4 có cho ta một hàm số hay không. Nếu có, tìm tập xác định và tập giá trị của hàm số đó.

| Thời điểm (năm)                               | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 |
|-----------------------------------------------|------|------|------|------|------|------|
| Tuổi thọ trung bình của người Việt Nam (tuổi) | 73,1 | 73,2 | 73,3 | 73,4 | 73,5 | 73,5 |

**Bảng 6.4 (Theo Tổng cục Thống kê)**

b) Trở lại HD2, ta có **hàm số cho bằng biểu đồ**. Hãy cho biết giá trị của hàm số tại  $x = 2018$ . Tìm tập xác định, tập giá trị của hàm số đó.

c) Cho hàm số  $y = f(x) = -2x^2$ . Tính  $f(1)$ ;  $f(2)$  và tìm tập xác định, tập giá trị của hàm số này.

**Nhận xét.** Một hàm số có thể được cho bằng bảng, bằng biểu đồ, bằng công thức hoặc bằng mô tả.

#### 2. ĐỒ THỊ CỦA HÀM SỐ

» **HĐ4.** Quan sát Hình 6.2 và cho biết những điểm nào sau đây nằm trên đồ thị của hàm số  $y = \frac{1}{2}x^2$ :  
 $(0; 0)$ ,  $(2; 2)$ ,  $(-2; 2)$ ,  $(1; 2)$ ,  $(-1; 2)$ .

Nếu nhận xét về mối quan hệ giữa hoành độ và tung độ của những điểm nằm trên đồ thị.

**Đồ thị của hàm số**  $y = f(x)$  xác định trên tập  $D$  là tập hợp tất cả các điểm  $M(x; f(x))$  trên mặt phẳng toạ độ với mọi  $x$  thuộc  $D$ .

Hình 6.2

» **Ví dụ 4.** Viết công thức của hàm số cho ở HĐ3b. Tìm tập xác định, tập giá trị và vẽ đồ thị của hàm số này.

**Giải**

Công thức của hàm số cho ở HĐ3b là  $y = 1,678x$  với  $0 \leq x \leq 50$ .

Tập xác định của hàm số này là  $D = [0; 50]$ .

Vì  $0 \leq x \leq 50$  nên  $0 \leq y \leq 1,678 \cdot 50 = 83,9$ .

Vậy tập giá trị của hàm số là  $[0; 83,9]$ .

Đồ thị của hàm số  $y = 1,678x$  trên  $[0; 50]$  là một đoạn thẳng (H.6.3).

Hình 6.3

##### » Luyện tập 2

a) Dựa vào đồ thị của hàm số  $y = \frac{1}{2}x^2$  (H.6.2), tìm  $x$  sao cho  $y = 8$ .

b) Vẽ đồ thị của các hàm số  $y = 2x + 1$  và  $y = 2x^2$  trên cùng một mặt phẳng toạ độ.

» **Vận dụng 1.** Nếu lượng điện tiêu thụ từ trên 50 đến 100 kWh ( $50 < x \leq 100$ ) thì công thức liên hệ giữa  $y$  và  $x$  đã thiết lập ở HĐ3 không còn đúng nữa.

Theo bảng giá bán lẻ điện sinh hoạt (Bảng 6.2) thì số tiền phải trả là:

$$y = 1,678 \cdot 50 + 1,734(x - 50) = 83,9 + 1,734(x - 50), \text{ hay } y = 1,734x - 2,8 \text{ (nghìn đồng).}$$

Vậy trên tập xác định  $D = (50; 100]$ , hàm số  $y$  mô tả số tiền phải thanh toán có công thức là  $y = 1,734x - 2,8$ ; tập giá trị của nó là  $(83,9; 170,6]$ .

Hãy vẽ đồ thị ở Hình 6.3 vào vở rồi vẽ tiếp đồ thị của hàm số  $y = 1,734x - 2,8$  trên tập  $D = (50; 100]$ .

##### • Tìm hiểu thêm •

Hàm số mô tả sự phụ thuộc của  $y$  (số tiền phải trả) vào  $x$  (lượng điện tiêu thụ) trên từng khoảng giá trị  $x$  được cho bằng công thức như sau:

$$y = \begin{cases} 1,678x & \text{nếu } 0 \leq x \leq 50 \\ 1,734x - 2,8 & \text{nếu } 50 < x \leq 100 \\ 2,014x - 30,8 & \text{nếu } 100 < x \leq 200 \\ 2,536x - 135,2 & \text{nếu } 200 < x \leq 300 \\ 2,834x - 224,6 & \text{nếu } 300 < x \leq 400 \\ 2,927x - 261,8 & \text{nếu } x > 400. \end{cases}$$

Đồ thị của hàm số trên được vẽ như Hình 6.4.

Hình 6.4

#### 3. SỰ ĐỒNG BIẾN, NGHỊCH BIẾN CỦA HÀM SỐ

» **HĐ5.** Cho hàm số  $y = -x + 1$  và  $y = x$ . Tính giá trị  $y$  theo giá trị  $x$  để hoàn thành bảng sau:

|              |    |    |   |   |   |
|--------------|----|----|---|---|---|
| $x$          | -2 | -1 | 0 | 1 | 2 |
| $y = -x + 1$ | ?  | ?  | ? | ? | ? |
| $y = x$      | ?  | ?  | ? | ? | ? |

Khi giá trị  $x$  tăng, giá trị  $y$  tương ứng của mỗi hàm số  $y = -x + 1$  và  $y = x$  tăng hay giảm?

» **HĐ6.** Quan sát đồ thị của hàm số  $y = f(x) = -x^2$  trên  $\mathbb{R}$  (H.6.5).

Hỏi:

- Giá trị của  $f(x)$  tăng hay giảm khi  $x$  tăng trên khoảng  $(-\infty; 0)$ ?
- Giá trị của  $f(x)$  tăng hay giảm khi  $x$  tăng trên khoảng  $(0; +\infty)$ ?

Hình 6.5

Hàm số  $y = f(x)$  được gọi là **đồng biến** (tăng) trên khoảng  $(a; b)$ , nếu

$$\forall x_1, x_2 \in (a; b), x_1 < x_2 \Rightarrow f(x_1) < f(x_2).$$

Hàm số  $y = f(x)$  được gọi là **nghịch biến** (giảm) trên khoảng  $(a; b)$ , nếu

$$\forall x_1, x_2 \in (a; b), x_1 < x_2 \Rightarrow f(x_1) > f(x_2).$$

» **Ví dụ 5.** Hàm số  $y = x^2$  đồng biến hay nghịch biến trên mỗi khoảng:  $(-\infty; 0)$  và  $(0; +\infty)$ ?

Giải

Vẽ đồ thị hàm số  $y = f(x) = x^2$  như Hình 6.6.

- Trên khoảng  $(-\infty; 0)$ , đồ thị “đi xuống” từ trái sang phải và với  $x_1, x_2 \in (-\infty; 0)$ ,  $x_1 < x_2$  thì  $f(x_1) > f(x_2)$ . Như vậy, hàm số  $y = x^2$  nghịch biến trên khoảng  $(-\infty; 0)$ .
- Trên khoảng  $(0; +\infty)$ , đồ thị “đi lên” từ trái sang phải và với  $x_3, x_4 \in (0; +\infty)$ ,  $x_3 < x_4$  thì  $f(x_3) < f(x_4)$ . Như vậy, hàm số  $y = x^2$  đồng biến trên khoảng  $(0; +\infty)$ .

Hình 6.6

**Chú ý**

- Đồ thị của một hàm số đồng biến trên khoảng  $(a; b)$  là đường “đi lên” từ trái sang phải;
- Đồ thị của một hàm số nghịch biến trên khoảng  $(a; b)$  là đường “đi xuống” từ trái sang phải.

» **Luyện tập 3.** Vẽ đồ thị của hàm số  $y = 3x + 1$  và  $y = -2x^2$ . Hãy cho biết:

- Hàm số  $y = 3x + 1$  đồng biến hay nghịch biến trên  $\mathbb{R}$ .
- Hàm số  $y = -2x^2$  đồng biến hay nghịch biến trên mỗi khoảng:  $(-\infty; 0)$  và  $(0; +\infty)$ .

» **Vận dụng 2.** Quan sát bảng giá cước taxi bốn chỗ trong Hình 6.7.

- Tính số tiền phải trả khi di chuyển 25 km.
- Lập công thức tính số tiền cước taxi phải trả theo số kilômét di chuyển.
- Vẽ đồ thị và cho biết hàm số đồng biến trên khoảng nào, nghịch biến trên khoảng nào.

| Bảng Giá Cước - Taxi Fare                                                                                                                                                                                                                                         |                                                    |                                             |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|---------------------------------------------|
| Giá mở cửa<br>Commencement rate up 0.6 km                                                                                                                                                                                                                         | Giá km tiếp theo<br>From the following km to 25 km | Từ km thứ 25<br>For each km from the 25 km+ |
| <b>10.000 đ/0.6km</b>                                                                                                                                                                                                                                             | <b>13.000 đ/km</b>                                 | <b>11.000 đ/km</b>                          |
| <small>Phí chờ giá dưới 2.000 đ/4 phút (Every 4 minutes is 2.000 VND for waiting fee)   Giá trên đã bao gồm 10% Thuế Giá trị gia tăng<br/>Giảm giá 60% chiếu về cho khách đi đường dài 2 chiều phụng vi từ 40 Km trở đi (chiếu về tương ứng với chiếu đi)</small> |                                                    |                                             |

Hình 6.7

## Bài 16. Hàm số bậc hai

#### THUẬT NGỮ

- Hàm số bậc hai
- Bảng giá trị
- Parabola
- Đỉnh
- Trục đối xứng

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết hàm số bậc hai.
- Thiết lập bảng giá trị của hàm số bậc hai.
- Vẽ parabol (parabola) là đồ thị của hàm số bậc hai.
- Nhận biết các yếu tố cơ bản của đường parabol như đỉnh, trục đối xứng.
- Nhận biết và giải thích các tính chất của hàm số bậc hai thông qua đồ thị.
- Vận dụng kiến thức về hàm số bậc hai và đồ thị vào giải quyết bài toán thực tiễn.

Bác Việt có một tấm lưới hình chữ nhật dài 20 m. Bác muốn dùng tấm lưới này rào chắn ba mặt áp bên bờ tường của khu vườn nhà mình thành một mảnh đất hình chữ nhật để trồng rau.

Hỏi hai cột góc hàng rào cần phải cắm cách bờ tường bao xa để mảnh đất được rào chắn của bác có diện tích lớn nhất?

Hình 6.8

#### 1. KHÁI NIỆM HÀM SỐ BẬC HAI

» **HĐ1.** Xét bài toán rào vườn ở tình huống mở đầu. Gọi  $x$  mét ( $0 < x < 10$ ) là khoảng cách từ điểm cắm cọc đến bờ tường (H.6.8). Hãy tính theo  $x$ :

- Độ dài cạnh  $PQ$  của mảnh đất.
- Diện tích  $S(x)$  của mảnh đất được rào chắn.

Ở đây ta tính được  $S(x) = -2x^2 + 20x$ .

Đây là một hàm số cho bởi công thức và gọi là một hàm số bậc hai của biến số  $x$ .

Tổng quát, ta có

**Hàm số bậc hai** là hàm số cho bởi công thức

$$y = ax^2 + bx + c,$$

trong đó  $x$  là biến số,  $a, b, c$  là các hằng số và  $a \neq 0$ .

Tập xác định của hàm số bậc hai là  $\mathbb{R}$ .

**?** Hàm số nào dưới đây là hàm số bậc hai?

- A.  $y = x^4 + 3x^2 + 2$ .    B.  $y = \frac{1}{x^2}$ .    C.  $y = -3x^2 + 1$ .    D.  $y = 3\left(\frac{1}{x}\right)^2 + 3\frac{1}{x} - 1$ .

##### **Nhận xét.**

Hàm số  $y = ax^2$  ( $a \neq 0$ ) đã học ở lớp 9 là một trường hợp đặc biệt của hàm số bậc hai với  $b = c = 0$ .

**» Ví dụ 1.** Xét hàm số bậc hai  $y = -2x^2 + 20x$ . Thay dấu “?” bằng các số thích hợp để hoàn thành bảng giá trị sau của hàm số.

|   |   |   |   |   |   |   |    |
|---|---|---|---|---|---|---|----|
| x | 0 | 2 | 4 | 5 | 6 | 8 | 10 |
| y | ? | ? | ? | ? | ? | ? | ?  |

**Giải**

Thay các giá trị của x vào công thức hàm số, ta được:

|   |   |    |    |    |    |    |    |
|---|---|----|----|----|----|----|----|
| x | 0 | 2  | 4  | 5  | 6  | 8  | 10 |
| y | 0 | 32 | 48 | 50 | 48 | 32 | 0  |

Bảng giá trị của hàm số  $y = -2x^2 + 20x$  tại một số điểm.

**» Luyện tập 1.** Cho hàm số  $y = (x - 1)(2 - 3x)$ .

a) Hàm số đã cho có phải là hàm số bậc hai không? Nếu có, hãy xác định các hệ số a, b, c của nó.

b) Thay dấu “?” bằng các số thích hợp để hoàn thành bảng giá trị sau của hàm số đã cho.

|   |    |    |   |   |
|---|----|----|---|---|
| x | -2 | -1 | 0 | 1 |
| y | ?  | ?  | ? | ? |

**» Vận dụng 1.** Một viên bi rơi tự do từ độ cao 19,6 m xuống mặt đất. Độ cao h (mét) so với mặt đất của viên bi trong khi rơi phụ thuộc vào thời gian t (giây) theo công thức:  $h = 19,6 - 4,9t^2$ ;  $h, t \geq 0$ .

a) Hỏi sau bao nhiêu giây kể từ khi rơi viên bi chạm đất?

b) Tìm tập xác định và tập giá trị của hàm số h.

#### **2. ĐỒ THỊ CỦA HÀM SỐ BẬC HAI**

Ở lớp 9, ta đã biết dạng đồ thị của hàm số  $y = ax^2$  ( $a \neq 0$ ) (H.6.9). Trong mục này ta sẽ tìm hiểu đồ thị của hàm số bậc hai  $y = ax^2 + bx + c$  ( $a \neq 0$ ).

Hình 6.9

**» HĐ2.** Xét hàm số  $y = S(x) = -2x^2 + 20x$  ( $0 < x < 10$ ).

a) Trên mặt phẳng toạ độ Oxy, biểu diễn toạ độ các điểm trong bảng giá trị của hàm số lập được ở Ví dụ 1. Nối các điểm đã vẽ lại ta được dạng đồ thị hàm số  $y = -2x^2 + 20x$  trên khoảng (0; 10) như trong Hình 6.10. Dạng đồ thị của hàm số  $y = -2x^2 + 20x$  có giống với đồ thị của hàm số  $y = -2x^2$  hay không?

b) Quan sát dạng đồ thị của hàm số  $y = -2x^2 + 20x$  trong Hình 6.10, tìm toạ độ điểm cao nhất của đồ thị.

c) Thực hiện phép biến đổi

$$\begin{aligned} y &= -2x^2 + 20x = -2(x^2 - 10x) \\ &= -2(x^2 - 2 \cdot 5 \cdot x + 25) + 50 = -2(x - 5)^2 + 50. \end{aligned}$$

Hãy cho biết giá trị lớn nhất của diện tích mảnh đất được rào chắn. Từ đó suy ra lời giải của bài toán ở phần mở đầu.

Hình 6.10. Dạng đồ thị của hàm số  $y = -2x^2 + 20x$

» **HĐ3.** Tương tự HĐ2, ta có dạng đồ thị của một số hàm số bậc hai sau.

Từ các đồ thị hàm số trên, hãy hoàn thành bảng sau đây.

| Hàm số               | Hệ số a | Tính chất của đồ thị                       |                                     |               |
|----------------------|---------|--------------------------------------------|-------------------------------------|---------------|
|                      |         | Bề lõm của đồ thị<br>(Quay lên/Quay xuống) | Toạ độ điểm cao nhất/điểm thấp nhất | Trục đối xứng |
| $y = x^2 + 2x + 2$   | 1       | Quay lên                                   | (-1; 1)                             | $x = -1$      |
| $y = -2x^2 - 3x + 1$ | ?       | ?                                          | ?                                   | ?             |

Tổng quát, ta có thể viết hàm số bậc hai  $y = ax^2 + bx + c$  ( $a \neq 0$ ) dưới dạng

$$y = ax^2 + bx + c = a \left( x^2 + 2 \frac{b}{2a} x + \frac{b^2}{4a^2} \right) - \frac{b^2}{4a} + c = a \left( x + \frac{b}{2a} \right)^2 - \frac{\Delta}{4a}, \text{ với } \Delta = b^2 - 4ac.$$

Ta thấy điểm  $I\left(-\frac{b}{2a}; -\frac{\Delta}{4a}\right)$  thuộc đồ thị hàm số bậc hai và là một điểm đặc biệt, nó đóng vai trò như điểm  $O(0; 0)$  của đồ thị hàm số  $y = ax^2$ . Cụ thể:

- Nếu  $a > 0$  thì  $y = a\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a} \geq -\frac{\Delta}{4a}$  với mọi  $x$ . Như vậy điểm  $I$  là điểm thấp nhất trên đồ thị.
- Nếu  $a < 0$  thì  $y = a\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a} \leq -\frac{\Delta}{4a}$  với mọi  $x$ . Như vậy điểm  $I$  là điểm cao nhất trên đồ thị.

Gọi  $(P_0)$  là **parabol**  $y = ax^2$ . Nếu ta “dịch chuyển”  $(P_0)$  theo vectơ  $\vec{OI}$  thì ta sẽ thu được đồ thị  $(P)$  của hàm số  $y = ax^2 + bx + c$  có dạng như Hình 6.11.

a) Đồ thị hàm số  $y = ax^2 + bx + c$  với  $a > 0$   
(trường hợp parabol cắt trục hoành)

b) Đồ thị hàm số  $y = ax^2 + bx + c$  với  $a < 0$   
(trường hợp parabol cắt trục hoành)

Hình 6.11

**Nhận xét.** Đồ thị hàm số bậc hai  $y = ax^2 + bx + c$  là một parabol.

- Đồ thị hàm số  $y = ax^2 + bx + c$  ( $a \neq 0$ ) là một đường parabol có **đỉnh** là điểm  $I\left(-\frac{b}{2a}; -\frac{\Delta}{4a}\right)$ , có **trục đối xứng** là đường thẳng  $x = -\frac{b}{2a}$ . Parabol này quay bề lõm lên trên nếu  $a > 0$ , xuống dưới nếu  $a < 0$ .
- Để vẽ đường parabol  $y = ax^2 + bx + c$  ta tiến hành theo các bước sau:
  1. Xác định toạ độ đỉnh  $I\left(-\frac{b}{2a}; -\frac{\Delta}{4a}\right)$ ;
  2. Vẽ trục đối xứng  $x = -\frac{b}{2a}$ ;
  3. Xác định toạ độ các giao điểm của parabol với trục tung, trục hoành (nếu có) và một vài điểm đặc biệt trên parabol;
  4. Vẽ parabol.

» **Ví dụ 2.** a) Vẽ parabol  $y = -2x^2 - 2x + 4$ .

b) Từ đồ thị, hãy tìm khoảng đồng biến, nghịch biến và giá trị lớn nhất của hàm số  $y = -2x^2 - 2x + 4$ .

**Giải**

a) Ta có  $a = -2 < 0$  nên parabol quay bề lõm xuống dưới.

Đỉnh  $I\left(-\frac{1}{2}; \frac{9}{2}\right)$ . Trục đối xứng  $x = -\frac{1}{2}$ . Giao điểm của đồ thị với trục Oy là  $A(0; 4)$ . Parabol cắt trục hoành tại hai điểm có hoành độ là nghiệm của phương trình  $-2x^2 - 2x + 4 = 0$ , tức là  $x = 1$  và  $x = -2$  (H.6.12).

Để vẽ đồ thị chính xác hơn, ta có thể lấy thêm điểm đối xứng với  $A$  qua trục đối xứng  $x = -\frac{1}{2}$  là  $B(-1; 4)$ .

b) Từ đồ thị ta thấy:

- Hàm số  $y = -2x^2 - 2x + 4$  đồng biến trên  $\left(-\infty; -\frac{1}{2}\right)$ , nghịch biến trên  $\left(-\frac{1}{2}; +\infty\right)$ ;
- Giá trị lớn nhất của hàm số là  $y = \frac{9}{2}$ , khi  $x = -\frac{1}{2}$ .

» **Luyện tập 2.** Vẽ parabol  $y = 3x^2 - 10x + 7$ . Từ đó tìm khoảng đồng biến, nghịch biến và giá trị nhỏ nhất của hàm số  $y = 3x^2 - 10x + 7$ .

**Nhận xét.** Từ đồ thị hàm số  $y = ax^2 + bx + c$  ( $a \neq 0$ ), ta suy ra tính chất của hàm số  $y = ax^2 + bx + c$  ( $a \neq 0$ ):

| Với $a > 0$                                                            | Với $a < 0$                                                            |
|------------------------------------------------------------------------|------------------------------------------------------------------------|
| Hàm số nghịch biến trên khoảng $\left(-\infty; -\frac{b}{2a}\right)$ ; | Hàm số đồng biến trên khoảng $\left(-\infty; -\frac{b}{2a}\right)$ ;   |
| Hàm số đồng biến trên khoảng $\left(-\frac{b}{2a}; +\infty\right)$ ;   | Hàm số nghịch biến trên khoảng $\left(-\frac{b}{2a}; +\infty\right)$ ; |
| $-\frac{\Delta}{4a}$ là giá trị nhỏ nhất của hàm số.                   | $-\frac{\Delta}{4a}$ là giá trị lớn nhất của hàm số.                   |

» **Vận dụng 2.** Bạn Nam đứng dưới chân cầu vượt ba tầng ở nút giao ngã ba Huế, thuộc thành phố Đà Nẵng để ngắm cầu vượt (H.6.13). Biết rằng trụ tháp cầu có dạng đường parabol, khoảng cách giữa hai chân trụ tháp khoảng 27 m, chiều cao của trụ tháp tính từ điểm trên mặt đất cách chân trụ tháp 2,26 m là 20 m. Hãy giúp bạn Nam ước lượng độ cao của đỉnh trụ tháp cầu (so với mặt đất).

**Hướng dẫn**

Chọn hệ trục tọa độ Oxy sao cho một chân trụ tháp đặt tại gốc tọa độ, chân còn lại đặt trên tia Ox. Khi đó trụ tháp là một phần của đồ thị hàm số dạng  $y = ax^2 + bx$ .

Hình 6.13. Cầu vượt ba tầng ở nút giao ngã ba Huế thuộc thành phố Đà Nẵng.

## Bài 17. Dấu của tam thức bậc hai

#### THUẬT NGỮ

- Tam thức bậc hai
- Dấu của tam thức bậc hai
- Bất phương trình bậc hai

#### KIẾN THỨC, KĨ NĂNG

- Giải thích Định lý về dấu của tam thức bậc hai từ việc quan sát đồ thị của hàm bậc hai.
- Giải bất phương trình bậc hai.
- Vận dụng bất phương trình bậc hai vào giải quyết bài toán thực tiễn.

Xét bài toán rào vườn ở Bài 16, nhưng ta trả lời câu hỏi: Hai cột góc hàng rào (H.6.8) cần phải cắm cách bờ tường bao nhiêu mét để mảnh đất được rào chắn có diện tích không nhỏ hơn 48 m<sup>2</sup>?

#### 1. DẤU CỦA TAM THỨC BẬC HAI

» **HĐ1.** Hãy chỉ ra một đặc điểm chung của các biểu thức dưới đây:

$$A = 0,5x^2; \quad B = 1 - x^2; \quad C = x^2 + x + 1; \quad D = (1 - x)(2x + 1).$$

Tam thức bậc hai (đối với  $x$ ) là biểu thức có dạng  $ax^2 + bx + c$ , trong đó  $a, b, c$  là những số thực cho trước (với  $a \neq 0$ ), được gọi là các hệ số của tam thức bậc hai.

Người ta thường viết  $f(x) = ax^2 + bx + c$ . Các đa thức đã cho trong HĐ1 là những tam thức bậc hai. Ở đa thức  $A$ , ta có  $a = 0,5; b = 0; c = 0$ .

» **Luyện tập 1.** Hãy cho biết biểu thức nào sau đây là tam thức bậc hai.

$$A = 3x + 2\sqrt{x} + 1; \quad B = -5x^4 + 3x^2 + 4; \quad C = -\frac{2}{3}x^2 + 7x - 4; \quad D = \left(\frac{1}{x}\right)^2 + 2\frac{1}{x} + 3.$$

##### Chú ý

Nghiệm của phương trình bậc hai  $ax^2 + bx + c = 0$  cũng được gọi là nghiệm của tam thức bậc hai  $ax^2 + bx + c$ .

$\Delta = b^2 - 4ac$  và  $\Delta' = b^2 - ac$ , với  $b = 2b'$  tương ứng được gọi là biệt thức và biệt thức thu gọn của tam thức bậc hai  $ax^2 + bx + c$ .

» **HĐ2.** Cho hàm số bậc hai  $y = f(x) = x^2 - 4x + 3$ .

- a) Xác định hệ số  $a$ . Tính  $f(0), f(1), f(2), f(3), f(4)$  và nhận xét về dấu của chúng so với dấu của hệ số  $a$ .

- b) Cho đồ thị hàm số  $y = f(x)$  (H.6.17). Xét trên từng khoảng  $(-\infty; 1)$ ,  $(1; 3)$ ,  $(3; +\infty)$ , đồ thị nằm phía trên hay nằm phía dưới trục  $Ox$ ?
- c) Nhận xét về dấu của  $f(x)$  và dấu của hệ số  $a$  trên từng khoảng đó.

Hình 6.17

» **HĐ3.** Cho đồ thị hàm số  $y = g(x) = -2x^2 + x + 3$  như Hình 6.18.

- a) Xét trên từng khoảng  $(-\infty; -1)$ ,  $(-1; \frac{3}{2})$ ,  $(\frac{3}{2}; +\infty)$ , đồ thị nằm phía trên trục  $Ox$  hay nằm phía dưới trục  $Ox$ ?
- b) Nhận xét về dấu của  $g(x)$  và dấu của hệ số  $a$  trên từng khoảng đó.

Hình 6.18

##### Nhận xét

Từ HĐ2 và HĐ3 ta thấy, nếu tam thức bậc hai  $f(x) = ax^2 + bx + c$  có hai nghiệm phân biệt  $x_1, x_2$  ( $x_1 < x_2$ ) thì  $f(x)$  luôn cùng dấu với hệ số  $a$  với mọi giá trị  $x \in (-\infty; x_1) \cup (x_2; +\infty)$  (ở ngoài đoạn hai nghiệm) và trái dấu với  $a$  với mọi giá trị  $x \in (x_1; x_2)$  (ở trong khoảng hai nghiệm).

» **HĐ4.** Nêu nội dung thay vào ô có dấu "?" trong bảng sau cho thích hợp.

- Trường hợp  $a > 0$

| $\Delta$                           | $\Delta < 0$                               | $\Delta = 0$                                                                                        | $\Delta > 0$                                                                                                                                                                                                                                       |
|------------------------------------|--------------------------------------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Dạng đồ thị                        |                                            |                                                                                                     |                                                                                                                                                                                                                                                    |
| Vị trí của đồ thị so với trục $Ox$ | Đồ thị nằm hoàn toàn phía trên trục $Ox$ . | Đồ thị nằm phía trên trục $Ox$ và tiếp xúc với trục $Ox$ tại điểm có hoành độ $x = -\frac{b}{2a}$ . | <ul style="list-style-type: none"> <li>– Đồ thị nằm phía trên trục <math>Ox</math> khi <math>x &lt; x_1</math> hoặc <math>x &gt; x_2</math>.</li> <li>– Đồ thị nằm phía dưới trục <math>Ox</math> khi <math>x_1 &lt; x &lt; x_2</math>.</li> </ul> |

###### • Trường hợp $a < 0$

| $\Delta$                         | $\Delta < 0$                                                                      | $\Delta = 0$                                                                      | $\Delta > 0$                                                                      |
|----------------------------------|-----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| Dạng đồ thị                      | <img data-bbox="306 204 473 393" src="1d85b3845b334e1d74b26fac6da928b8_img.jpg"/> | <img data-bbox="526 204 693 393" src="ea2b545862307286da29ee799820a08b_img.jpg"/> | <img data-bbox="746 204 913 393" src="9448358a674e54417978a7dd5bda2ce3_img.jpg"/> |
| Vị trí của đồ thị so với trục Ox | ?                                                                                 | ?                                                                                 | ?                                                                                 |

Mối quan hệ giữa dấu của tam thức bậc hai  $ax^2 + bx + c$  với dấu của hệ số  $a$  trong từng trường hợp của  $\Delta$  được phát biểu trong **Định lí về dấu tam thức bậc hai** sau đây.

Cho tam thức bậc hai  $f(x) = ax^2 + bx + c$  ( $a \neq 0$ ).

- Nếu  $\Delta < 0$  thì  $f(x)$  cùng dấu với hệ số  $a$  với mọi  $x \in \mathbb{R}$ .
- Nếu  $\Delta = 0$  thì  $f(x)$  cùng dấu với hệ số  $a$  với mọi  $x \neq -\frac{b}{2a}$  và  $f\left(-\frac{b}{2a}\right) = 0$ .
- Nếu  $\Delta > 0$  thì tam thức  $f(x)$  có hai nghiệm phân biệt  $x_1$  và  $x_2$  ( $x_1 < x_2$ ). Khi đó,  $f(x)$  cùng dấu với hệ số  $a$  với mọi  $x \in (-\infty; x_1) \cup (x_2; +\infty)$ ;  $f(x)$  trái dấu với hệ số  $a$  với mọi  $x \in (x_1; x_2)$ .

Khi  $\Delta > 0$ , dấu của  $f(x)$  và  $a$  là: "Trong trái, ngoài cùng".

cùng dấu  $x_1$  trái dấu  $x_2$  cùng dấu

**Chú ý.** Trong Định lí về dấu tam thức bậc hai có thể thay  $\Delta$  bởi  $\Delta'$ .

» **Ví dụ 1.** Xét dấu các tam thức bậc hai sau:

a)  $x^2 + x + 1$ ;

b)  $-\frac{3}{2}x^2 + 9x - \frac{27}{2}$ ;

c)  $2x^2 + 6x - 8$ .

**Giải**

a)  $f(x) = x^2 + x + 1$  có  $\Delta = -3 < 0$  và  $a = 1 > 0$  nên  $f(x) > 0$  với mọi  $x \in \mathbb{R}$ .

b)  $g(x) = -\frac{3}{2}x^2 + 9x - \frac{27}{2}$  có  $\Delta = 0$  và  $a = -\frac{3}{2} < 0$  nên  $g(x)$  có nghiệm kép  $x = 3$  và  $g(x) < 0$  với mọi  $x \neq 3$ .

c) Dễ thấy  $h(x) = 2x^2 + 6x - 8$  có  $\Delta' = 25 > 0$ ,  $a = 2 > 0$  và có hai nghiệm phân biệt  $x_1 = -4$ ;  $x_2 = 1$ . Do đó ta có bảng xét dấu  $h(x)$ :

|        |           |    |   |           |   |
|--------|-----------|----|---|-----------|---|
| $x$    | $-\infty$ | -4 | 1 | $+\infty$ |   |
| $h(x)$ | +         | 0  | - | 0         | + |

Suy ra  $h(x) > 0$  với mọi  $x \in (-\infty; -4) \cup (1; +\infty)$  và  $h(x) < 0$  với mọi  $x \in (-4; 1)$ .

» **Luyện tập 2.** Xét dấu các tam thức bậc hai sau:

a)  $-3x^2 + x - \sqrt{2}$ ;      b)  $x^2 + 8x + 16$ ;      c)  $-2x^2 + 7x - 3$ .

#### 2. BẤT PHƯƠNG TRÌNH BẬC HAI

» **HĐ5.** Trở lại tình huống mở đầu. Với yêu cầu mảnh đất được rào chắn có diện tích không nhỏ hơn 48 m<sup>2</sup>, hãy viết bất đẳng thức thể hiện sự so sánh biểu thức tính diện tích  $S(x) = -2x^2 + 20x$  với 48.

Từ HĐ5, ta có  $2x^2 - 20x + 48 \leq 0$ . (1)

Đây là một bất phương trình bậc hai.

Tổng quát, ta có định nghĩa sau:

- Bất phương trình bậc hai ẩn  $x$  là bất phương trình có dạng  $ax^2 + bx + c > 0$  (hoặc  $ax^2 + bx + c \geq 0$ ,  $ax^2 + bx + c < 0$ ,  $ax^2 + bx + c \leq 0$ ), trong đó  $a, b, c$  là những số thực đã cho và  $a \neq 0$ .
- Số thực  $x_0$  gọi là một **nghiệm** của bất phương trình bậc hai  $ax^2 + bx + c > 0$ , nếu  $ax_0^2 + bx_0 + c > 0$ . Tập hợp gồm tất cả các nghiệm của bất phương trình bậc hai  $ax^2 + bx + c > 0$  gọi là **tập nghiệm** của bất phương trình này.
- Giải bất phương trình bậc hai  $f(x) = ax^2 + bx + c > 0$  là tìm tập nghiệm của nó, tức là tìm các khoảng mà trong đó  $f(x)$  cùng dấu với hệ số  $a$  (nếu  $a > 0$ ) hay trái dấu với hệ số  $a$  (nếu  $a < 0$ ).

**Nhận xét.** Để giải bất phương trình bậc hai  $ax^2 + bx + c > 0$  (hoặc  $ax^2 + bx + c \geq 0$ ,  $ax^2 + bx + c < 0$ ,  $ax^2 + bx + c \leq 0$ ) ta cần xét dấu tam thức  $ax^2 + bx + c$ , từ đó suy ra tập nghiệm.

» **Ví dụ 2.** Giải các bất phương trình sau:

a)  $3x^2 + x + 5 \leq 0$ ;      b)  $-3x^2 + 2\sqrt{3}x - 1 \geq 0$ ;      c)  $-x^2 + 2x + 1 > 0$ .

**Giải**

a) Tam thức  $f(x) = 3x^2 + x + 5$  có  $\Delta = -59 < 0$ , hệ số  $a = 3 > 0$  nên  $f(x)$  luôn dương (cùng dấu với  $a$ ) với mọi  $x$ , tức là  $3x^2 + 5x + 5 > 0$  với mọi  $x \in \mathbb{R}$ . Suy ra bất phương trình vô nghiệm.

b) Tam thức  $f(x) = -3x^2 + 2\sqrt{3}x - 1$  có  $\Delta' = 0$ , hệ số  $a = -3 < 0$  nên  $f(x)$  luôn âm (cùng dấu với  $a$ ) với mọi  $x \neq \frac{\sqrt{3}}{3}$ , tức là  $-3x^2 + 2\sqrt{3}x - 1 < 0$  với mọi  $x \neq \frac{\sqrt{3}}{3}$ .

Suy ra bất phương trình có nghiệm duy nhất  $x = \frac{\sqrt{3}}{3}$ .

c) Tam thức  $f(x) = -x^2 + 2x + 1$  có  $\Delta' = 2 > 0$  nên  $f(x)$  có hai nghiệm  $x_1 = 1 - \sqrt{2}$  và  $x_2 = 1 + \sqrt{2}$ .

Mặt khác  $a = -1 < 0$ , do đó ta có bảng xét dấu sau:

|        |           |                |                |           |   |
|--------|-----------|----------------|----------------|-----------|---|
| $x$    | $-\infty$ | $1 - \sqrt{2}$ | $1 + \sqrt{2}$ | $+\infty$ |   |
| $f(x)$ | -         | 0              | +              | 0         | - |

Tập nghiệm của bất phương trình là  $S = (1 - \sqrt{2}; 1 + \sqrt{2})$ .

» **Ví dụ 3.** Giải bất phương trình (1), từ đó suy ra lời giải cho bài toán rào vườn ở tình huống mở đầu.

**Giải**

Tam thức bậc hai  $f(x) = 2x^2 - 20x + 48$  có hai nghiệm  $x_1 = 4$ ;  $x_2 = 6$  và hệ số  $a = 2 > 0$ . Từ đó suy ra tập nghiệm của bất phương trình (1) là đoạn  $[4; 6]$ . Như vậy khoảng cách từ điểm cắm cột đến bờ tường phải lớn hơn hoặc bằng 4 m và nhỏ hơn hoặc bằng 6 m thì mảnh đất rào chắn của bác Việt sẽ có diện tích không nhỏ hơn 48 m<sup>2</sup>.

» **Luyện tập 3.** Giải các bất phương trình bậc hai sau:

- a)  $-5x^2 + x - 1 \leq 0$ ;      b)  $x^2 - 8x + 16 \leq 0$ ;      c)  $x^2 - x + 6 > 0$ .

» **Vận dụng.** Độ cao so với mặt đất của một quả bóng được ném lên theo phương thẳng đứng được mô tả bởi hàm số bậc hai  $h(t) = -4,9t^2 + 20t + 1$ , ở đó độ cao  $h(t)$  tính bằng mét và thời gian  $t$  tính bằng giây. Trong khoảng thời điểm nào trong quá trình bay của nó, quả bóng sẽ ở độ cao trên 5 m so với mặt đất?

##### Tìm hiểu thêm

Ta có thể dùng máy tính cầm tay để giải bất phương trình bậc hai. Sau khi mở máy, ta bấm liên tiếp các phím sau đây:

|      |   |   |   |
|------|---|---|---|
| Mode | ↓ | 1 | 1 |
|------|---|---|---|

Sau đó chọn một trong bốn dạng bất phương trình bậc hai rồi nhập các hệ số  $a, b, c$ , từ đó nhận được nghiệm.

Ví dụ để giải bất phương trình:  $2x^2 - 3x - 6 \leq 0$  ta bấm tổ hợp phím

|      |   |   |   |   |   |   |    |   |    |   |   |
|------|---|---|---|---|---|---|----|---|----|---|---|
| Mode | ↓ | 1 | 1 | 4 | 2 | = | -3 | = | -6 | = | = |
|------|---|---|---|---|---|---|----|---|----|---|---|

Màn hình máy tính hiển thị:  $\frac{3 - \sqrt{57}}{4} \leq x \leq \frac{3 + \sqrt{57}}{4}$ .

Tập nghiệm của bất phương trình là  $\left[ \frac{3 - \sqrt{57}}{4}; \frac{3 + \sqrt{57}}{4} \right]$ .

## Bài 18. Phương trình quy về phương trình bậc hai

#### THUẬT NGỮ

Phương trình chứa  
căn thức

#### KIẾN THỨC, KĨ NĂNG

Giải một số phương trình chứa căn bậc hai đơn giản có  
thể quy về phương trình bậc hai.

Trong bài này chúng ta sẽ giải các phương trình chứa căn thức thường gặp có dạng

$$\sqrt{ax^2 + bx + c} = \sqrt{dx^2 + ex + f} \text{ và } \sqrt{ax^2 + bx + c} = dx + e.$$

#### 1. PHƯƠNG TRÌNH DẠNG $\sqrt{ax^2 + bx + c} = \sqrt{dx^2 + ex + f}$

» **HĐ1.** Cho phương trình  $\sqrt{x^2 - 3x + 2} = \sqrt{-x^2 - 2x + 2}$ .

- Bình phương hai vế phương trình để khử căn và giải phương trình bậc hai nhận được.
- Thử lại các giá trị  $x$  tìm được ở câu a có thoả mãn phương trình đã cho hay không.

Để giải phương trình  $\sqrt{ax^2 + bx + c} = \sqrt{dx^2 + ex + f}$ , ta thực hiện như sau:

- Bình phương hai vế và giải phương trình nhận được;
- Thử lại các giá trị  $x$  tìm được ở trên có thoả mãn phương trình đã cho hay không và kết luận nghiệm.

» **Ví dụ 1.** Giải phương trình  $\sqrt{2x^2 - 4x - 2} = \sqrt{x^2 - x - 2}$ .

**Giải**

Bình phương hai vế của phương trình, ta được

$$2x^2 - 4x - 2 = x^2 - x - 2.$$

Sau khi thu gọn ta được  $x^2 - 3x = 0$ . Từ đó  $x = 0$  hoặc  $x = 3$ .

Thay lần lượt hai giá trị này của  $x$  vào phương trình đã cho, ta thấy chỉ có  $x = 3$  thoả mãn.

Vậy nghiệm của phương trình đã cho là  $x = 3$ .

» **Luyện tập 1.** Giải các phương trình sau:

a)  $\sqrt{3x^2 - 6x + 1} = \sqrt{-2x^2 - 9x + 1}$ ;

b)  $\sqrt{2x^2 - 3x - 5} = \sqrt{x^2 - 7}$ .

#### 2. PHƯƠNG TRÌNH DẠNG $\sqrt{ax^2 + bx + c} = dx + e$ .

» **HĐ2.** Cho phương trình  $\sqrt{26x^2 - 63x + 38} = 5x - 6$ .

- Bình phương hai vế và giải phương trình nhận được.
- Thử lại các giá trị  $x$  tìm được ở câu a có thoả mãn phương trình đã cho hay không.

Để giải phương trình  $\sqrt{ax^2 + bx + c} = dx + e$ , ta thực hiện như sau:

- Bình phương hai vế và giải phương trình nhận được;
- Thử lại các giá trị  $x$  tìm được ở trên có thoả mãn phương trình đã cho hay không và kết luận nghiệm.

» **Ví dụ 2.** Giải phương trình  $\sqrt{2x^2 - 5x - 9} = x - 1$ .

**Giải**

Bình phương hai vế của phương trình ta được

$$2x^2 - 5x - 9 = x^2 - 2x + 1.$$

Sau khi thu gọn ta được  $x^2 - 3x - 10 = 0$ . Từ đó  $x = -2$  hoặc  $x = 5$ .

Thay lần lượt hai giá trị này của  $x$  vào phương trình đã cho, ta thấy chỉ có  $x = 5$  thoả mãn.

Vậy nghiệm của phương trình đã cho là  $x = 5$ .

Với  $x = -2$  thì vế phải âm, vế trái không âm. Do đó, ta có thể kết luận  $x = -2$  không là nghiệm của phương trình đã cho mà không cần thử lại.

» **Luyện tập 2.** Giải các phương trình sau:

a)  $\sqrt{2x^2 + x + 3} = 1 - x$ ;

b)  $\sqrt{3x^2 - 13x + 14} = x - 3$ .

» **Vận dụng.** Bác Việt sống và làm việc tại trạm hải đăng cách bờ biển 4 km. Hằng tuần bác chèo thuyền vào vị trí gần nhất trên bờ biển là bến Bính để nhận hàng hoá do cơ quan cung cấp. Tuần này, do trục trặc về vận chuyển nên toàn bộ số hàng vẫn đang nằm ở thôn Hoành, bên bờ biển cách bến Bính 9,25 km và sẽ được anh Nam vận chuyển trên con đường dọc bờ biển tới bến Bính bằng xe kéo. Bác Việt đã gọi điện thống nhất với anh Nam là họ sẽ gặp nhau ở vị trí nào đó giữa bến Bính và thôn Hoành để hai người có mặt tại đó cùng lúc, không mất thời gian chờ nhau. Tìm vị trí hai người dự định gặp nhau, biết rằng vận tốc kéo xe của anh Nam là 5 km/h và thuyền của bác Việt di chuyển với vận tốc 4 km/h. Ngoài ra giả thiết rằng đường bờ biển từ thôn Hoành đến bến Bính là đường thẳng và bác Việt cũng luôn chèo thuyền tới một điểm trên bờ biển theo một đường thẳng.

**Hướng dẫn**

Ta mô hình hoá bài toán như trong Hình 6.20: Trạm hải đăng ở vị trí A; bến Bính ở B và thôn Hoành ở C. Giả sử bác Việt chèo thuyền cập bến ở vị trí M và ta đặt  $BM = x$  ( $x > 0$ ). Để hai người không phải chờ nhau thì thời gian chèo thuyền bằng thời gian kéo xe nên ta có phương trình:

$$\frac{\sqrt{x^2 + 16}}{4} = \frac{9,25 - x}{5}.$$

Giải phương trình này sẽ tìm được vị trí hai người dự định gặp nhau.

Hình 6.20

# CHƯƠNG IX. TÍNH XÁC SUẤT THEO ĐỊNH NGHĨA CỐ ĐIỂN

## Bài 26. Biến cố và định nghĩa cổ điển của xác suất

#### THUẬT NGỮ

- Biến cố đôi
- Định nghĩa cổ điển của xác suất
- Nguyên lí xác suất bé

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết một số khái niệm: Phép thử ngẫu nhiên, không gian mẫu, biến cố là tập con của không gian mẫu, biến cố đôi, định nghĩa cổ điển của xác suất, nguyên lí xác suất bé.
- Mô tả không gian mẫu, biến cố trong một số phép thử đơn giản.
- Mô tả tính chất cơ bản của xác suất.

Khi tham gia một trò chơi bốc thăm trúng thưởng, mỗi người chơi chọn một bộ 6 số đôi một khác nhau từ 45 số: 1; 2; ...; 45, chẳng hạn bạn An chọn bộ số {5; 13; 20; 31; 32; 35}.

Sau đó, người quản trò bốc ngẫu nhiên 6 quả bóng (không hoàn lại) từ một thùng kín đựng 45 quả bóng như nhau ghi các số 1; 2; ... ; 45. Bộ 6 số ghi trên 6 quả bóng đó được gọi là bộ số trúng thưởng.

Nếu bộ số của người chơi trùng với bộ số trúng thưởng thì người chơi trúng giải độc đắc; nếu trùng với 5 số của bộ số trúng thưởng thì người chơi trúng giải nhất.

Tính xác suất bạn An trúng giải độc đắc, giải nhất khi chơi.

Trong bài học này, ta sẽ tìm hiểu một số khái niệm cơ bản và định nghĩa cổ điển của xác suất, từ đó giúp ta có cơ sở trả lời câu hỏi nêu trên.

#### 1. BIẾN CỐ

Ở lớp 9 ta đã biết những khái niệm quan trọng sau:

- **Phép thử ngẫu nhiên** (gọi tắt là phép thử) là một thí nghiệm hay một hành động mà kết quả của nó không thể biết được trước khi phép thử được thực hiện.
- **Không gian mẫu** của phép thử là tập hợp tất cả các kết quả có thể khi thực hiện phép thử. Không gian mẫu của phép thử được kí hiệu là  $\Omega$ .
- **Kết quả thuận lợi** cho một biến cố  $E$  liên quan tới phép thử  $T$  là kết quả của phép thử  $T$  làm cho biến cố đó xảy ra.

**Chú ý.** Ta chỉ xét các phép thử mà không gian mẫu gồm hữu hạn kết quả.

» **Ví dụ 1.** Một tổ trong lớp 10A có ba học sinh nữ là Hương, Hồng, Dung và bốn học sinh nam là Sơn, Tùng, Hoàng, Tiến. Giáo viên chọn ngẫu nhiên một học sinh trong tổ đó để kiểm tra vở bài tập. Phép thử ngẫu nhiên là gì? Mô tả không gian mẫu.

**Giải**

Phép thử ngẫu nhiên là chọn ngẫu nhiên một học sinh trong tổ để kiểm tra vở bài tập.

Không gian mẫu là tập hợp tất cả các học sinh trong tổ.

Ta có  $\Omega = \{\text{Hương; Hồng; Dung; Sơn; Tùng; Hoàng; Tiến}\}$ .

» **HĐ1.** Trở lại Ví dụ 1, xét hai biến cố sau:

A: "Học sinh được gọi là một bạn nữ";

B: "Học sinh được gọi có tên bắt đầu bằng chữ H".

Hãy liệt kê các kết quả thuận lợi cho biến cố A, B.

Theo định nghĩa, ta thấy mỗi kết quả thuận lợi cho biến cố  $E$  chính là một phần tử thuộc không gian mẫu  $\Omega$ . Do đó về mặt toán học, ta có:

Mỗi biến cố là một tập con của không gian mẫu  $\Omega$ . Tập con này là tập tất cả các kết quả thuận lợi cho biến cố đó.

Không gian mẫu  $\Omega$  và biến cố  $E$

**Nhận xét.** Biến cố chắc chắn là tập  $\Omega$ , biến cố không thể là tập  $\emptyset$ .

» **Ví dụ 2.** Trở lại tình huống mở đầu về trò chơi bốc thăm trúng thưởng.

- Phép thử là gì? Mô tả không gian mẫu  $\Omega$ .
- Gọi  $F$  là biến cố: "Bạn An trúng giải độc đắc". Hỏi  $F$  là tập con nào của không gian mẫu?
- Gọi  $G$  là biến cố: "Bạn An trúng giải nhất". Hãy chỉ ra ba phần tử của tập  $G$ . Từ đó, hãy mô tả tập hợp  $G$  bằng cách chỉ ra tính chất đặc trưng cho các phần tử của tập  $G$ .

**Giải**

- Phép thử là chọn ngẫu nhiên 6 số trong 45 số: 1; 2;...; 45. Không gian mẫu  $\Omega$  là tập hợp tất cả các tập con có sáu phần tử của tập  $\{1; 2; \dots; 44; 45\}$ .
- $F = \{5; 13; 20; 31; 32; 35\}$ .

c) Ba phần tử thuộc  $G$  chẳng hạn là:

$\{6; 13; 20; 31; 32; 35\}; \{5; 7; 20; 31; 32; 35\}; \{5; 13; 8; 31; 32; 35\}$ .

$G$  là tập hợp tất cả các tập con gồm sáu phần tử của tập  $\{1; 2; 3; \dots; 45\}$  có tính chất: năm phần tử của nó thuộc tập  $\{5; 13; 20; 31; 32; 35\}$  và một phần tử còn lại không thuộc tập  $\{5; 13; 20; 31; 32; 35\}$ .

» **Luyện tập 1.** Phần thưởng trong một chương trình khuyến mãi của một siêu thị là: ti vi, bàn ghế, tủ lạnh, máy tính, bếp từ, bộ bát đĩa. Ông Dũng tham gia chương trình được chọn ngẫu nhiên một mặt hàng.

a) Mô tả không gian mẫu.

b) Gọi  $D$  là biến cố: "Ông Dũng chọn được mặt hàng là đồ điện". Hỏi  $D$  là tập con nào của không gian mẫu?

» **HĐ2.** Trở lại Ví dụ 1, hãy cho biết khi nào biến cố  $C$ : "Học sinh được gọi là một bạn nam" xảy ra?

Ta thấy biến cố  $C$  xảy ra khi và chỉ khi biến cố  $A$  không xảy ra.

Ta nói biến cố  $C$  là *biến cố đối* của  $A$ .

Biến cố đối của biến cố  $E$  là biến cố " $E$  không xảy ra".

Biến cố đối của  $E$  được kí hiệu là  $\bar{E}$ .

**Nhận xét.** Nếu biến cố  $E$  là tập con của không gian mẫu  $\Omega$  thì biến cố đối  $\bar{E}$  là tập tất cả các phần tử của  $\Omega$  mà không là phần tử của  $E$ . Vậy biến cố  $\bar{E}$  là phần bù của  $E$  trong  $\Omega$ :  $\bar{E} = C_{\Omega}E$ .

» **Ví dụ 3.** Gieo một con xúc xắc 6 mặt và quan sát số chấm xuất hiện trên con xúc xắc.

a) Mô tả không gian mẫu.

b) Gọi  $M$  là biến cố: "Số chấm xuất hiện trên con xúc xắc là một số chẵn". Nội dung biến cố đối  $\bar{M}$  của  $M$  là gì?

c) Biến cố  $M$  và  $\bar{M}$  là tập con nào của không gian mẫu?

**Giải**

a) Không gian mẫu  $\Omega = \{1; 2; 3; 4; 5; 6\}$ .

b) Biến cố đối  $\bar{M}$  của  $M$  là biến cố: "Số chấm xuất hiện trên con xúc xắc là một số lẻ".

c) Ta có  $M = \{2; 4; 6\} \subset \Omega$ ;  $\bar{M} = C_{\Omega}M = \{1; 3; 5\} \subset \Omega$ .

» **Luyện tập 2.** Gieo một con xúc xắc. Gọi  $K$  là biến cố: "Số chấm xuất hiện trên con xúc xắc là một số nguyên tố".

a) Biến cố: "Số chấm xuất hiện trên con xúc xắc là một hợp số" có là biến cố  $\bar{K}$  không?

b) Biến cố  $K$  và  $\bar{K}$  là tập con nào của không gian mẫu?

#### 2. ĐỊNH NGHĨA CỔ ĐIỂN CỦA XÁC SUẤT

Ở lớp 9 ta đã học những kiến thức cơ bản sau:

- Các kết quả có thể của phép thử  $T$  gọi là đồng khả năng nếu chúng có khả năng xuất hiện như nhau.
- Giả sử các kết quả có thể của phép thử  $T$  là đồng khả năng. Khi đó xác suất của biến cố  $E$  bằng tỉ số giữa số kết quả thuận lợi của  $E$  và số kết quả có thể.

» **HĐ3.** Một hộp chứa 12 tấm thẻ được đánh số 1; 2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12. Rút ngẫu nhiên từ hộp đó một tấm thẻ.

- a) Mô tả không gian mẫu  $\Omega$ . Các kết quả có thể có đồng khả năng không?
- b) Xét biến cố  $E$ : "Rút được thẻ ghi số nguyên tố". Biến cố  $E$  là tập con nào của không gian mẫu?
- c) Phép thử có bao nhiêu kết quả có thể? Biến cố  $E$  có bao nhiêu kết quả thuận lợi? Từ đó, hãy tính xác suất của biến cố  $E$ .

Ta đã biết không gian mẫu  $\Omega$  của phép thử  $T$  là tập hợp tất cả các kết quả có thể của  $T$ ; biến cố  $E$  liên quan đến phép thử  $T$  là tập con của  $\Omega$ . Vì thế số kết quả có thể của phép thử  $T$  chính là số phần tử tập  $\Omega$ ; số kết quả thuận lợi của biến cố  $E$  chính là số phần tử của tập  $E$ . Do đó, ta có định nghĩa cổ điển của xác suất như sau:

Cho phép thử  $T$  có không gian mẫu là  $\Omega$ . Giả thiết rằng các kết quả có thể của  $T$  là đồng khả năng. Khi đó nếu  $E$  là một biến cố liên quan đến phép thử  $T$  thì **xác suất** của  $E$  được cho bởi công thức

$$P(E) = \frac{n(E)}{n(\Omega)},$$

trong đó  $n(\Omega)$  và  $n(E)$  tương ứng là số phần tử của tập  $\Omega$  và tập  $E$ .

##### Nhận xét

- Với mỗi biến cố  $E$ , ta có  $0 \leq P(E) \leq 1$ .
- Với biến cố chắc chắn (là tập  $\Omega$ ), ta có  $P(\Omega) = 1$ .
- Với biến cố không thể (là tập  $\emptyset$ ), ta có  $P(\emptyset) = 0$ .

Từ định nghĩa cổ điển của xác suất, hãy chứng minh các nhận xét trên.

» **Ví dụ 4.** Gieo một đồng xu cân đối liên tiếp ba lần. Gọi  $E$  là biến cố: "Có hai lần xuất hiện mặt sấp và một lần xuất hiện mặt ngửa". Tính xác suất của biến cố  $E$ .

###### Giải

Kí hiệu  $S$  và  $N$  tương ứng là đồng xu ra mặt sấp và đồng xu ra mặt ngửa.

Không gian mẫu  $\Omega = \{SSN; SNS; SNN; SSS; NSN; NNS; NNN; NSS\}$ .

$E = \{SSN; SNS; NSS\}$ .

Ta có  $n(\Omega) = 8$ ;  $n(E) = 3$ . Do đồng xu cân đối nên các kết quả có thể là đồng khả năng.

Vậy  $P(E) = \frac{n(E)}{n(\Omega)} = \frac{3}{8}$ .

» **Ví dụ 5.** Hai túi I và II chứa các tấm thẻ được đánh số. Túi I: {1; 2; 3; 4; 5}, túi II: {1; 2; 3; 4}. Rút ngẫu nhiên một tấm thẻ từ mỗi túi I và II. Tính xác suất để tổng hai số trên hai tấm thẻ lớn hơn 6.

**Giải**

Mô tả không gian mẫu  $\Omega$  bằng cách lập bảng như sau.

| Túi I \ Túi II | 1      | 2      | 3      | 4      |
|----------------|--------|--------|--------|--------|
| 1              | (1, 1) | (1, 2) | (1, 3) | (1, 4) |
| 2              | (2, 1) | (2, 2) | (2, 3) | (2, 4) |
| 3              | (3, 1) | (3, 2) | (3, 3) | (3, 4) |
| 4              | (4, 1) | (4, 2) | (4, 3) | (4, 4) |
| 5              | (5, 1) | (5, 2) | (5, 3) | (5, 4) |

Mỗi ô là một kết quả có thể. Có 20 ô, vậy  $n(\Omega) = 20$ .

Biến cố  $E$ : "Tổng hai số trên hai tấm thẻ lớn hơn 6" xảy ra khi tổng là một trong ba trường hợp:

Tổng bằng 7 gồm các kết quả: (3, 4); (4, 3); (5, 2).

Tổng bằng 8 gồm các kết quả: (4, 4); (5, 3).

Tổng bằng 9 có một kết quả: (5, 4).

Vậy biến cố  $E = \{(3, 4); (4, 3); (5, 2); (4, 4); (5, 3); (5, 4)\}$ . Từ đó  $n(E) = 6$  và  $P(E) = \frac{6}{20} = \frac{3}{10} = 0,3$ .

**Chú ý.** Trong những phép thử đơn giản, ta đếm số phần tử của tập  $\Omega$  và số phần tử của biến cố  $E$  bằng cách liệt kê ra tất cả các phần tử của hai tập hợp này.

» **Luyện tập 3.** Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất để tổng số chấm xuất hiện trên hai con xúc xắc bằng 4 hoặc bằng 6.

#### 3. NGUYÊN LÍ XÁC SUẤT BÉ

Qua thực tế người ta thấy rằng một biến cố có xác suất rất bé thì sẽ không xảy ra khi ta thực hiện một phép thử hay một vài phép thử. Từ đó người ta đã thừa nhận nguyên lí sau đây gọi là *nguyên lí xác suất bé*:

Nếu một biến cố có xác suất rất bé thì trong một phép thử biến cố đó sẽ không xảy ra.

Chẳng hạn, xác suất một chiếc máy bay rơi là rất bé, khoảng 0,00000027. Mỗi hành khách khi đi máy bay đều tin rằng biến cố: "Máy bay rơi" sẽ không xảy ra trong chuyến bay của mình, do đó người ta vẫn không ngần ngại đi máy bay.

**Chú ý.** Trong thực tế, xác suất của một biến cố được coi là bé phụ thuộc vào từng trường hợp cụ thể. Chẳng hạn, xác suất một chiếc điện thoại bị lỗi kĩ thuật là 0,001 được coi là rất bé, nhưng nếu xác suất cháy nổ động cơ của một máy bay là 0,001 thì xác suất này không được coi là rất bé.

» **Vận dụng.** Xác suất của biến cố có ý nghĩa thực tế như sau:

Giả sử biến cố  $A$  có xác suất  $P(A)$ . Khi thực hiện phép thử  $n$  lần ( $n \geq 30$ ) thì số lần xuất hiện biến cố  $A$  sẽ xấp xỉ bằng  $n \cdot P(A)$  (nói chung khi  $n$  càng lớn thì sai số tương đối càng bé).

Giả thiết rằng xác suất sinh con trai là 0,512 và xác suất sinh con gái là 0,488. Vận dụng ý nghĩa thực tế của xác suất, hãy ước tính trong số trẻ mới sinh với 10 000 bé gái thì có bao nhiêu bé trai.

*Hướng dẫn.* Gọi  $n$  là số trẻ mới sinh. Ta coi mỗi lần sinh là một phép thử và biến cố liên quan đến phép thử là biến cố: "Sinh con gái". Như vậy ta có  $n$  phép thử. Ước tính  $n$ , từ đó ước tính số bé trai.

## Bài 27. Thực hành tính xác suất theo định nghĩa cổ điển

#### THUẬT NGỮ

Xác suất của biến cố đôi.

#### KIẾN THỨC, KĨ NĂNG

- Tính xác suất trong một số bài toán đơn giản bằng phương pháp tổ hợp.
- Tính xác suất trong một số bài toán đơn giản bằng cách sử dụng sơ đồ hình cây.
- Nắm và vận dụng quy tắc tính xác suất của biến cố đôi.

Trở lại tình huống mở đầu trong Bài 26. Hãy tính xác suất trúng giải độc đắc, trúng giải nhất của bạn An khi chọn bộ số {5; 13; 20; 31; 32; 35}.

#### 1. SỬ DỤNG PHƯƠNG PHÁP TỔ HỢP

**HĐ1.** Theo định nghĩa cổ điển của xác suất, để tính xác suất của biến cố  $F$ : "Bạn An trúng giải độc đắc" và biến cố  $G$ : "Bạn An trúng giải nhất" ta cần xác định  $n(\Omega)$ ,  $n(F)$  và  $n(G)$ . Liệu có thể tính  $n(\Omega)$ ,  $n(F)$  và  $n(G)$  bằng cách liệt kê ra hết các phần tử của  $\Omega$ ,  $F$  và  $G$  rồi kiểm đếm được không?

Trong nhiều bài toán, để tính số phần tử của không gian mẫu, của các biến cố, ta thường sử dụng các quy tắc đếm, các công thức tính số hoán vị, chỉnh hợp và tổ hợp.

Đôi khi người ta gọi Đại số tổ hợp là "sự kiểm đếm không cần phải liệt kê".

**Ví dụ 1.** Một tổ trong lớp 10A có 10 học sinh trong đó có 6 học sinh nam và 4 học sinh nữ. Giáo viên chọn ngẫu nhiên 6 học sinh trong tổ đó để tham gia đội tình nguyện Mùa hè xanh. Tính xác suất của hai biến cố sau:

$C$ : "6 học sinh được chọn đều là nam";

$D$ : "Trong 6 học sinh được chọn có 4 nam và 2 nữ".

**Giải**

Không gian mẫu là tập tất cả các tập con gồm 6 học sinh trong 10 học sinh. Vậy

$$n(\Omega) = C_{10}^6 = 210.$$

a) Tập  $C$  chỉ có một phần tử là tập 6 học sinh nam. Vậy  $n(C) = 1$ , do đó  $P(C) = \frac{1}{210}$ .

b) Mỗi phần tử của  $D$  được hình thành từ hai công đoạn.

**Công đoạn 1.** Chọn 4 học sinh nam từ 6 học sinh nam, có  $C_6^4 = 15$  (cách chọn).

**Công đoạn 2.** Chọn 2 học sinh nữ từ 4 học sinh nữ, có  $C_4^2 = 6$  (cách chọn).

Theo quy tắc nhân, tập  $D$  có  $15 \cdot 6 = 90$  (phần tử). Vậy  $n(D) = 90$ . Từ đó  $P(D) = \frac{90}{210} = \frac{3}{7}$ .

» **Luyện tập 1.** Một tổ trong lớp 10B có 12 học sinh, trong đó có 7 học sinh nam và 5 học sinh nữ. Giáo viên chọn ngẫu nhiên 6 học sinh trong tổ để kiểm tra vở bài tập Toán. Tính xác suất để trong 6 học sinh được chọn số học sinh nữ bằng số học sinh nam.

#### 2. SỬ DỤNG SƠ ĐỒ HÌNH CÂY

» **HĐ2.** Trong trò chơi "Vòng quay may mắn", người chơi sẽ quay hai bánh xe. Mũi tên ở bánh xe thứ nhất có thể dừng ở một trong hai vị trí: Loại xe 50 cc và Loại xe 110 cc. Mũi tên ở bánh xe thứ hai có thể dừng ở một trong bốn vị trí: màu đen, màu trắng, màu đỏ và màu xanh. Vị trí của mũi tên trên hai bánh xe sẽ xác định người chơi nhận được loại xe nào, màu gì.

Phép thử  $T$  là quay hai bánh xe. Hãy vẽ sơ đồ hình cây mô tả các phần tử của không gian mẫu.

Trong một số bài toán, phép thử  $T$  được hình thành từ một vài phép thử, chẳng hạn: gieo xúc xắc liên tiếp bốn lần; lấy ba viên bi, mỗi viên từ một hộp;... Khi đó ta sử dụng sơ đồ hình cây để có thể mô tả đầy đủ, trực quan không gian mẫu và biến cố cần tính xác suất.

» **Ví dụ 2.** Có ba chiếc hộp. Hộp I có chứa ba viên bi: 1 viên màu đỏ, 1 viên màu xanh và 1 viên màu vàng. Hộp II chứa hai viên bi: 1 viên màu xanh và 1 viên màu vàng. Hộp III chứa hai viên bi: 1 viên màu đỏ và 1 viên màu xanh. Từ mỗi hộp ta lấy ngẫu nhiên một viên bi.

- Vẽ sơ đồ hình cây để mô tả các phần tử của không gian mẫu.
- Tính xác suất để trong ba viên bi lấy ra có đúng một viên bi màu xanh.

**Giải**

- Kí hiệu Đ, X, V tương ứng là viên bi màu đỏ, màu xanh và màu vàng.

Đường đi màu đỏ ứng với kết quả có thể ĐXĐ.

Các kết quả có thể là: ĐXĐ, ĐXX, ĐVĐ, ĐVX, XXĐ, XXX, XVĐ, XVX, VXĐ, VXX, VVĐ, VVX. Do đó  $\Omega = \{\text{ĐXĐ; ĐXX; ĐVĐ; ĐVX; XXĐ; XXX; XVĐ; XVX; VXĐ; VXX; VVĐ; VVX}\}$ .  
 Vậy  $n(\Omega) = 12$ .

b) Gọi  $K$  là biến cố: "Trong ba viên bi lấy ra có đúng một viên bi màu xanh". Ta có

$K = \{\text{ĐXĐĐ; ĐVXĐ; XVĐĐ; VXĐĐ; VVX}\}$ . Vậy  $n(K) = 5$ . Từ đó

$$P(K) = \frac{n(K)}{n(\Omega)} = \frac{5}{12}.$$

» **Luyện tập 2.** Trở lại trò chơi "Vòng quay may mắn" ở HĐ2. Tính xác suất để người chơi nhận được loại xe 110 cc có màu trắng hoặc màu xanh.

» **Luyện tập 3.** Trong một cuộc tổng điều tra dân số, điều tra viên chọn ngẫu nhiên một gia đình có ba người con và quan tâm giới tính của ba người con này.

- Vẽ sơ đồ hình cây để mô tả các phần tử của không gian mẫu.
- Giả thiết rằng khả năng sinh con trai và khả năng sinh con gái là như nhau. Tính xác suất để gia đình đó có một con trai và hai con gái.

#### 3. XÁC SUẤT CỦA BIẾN CỐ ĐỔI

» **HĐ3.** Cho  $E$  là một biến cố và  $\Omega$  là không gian mẫu. Tính  $n(\overline{E})$  theo  $n(\Omega)$  và  $n(E)$ .

Ta có công thức sau đây liên hệ giữa xác suất của một biến cố với xác suất của biến cố đối.

Cho  $E$  là một biến cố. Xác suất của biến cố  $\overline{E}$  liên hệ với xác suất của  $E$  bởi công thức sau:

$$P(\overline{E}) = 1 - P(E).$$

» **Ví dụ 3.** Chọn ngẫu nhiên hai số từ tập  $\{1; 2; \dots; 9\}$ . Gọi  $H$  là biến cố: "Trong hai số được chọn có ít nhất một số chẵn".

- Mô tả không gian mẫu.
- Biến cố  $\overline{H}$  là tập con nào của không gian mẫu?
- Tính  $P(\overline{H})$  và  $P(H)$ .

**Giải**

- Không gian mẫu là tập tất cả các tập con có 2 phần tử của tập  $\{1; 2; \dots; 8; 9\}$ .
- Biến cố  $\overline{H}$ : "Cả hai số được chọn đều là số lẻ". Khi đó  $\overline{H}$  là tập tất cả các tập con có 2 phần tử của tập số lẻ  $\{1; 3; 5; 7; 9\}$ .

- Ta có  $n(\Omega) = C_9^2 = 36$ ,  $n(\overline{H}) = C_5^2 = 10$ . Vậy  $P(\overline{H}) = \frac{10}{36} = \frac{5}{18}$ .

Từ đó  $P(H) = 1 - P(\overline{H}) = 1 - \frac{5}{18} = \frac{13}{18}$ .

**Chú ý.** Trong một số bài toán, nếu tính trực tiếp xác suất của biến cố gặp khó khăn, ta có thể tính gián tiếp bằng cách tính xác suất của biến cố đối của nó.

» **Luyện tập 4.** Có ba hộp A, B, C. Hộp A có chứa ba thẻ mang số 1, số 2 và số 3. Hộp B chứa hai thẻ mang số 2 và số 3. Hộp C chứa hai thẻ mang số 1 và số 2. Từ mỗi hộp ta rút ra ngẫu nhiên một thẻ.

a) Vẽ sơ đồ hình cây để mô tả các phần tử của không gian mẫu.

b) Gọi  $M$  là biến cố: "Trong ba thẻ rút ra có ít nhất một thẻ số 1". Biến cố  $\overline{M}$  là tập con nào của không gian mẫu?

c) Tính  $P(M)$  và  $P(\overline{M})$ .

» **Vận dụng.** Giải bài toán trong tình huống mở đầu.

*Hướng dẫn.* Vì  $\Omega$  là tập tất cả các tập con có 6 phần tử của tập  $\{1; 2; \dots; 44; 45\}$  nên

$$n(\Omega) = C_{45}^6.$$

Gọi  $F$  là biến cố: "Bạn An trúng giải độc đắc".  $F$  là tập hợp có duy nhất một phần tử là tập  $\{5; 13; 20; 31; 32; 35\}$ . Vậy  $n(F) = 1$ . Từ đó tính được  $P(F)$ .

Gọi  $G$  là biến cố: "Bạn An trúng giải nhất".  $G$  là tập hợp tấp cả các tập con gồm sáu phần tử của tập  $\{1; 2; 3; \dots; 45\}$  có tính chất:

1. Năm phần tử của  $G$  thuộc tập  $\{5; 13; 20; 31; 32; 35\}$ .

2. Một phần tử còn lại của  $G$  không thuộc tập  $\{5; 13; 20; 31; 32; 35\}$ .

Mỗi phần tử của  $G$  được hình thành từ hai công đoạn.

*Công đoạn 1.* Chọn năm phần tử trong tập  $\{5; 13; 20; 31; 32; 35\}$ , có  $C_6^5 = 6$  (cách chọn).

*Công đoạn 2.* Chọn một phần tử còn lại trong 39 phần tử không thuộc tập  $\{5; 13; 20; 31; 32; 35\}$ , có  $C_{39}^1 = 39$  (cách chọn).

Theo quy tắc nhân, tập  $G$  có  $6 \cdot 39 = 234$  (phần tử). Vậy  $n(G) = 234$ . Từ đó tính được  $P(G)$ .

# CHƯƠNG VII. PHƯƠNG PHÁP TOẠ ĐỘ TRONG MẶT PHẪNG

## Bài 19. Phương trình đường thẳng

#### THUẬT NGỮ

- Vectơ chỉ phương
- Vectơ pháp tuyến
- Phương trình tổng quát
- Phương trình tham số

#### KIẾN THỨC, KĨ NĂNG

- Mô tả phương trình tổng quát và phương trình tham số của đường thẳng.
- Lập phương trình của đường thẳng khi biết một điểm và một vectơ pháp tuyến hoặc một điểm và một vectơ chỉ phương hoặc hai điểm.
- Giải thích mối liên hệ giữa đồ thị hàm bậc nhất và đường thẳng.
- Vận dụng kiến thức về phương trình đường thẳng để giải một số bài toán có liên quan đến thực tiễn.

Đường thẳng là một tập hợp điểm, được xác định bởi tính chất đặc trưng của các điểm thuộc đường thẳng đó. Do vậy, ta có thể đại số hoá đường thẳng bằng cách thể hiện tính chất đặc trưng đó bởi điều kiện đại số đối với toạ độ của các điểm tương ứng.

#### 1. PHƯƠNG TRÌNH TỔNG QUÁT CỦA ĐƯỜNG THẲNG

» **HĐ1.** Cho vectơ  $\vec{n} \neq \vec{0}$  và điểm A. Tìm tập hợp những điểm M sao cho  $\overline{AM}$  vuông góc với  $\vec{n}$ .

Hình 7.1a

Vectơ  $\vec{n}$  khác  $\vec{0}$  được gọi là **vectơ pháp tuyến** của đường thẳng  $\Delta$  nếu giá của nó vuông góc với  $\Delta$ .

Hình 7.1b

##### Nhận xét

- Nếu  $\vec{n}$  là vectơ pháp tuyến của đường thẳng  $\Delta$  thì  $k\vec{n}$  ( $k \neq 0$ ) cũng là vectơ pháp tuyến của  $\Delta$ .
- Đường thẳng hoàn toàn xác định nếu biết một điểm và một vectơ pháp tuyến của nó.

» **Ví dụ 1.** Trong mặt phẳng toạ độ, cho tam giác có ba đỉnh là  $A(3; 1)$ ,  $B(4; 0)$ ,  $C(5; 3)$ . Hãy chỉ ra một vectơ pháp tuyến của đường trung trực của đoạn thẳng AB và một vectơ pháp tuyến của đường cao kẻ từ A của tam giác ABC.

###### Giải

Đường trung trực của đoạn thẳng AB vuông góc với AB nên có vectơ pháp tuyến  $\overline{AB}(1; -1)$ . Đường cao kẻ từ A của tam giác ABC vuông góc với BC nên có vectơ pháp tuyến  $\overline{BC}(1; 3)$ .

» **HĐ2.** Trong mặt phẳng toạ độ, cho đường thẳng  $\Delta$  đi qua điểm  $A(x_0; y_0)$  và có vectơ pháp tuyến  $\vec{n}(a; b)$ . Chứng minh rằng điểm  $M(x; y)$  thuộc  $\Delta$  khi và chỉ khi

$$a(x - x_0) + b(y - y_0) = 0. \quad (1)$$

##### Nhận xét

Trong HĐ2, nếu đặt  $c = -ax_0 - by_0$  thì (1) còn được viết dưới dạng  $ax + by + c = 0$  và được gọi là **phương trình tổng quát** của  $\Delta$ . Như vậy, điểm  $M(x; y)$  thuộc đường thẳng  $\Delta$  khi và chỉ khi toạ độ của nó thoả mãn phương trình tổng quát của  $\Delta$ .

Trong mặt phẳng toạ độ, mọi đường thẳng đều có **phương trình tổng quát** dạng  $ax + by + c = 0$ , với  $a$  và  $b$  không đồng thời bằng 0. Ngược lại, mỗi phương trình dạng  $ax + by + c = 0$ , với  $a$  và  $b$  không đồng thời bằng 0, đều là phương trình của một đường thẳng, nhận  $\vec{n}(a; b)$  là một vectơ pháp tuyến.

» **Ví dụ 2.** Trong mặt phẳng toạ độ, lập phương trình tổng quát của đường thẳng  $\Delta$  đi qua điểm  $A(2; 1)$  và nhận  $\vec{n}(3; 4)$  là một vectơ pháp tuyến.

###### Giải

Đường thẳng  $\Delta$  có phương trình là  $3(x - 2) + 4(y - 1) = 0$  hay  $3x + 4y - 10 = 0$ .

» **Luyện tập 1.** Trong mặt phẳng toạ độ, cho tam giác có ba đỉnh  $A(-1; 5)$ ,  $B(2; 3)$ ,  $C(6; 1)$ . Lập phương trình tổng quát của đường cao kẻ từ  $A$  của tam giác  $ABC$ .

» **Ví dụ 3.** Trong mặt phẳng toạ độ, lập phương trình đường thẳng  $\Delta$  đi qua điểm  $A(0; b)$  và có vectơ pháp tuyến  $\vec{n}(a; -1)$ , với  $a, b$  là các số cho trước. Đường thẳng  $\Delta$  có mối liên hệ gì với đồ thị của hàm số  $y = ax + b$ .

**Giải**

Đường thẳng  $\Delta$  có phương trình là  $a(x - 0) - 1(y - b) = 0$  hay  $ax - y + b = 0$ .

Đường thẳng  $\Delta$  là tập hợp những điểm  $M(x; y)$  thoả mãn  $ax - y + b = 0$  (hay là,  $y = ax + b$ ).

Do đó, đồ thị của hàm số  $y = ax + b$  chính là đường thẳng  $\Delta$ :  $ax - y + b = 0$ .

» **Luyện tập 2.** Hãy chỉ ra một vectơ pháp tuyến của đường thẳng  $\Delta: y = 3x + 4$ .

**Nhận xét.** Trong mặt phẳng toạ độ, cho đường thẳng  $\Delta: ax + by + c = 0$ .

- Nếu  $b = 0$  thì phương trình  $\Delta$  có thể đưa về dạng  $x = m$  (với  $m = -\frac{c}{a}$ ) và  $\Delta$  vuông góc với  $Ox$ .
- Nếu  $b \neq 0$  thì phương trình  $\Delta$  có thể đưa về dạng  $y = nx + p$  (với  $n = -\frac{a}{b}, p = -\frac{c}{b}$ ).

#### 2. PHƯƠNG TRÌNH THAM SÔ CỦA ĐƯỜNG THẚNG

» **HĐ 3.** Trong Hình 7.2a, nếu một vật thể chuyển động với vectơ vận tốc bằng  $\vec{v}$  và đi qua  $A$  thì nó di chuyển trên đường nào?

Vectơ  $\vec{u}$  khác  $\vec{0}$  được gọi là **vectơ chỉ phương** của đường thẳng  $\Delta$  nếu giá của nó song song hoặc trùng với  $\Delta$ .

**Nhận xét**

- Nếu  $\vec{u}$  là vectơ chỉ phương của đường thẳng  $\Delta$  thì  $k\vec{u}$  ( $k \neq 0$ ) cũng là vectơ chỉ phương của  $\Delta$ .
- Đường thẳng hoàn toàn xác định nếu biết một điểm và một vectơ chỉ phương của nó.
- Hai vectơ  $\vec{n}(a; b)$  và  $\vec{u}(-b; a)$  vuông góc với nhau nên nếu  $\vec{n}$  là vectơ pháp tuyến của đường thẳng  $\Delta$  thì  $\vec{u}$  là vectơ chỉ phương của đường thẳng đó và ngược lại.

Hình 7.2a

Hình 7.2b

» **Ví dụ 4.** Trong mặt phẳng toạ độ, cho  $A(3; 2)$ ,  $B(1; -4)$ . Hãy chỉ ra hai vectơ chỉ phương của đường thẳng  $AB$ .

**Giải**

Đường thẳng  $AB$  nhận  $\vec{AB}(-2; -6)$  là một vectơ chỉ phương.

Lấy  $\vec{u} = -\frac{1}{2}\vec{AB} = (1; 3)$ , khi đó  $\vec{u}$  cũng là một vectơ chỉ phương của đường thẳng  $AB$ .

» **Luyện tập 3.** Hãy chỉ ra một vectơ chỉ phương của đường thẳng  $\Delta : 2x - y + 1 = 0$ .

» **HĐ 4.** Chuyển động của một vật thể được thể hiện trên mặt phẳng  $Oxy$ . Vật thể khởi hành từ  $A(2; 1)$  và chuyển động thẳng đều với vectơ vận tốc là  $\vec{v}(3; 4)$ .

- a) Hỏi vật thể chuyển động trên đường thẳng nào (chỉ ra điểm đi qua và vectơ chỉ phương của đường thẳng đó)?  
b) Chứng minh rằng, tại thời điểm  $t$  ( $t > 0$ ) tính từ khi khởi hành, vật thể ở vị trí có tọa độ là  $(2 + 3t; 1 + 4t)$ .

Cho đường thẳng  $\Delta$  đi qua điểm  $A(x_0; y_0)$  và có vectơ chỉ phương  $\vec{u}(a; b)$ . Khi đó điểm  $M(x; y)$  thuộc đường thẳng  $\Delta$  khi và chỉ khi tồn tại số thực  $t$  sao cho  $\vec{AM} = t\vec{u}$ , hay

$$\begin{cases} x = x_0 + at \\ y = y_0 + bt. \end{cases} \quad (2)$$

Hệ (2) được gọi là **phương trình tham số** của đường thẳng  $\Delta$  ( $t$  là tham số).

» **Ví dụ 5.** Lập phương trình tham số của đường thẳng  $\Delta$  đi qua điểm  $A(2; -3)$  và có vectơ chỉ phương  $\vec{u}(4; -1)$ .

**Giải**

Phương trình tham số của đường thẳng  $\Delta$  là

$$\begin{cases} x = 2 + 4t \\ y = -3 - t. \end{cases}$$

» **Luyện tập 4.** Lập phương trình tham số của đường thẳng  $\Delta$  đi qua điểm  $M(-1; 2)$  và song song với đường thẳng  $d : 3x - 4y - 1 = 0$ .

» **Ví dụ 6.** Lập phương trình tham số của đường thẳng đi qua hai điểm  $A(2; 3)$  và  $B(1; 5)$ .

**Giải**

Đường thẳng  $AB$  đi qua  $A(2; 3)$  và có vectơ chỉ phương  $\vec{AB} = (-1; 2)$ , do đó có phương trình

tham số là 
$$\begin{cases} x = 2 - t \\ y = 3 + 2t. \end{cases}$$

» **Luyện tập 5.** Lập phương trình tham số và phương trình tổng quát của đường thẳng đi qua hai điểm phân biệt  $A(x_1; y_1)$ ,  $B(x_2; y_2)$  cho trước.

» **Vận dụng.** Việc quy đổi nhiệt độ giữa đơn vị độ C (Anders Celsius, 1 701 – 1 744) và đơn vị độ F (Daniel Fahrenheit, 1 686 – 1 736) được xác định bởi hai mốc sau:

Nước đóng băng ở  $0^{\circ}\text{C}$ ,  $32^{\circ}\text{F}$ ;

Nước sôi ở  $100^{\circ}\text{C}$ ,  $212^{\circ}\text{F}$ .

Trong quy đổi đó, nếu  $a^{\circ}\text{C}$  tương ứng với  $b^{\circ}\text{F}$  thì trên mặt phẳng tọa độ  $Oxy$ , điểm  $M(a; b)$  thuộc đường thẳng đi qua  $A(0; 32)$  và  $B(100; 212)$ .

Hỏi  $0^{\circ}\text{F}$ ,  $100^{\circ}\text{F}$  tương ứng với bao nhiêu độ C?

Nhiệt kế dùng hai đơn vị đo là độ F và độ C

## Bài 20. Đường thẳng trong mặt phẳng toạ độ

#### **THUẬT NGỮ**

- Góc, khoảng cách
- Vị trí tương đối giữa hai đường thng

#### **KIẾN THỨC, KĨ NĂNG**

- Nhận biết hai đường thng cắt nhau, song song, trùng nhau, vuông góc.
- Thiết lập công thức tính góc giữa hai đường thng.
- Tính khoảng cách từ một điểm đến một đường thng.
- Vận dụng các công thức tính góc và khoảng cách để giải một số bài toán có liên quan đến thực tiễn.

Trong mặt phẳng toạ độ, mỗi đường thng đều có đối tượng đại số tương ứng, gọi là phương trình của nó. Vậy các yếu tố liên quan tới đường thng được thể hiện như thế nào qua phương trình tương ứng?

#### **1. VỊ TRÍ TƯƠNG ĐỐI GIỮA HAI ĐƯỜNG THẦG**

**HĐ1.** Trong mặt phẳng toạ độ, cho hai đường thng

$$\Delta_1 : x - 2y + 3 = 0,$$

$$\Delta_2 : 3x - y - 1 = 0.$$

a) Điểm  $M(1; 2)$  có thuộc cả hai đường thng nói trên hay không?

b) Giải hệ 
$$\begin{cases} x - 2y + 3 = 0 \\ 3x - y - 1 = 0. \end{cases}$$

c) Chỉ ra mối quan hệ giữa toạ độ giao điểm của  $\Delta_1$  và  $\Delta_2$  với nghiệm của hệ phương trình trên.

**Nhận xét .** Mỗi đường thng trong mặt phẳng toạ độ là tập hợp những điểm có toạ độ thoả mãn phương trình của đường thng đó. Vì vậy, bài toán tìm giao điểm của hai đường thng được quy về bài toán giải hệ gồm hai phương trình tương ứng.

Trên mặt phẳng toạ độ, xét hai đường thng

$$\Delta_1 : a_1x + b_1y + c_1 = 0 \text{ và } \Delta_2 : a_2x + b_2y + c_2 = 0.$$

Khi đó, toạ độ giao điểm của  $\Delta_1$  và  $\Delta_2$  là nghiệm của hệ phương trình:

$$\begin{cases} a_1x + b_1y + c_1 = 0 \\ a_2x + b_2y + c_2 = 0. \end{cases} \quad (*)$$

$\Delta_1$  cắt  $\Delta_2$  tại  $M(x_0; y_0) \Leftrightarrow$  hệ (\*) có nghiệm duy nhất  $(x_0; y_0)$ .

$\Delta_1$  song song với  $\Delta_2 \Leftrightarrow$  hệ (\*) vô nghiệm.

$\Delta_1$  trùng  $\Delta_2 \Leftrightarrow$  hệ (\*) có vô số nghiệm.

##### **Chú ý**

Hình 7.5

Dựa vào các vectơ chỉ phương  $\vec{u}_1, \vec{u}_2$  hoặc các vectơ pháp tuyến  $\vec{n}_1, \vec{n}_2$  của  $\Delta_1, \Delta_2$ , ta có:

- $\Delta_1$  và  $\Delta_2$  song song hoặc trùng nhau  $\Leftrightarrow \vec{u}_1$  và  $\vec{u}_2$  cùng phương  $\Leftrightarrow \vec{n}_1$  và  $\vec{n}_2$  cùng phương.
- $\Delta_1$  và  $\Delta_2$  cắt nhau  $\Leftrightarrow \vec{u}_1$  và  $\vec{u}_2$  không cùng phương  $\Leftrightarrow \vec{n}_1$  và  $\vec{n}_2$  không cùng phương.

» **Ví dụ 1.** Xét vị trí tương đối giữa đường thẳng  $\Delta : x - \sqrt{2}y + 4\sqrt{3} = 0$  và mỗi đường thẳng sau:

$$\Delta_1 : \sqrt{3}x - \sqrt{6}y + 12 = 0;$$

$$\Delta_2 : \sqrt{2}x - 2y = 0.$$

**Giải**

$$\text{Vì } x - \sqrt{2}y + 4\sqrt{3} = 0 \Leftrightarrow \sqrt{3}(x - \sqrt{2}y + 4\sqrt{3}) = 0$$

$$\Leftrightarrow \sqrt{3}x - \sqrt{6}y + 12 = 0.$$

Vậy  $\Delta$  và  $\Delta_1$  là một, tức là chúng trùng nhau.

Hai đường thẳng  $\Delta$  và  $\Delta_2$  có hai vectơ pháp tuyến  $\vec{n}(1; -\sqrt{2})$  và  $\vec{n}_2(\sqrt{2}; -2)$  cùng phương. Do đó, chúng song song hoặc trùng nhau. Mặt khác, điểm  $O(0; 0)$  thuộc đường thẳng  $\Delta_2$  nhưng không thuộc đường thẳng  $\Delta$ , nên hai đường thẳng này không trùng nhau.

Vậy  $\Delta$  và  $\Delta_2$  song song với nhau.

**Nhận xét.** Giả sử hai đường thẳng  $\Delta_1, \Delta_2$  có hai vectơ chỉ phương  $\vec{u}_1, \vec{u}_2$  (hay hai vectơ pháp tuyến  $\vec{n}_1, \vec{n}_2$ ) cùng phương. Khi đó:

- Nếu  $\Delta_1$  và  $\Delta_2$  có điểm chung thì  $\Delta_1$  trùng  $\Delta_2$ .
- Nếu tồn tại điểm thuộc  $\Delta_1$  nhưng không thuộc  $\Delta_2$  thì  $\Delta_1$  song song với  $\Delta_2$ .

» **Luyện tập 1.** Xét vị trí tương đối giữa các cặp đường thẳng sau:

a)  $\Delta_1 : x + 4y - 3 = 0$  và  $\Delta_2 : x - 4y - 3 = 0;$

b)  $\Delta_1 : x + 2y - \sqrt{5} = 0$  và  $\Delta_2 : 2x + 4y - 3\sqrt{5} = 0.$

#### 2. GÓC GIỮA HAI ĐƯỜNG THằNG

» **HĐ2.** Hai đường thẳng  $\Delta_1$  và  $\Delta_2$  cắt nhau tạo thành bốn góc (H.7.6). Các số đo của bốn góc đó có mối quan hệ gì với nhau?

Hình 7.6

Hai đường thẳng cắt nhau tạo thành bốn góc, số đo của góc không tù được gọi là số đo góc (hay đơn giản là góc) giữa hai đường thẳng.

Góc giữa hai đường thẳng song song hoặc trùng nhau được quy ước bằng  $0^\circ$ .

**HĐ3.** Cho hai đường thẳng cắt nhau  $\Delta_1, \Delta_2$  tương ứng có các vectơ pháp tuyến  $\vec{n}_1, \vec{n}_2$ . Gọi  $\varphi$  là góc giữa hai đường thẳng đó (H.7.7). Nêu mối quan hệ giữa:

a) góc  $\varphi$  và góc  $(\vec{n}_1, \vec{n}_2)$ ;

b)  $\cos \varphi$  và  $\cos(\vec{n}_1, \vec{n}_2)$ .

Hình 7.7

Cho hai đường thẳng

$$\Delta_1: a_1x + b_1y + c_1 = 0 \text{ và } \Delta_2: a_2x + b_2y + c_2 = 0,$$

với các vectơ pháp tuyến  $\vec{n}_1(a_1; b_1)$  và  $\vec{n}_2(a_2; b_2)$  tương ứng. Khi đó, góc  $\varphi$  giữa hai đường thẳng đó được xác định thông qua công thức

$$\cos \varphi = \left| \cos(\vec{n}_1, \vec{n}_2) \right| = \frac{|\vec{n}_1 \cdot \vec{n}_2|}{|\vec{n}_1| \cdot |\vec{n}_2|} = \frac{|a_1a_2 + b_1b_2|}{\sqrt{a_1^2 + b_1^2} \cdot \sqrt{a_2^2 + b_2^2}}.$$

**Chú ý**

- $\Delta_1 \perp \Delta_2 \Leftrightarrow \vec{n}_1 \perp \vec{n}_2 \Leftrightarrow a_1a_2 + b_1b_2 = 0$ .
- Nếu  $\Delta_1, \Delta_2$  có các vectơ chỉ phương  $\vec{u}_1, \vec{u}_2$  thì góc  $\varphi$  giữa  $\Delta_1$  và  $\Delta_2$  cũng được xác định thông qua công thức  $\cos \varphi = \left| \cos(\vec{u}_1, \vec{u}_2) \right|$ .

**Ví dụ 2.** Tính góc giữa hai đường thẳng

$$\Delta_1: \sqrt{3}x - y + 2 = 0 \text{ và } \Delta_2: x - \sqrt{3}y - 2 = 0.$$

**Giải**

Vectơ pháp tuyến của  $\Delta_1$  là  $\vec{n}_1 = (\sqrt{3}; -1)$ , của  $\Delta_2$  là  $\vec{n}_2 = (1; -\sqrt{3})$ .

Gọi  $\varphi$  là góc giữa hai đường thẳng  $\Delta_1$  và  $\Delta_2$ . Ta có

$$\cos \varphi = \left| \cos(\vec{n}_1, \vec{n}_2) \right| = \frac{|\vec{n}_1 \cdot \vec{n}_2|}{|\vec{n}_1| \cdot |\vec{n}_2|} = \frac{|\sqrt{3} \cdot 1 + (-1) \cdot (-\sqrt{3})|}{\sqrt{(\sqrt{3})^2 + (-1)^2} \cdot \sqrt{1^2 + (-\sqrt{3})^2}} = \frac{\sqrt{3}}{2}.$$

Do đó, góc giữa  $\Delta_1$  và  $\Delta_2$  là  $\varphi = 30^\circ$ .

##### » **Luyện tập 2.** Tính góc giữa hai đường thẳng

$$\Delta_1: x + 3y + 2 = 0 \text{ và } \Delta_2: y = 3x + 1.$$

##### » **Ví dụ 3.** Tính góc giữa hai đường thẳng $\Delta_1: x = 3$ và $\Delta_2: \begin{cases} x = 2 - t \\ y = 3 + t. \end{cases}$

**Giải**

Đường thẳng  $\Delta_1$  có phương trình  $x - 3 = 0$  nên có vectơ pháp tuyến  $\vec{n}_1(1; 0)$ . Đường thẳng  $\Delta_2$  có vectơ chỉ phương  $\vec{u}_2(-1; 1)$  nên có vectơ pháp tuyến  $\vec{n}_2(1; 1)$ . Gọi  $\varphi$  là góc giữa hai đường thẳng  $\Delta_1$  và  $\Delta_2$ . Ta có

$$\cos\varphi = \left| \cos(\vec{n}_1, \vec{n}_2) \right| = \frac{|\vec{n}_1 \cdot \vec{n}_2|}{|\vec{n}_1| \cdot |\vec{n}_2|} = \frac{|1 \cdot 1 + 0 \cdot 1|}{\sqrt{1^2 + 0^2} \cdot \sqrt{1^2 + 1^2}} = \frac{1}{\sqrt{2}}.$$

Do đó, góc giữa  $\Delta_1$  và  $\Delta_2$  là  $\varphi = 45^\circ$ .

##### » **Luyện tập 3.** Tính góc giữa hai đường thẳng $\Delta_1: \begin{cases} x = 2 + t \\ y = 1 - 2t \end{cases}$ và $\Delta_2: \begin{cases} x = 1 + t \\ y = 5 + 3t. \end{cases}$

Xét đường thẳng  $\Delta$  bất kì cắt trục hoành  $Ox$  tại một điểm  $A$ . Điểm  $A$  chia đường thẳng  $\Delta$  thành hai tia, trong đó, gọi  $Az$  là tia nằm phía trên trục hoành. Kí hiệu  $\alpha_\Delta$  là số đo của góc  $\widehat{xAz}$  (H.7.8). Thực hành luyện tập sau đây, ta sẽ thấy ý nghĩa hình học của hệ số góc.

##### » **Luyện tập 4.** Cho đường thẳng $\Delta: y = ax + b$ , với $a \neq 0$ .

- Chứng minh rằng  $\Delta$  cắt trục hoành.
- Lập phương trình đường thẳng  $\Delta_0$  đi qua  $O(0; 0)$  và song song (hoặc trùng) với  $\Delta$ .
- Hãy chỉ ra mối quan hệ giữa  $\alpha_\Delta$  và  $\alpha_{\Delta_0}$ .
- Gọi  $M$  là giao điểm của  $\Delta_0$  với nửa đường tròn đơn vị và  $x_0$  là hoành độ của  $M$ . Tính tung độ của  $M$  theo  $x_0$  và  $a$ . Từ đó, chứng minh rằng  $\tan\alpha_\Delta = a$ .

Hình 7.8

#### 3. KHOẢNG CÁCH TỪ MỘT ĐIỂM ĐẾN MỘT ĐƯỜNG THẲG

» **HĐ 4.** Cho điểm  $M(x_0; y_0)$  và đường thẳng  $\Delta: ax + by + c = 0$  có vectơ pháp tuyến  $\vec{n}(a; b)$ . Gọi  $H$  là hình chiếu vuông góc của  $M$  trên  $\Delta$  (H 7.9).

a) Chứng minh rằng  $|\vec{n} \cdot \vec{HM}| = \sqrt{a^2 + b^2} \cdot HM$ .

b) Giả sử  $H$  có toạ độ  $(x_1; y_1)$ . Chứng minh rằng:

$$\vec{n} \cdot \vec{HM} = a(x_0 - x_1) + b(y_0 - y_1) = ax_0 + by_0 + c.$$

c) Chứng minh rằng  $HM = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$ .

Hình 7.9

Cho điểm  $M(x_0; y_0)$  và đường thẳng  $\Delta: ax + by + c = 0$ . Khoảng cách từ điểm  $M$  đến đường thẳng  $\Delta$ , kí hiệu là  $d(M, \Delta)$ , được tính bởi công thức

$$d(M, \Delta) = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}.$$

» **Ví dụ 4.** Tính khoảng cách từ điểm  $M(2; 4)$  đến đường thẳng  $\Delta: 3x + 4y - 12 = 0$ .

**Giải**

Áp dụng công thức tính khoảng cách từ điểm  $M$  đến đường thẳng  $\Delta$ , ta có

$$d(M, \Delta) = \frac{|3 \cdot 2 + 4 \cdot 4 - 12|}{\sqrt{3^2 + 4^2}} = \frac{10}{5} = 2.$$

Vậy khoảng cách từ điểm  $M$  đến đường thẳng  $\Delta$  là 2.

» **Trải nghiệm.** Đo trực tiếp khoảng cách từ điểm  $M$  đến đường thẳng  $\Delta$  (H 7.10) và giải thích vì sao kết quả đo đạc đó phù hợp với kết quả tính toán trong lời giải của Ví dụ 4.

Hình 7.10

» **Luyện tập 5.** Tính khoảng cách từ điểm  $M(1; 2)$  đến đường thẳng

$$\Delta: \begin{cases} x = 5 + 3t \\ y = -5 - 4t. \end{cases}$$

» **Vận dụng.** Nhân dịp nghỉ hè, Nam về quê ở với ông bà nội. Nhà ông bà nội có một ao cá có dạng hình chữ nhật  $ABCD$  với chiều dài  $AD = 15$  m, chiều rộng  $AB = 12$  m. Phần tam giác  $DEF$  là nơi ông bà nuôi vịt,  $AE = 5$  m,  $CF = 6$  m (H.7.11).

Hình 7.11

- a) Chọn hệ trục tọa độ  $Oxy$ , có điểm  $O$  trùng với điểm  $B$ , các tia  $Ox$ ,  $Oy$  tương ứng trùng với các tia  $BC$ ,  $BA$ . Chọn 1 đơn vị độ dài trên mặt phẳng tọa độ tương ứng với 1 m trong thực tế. Hãy xác định tọa độ của các điểm  $A$ ,  $B$ ,  $C$ ,  $D$ ,  $E$ ,  $F$  và viết phương trình đường thẳng  $EF$ .
- b) Nam đứng ở vị trí  $B$  câu cá và có thể quăng lưới câu xa 10,7 m. Hỏi lưới câu có thể rơi vào nơi nuôi vịt hay không?

## Bài 21. Đường tròn trong mặt phẳng toạ độ

#### THUẬT NGỮ

- Đường tròn
- Tâm
- Bán kính
- Phương trình đường tròn
- Phương trình tiếp tuyến

#### KIẾN THỨC, KĨ NĂNG

- Lập phương trình đường tròn khi biết toạ độ tâm và bán kính hoặc biết toạ độ ba điểm thuộc đường tròn.
- Xác định tâm và bán kính của đường tròn khi biết phương trình của nó.
- Lập phương trình tiếp tuyến của đường tròn khi biết toạ độ của tiếp điểm.
- Vận dụng kiến thức về phương trình đường tròn để giải một số bài toán liên quan đến thực tiễn.

Cũng như đối với đường thẳng, việc đại số hoá đường tròn gồm hai bước:

- Thiết lập đối tượng đại số tương ứng với đường tròn, gọi là phương trình của đường tròn.
- Chuyển các yếu tố liên quan tới đường tròn từ hình học sang đại số.

#### 1. PHƯƠNG TRÌNH ĐƯỜNG TRÒN

Đường tròn tâm  $I$ , bán kính  $R$  là tập hợp những điểm  $M$  thoả mãn điều kiện  $IM = R$ . Do đó, để lập phương trình đường tròn đó, ta cần chuyển điều kiện hình học  $IM = R$  thành một điều kiện đại số.

- » **HĐ1.** Trong mặt phẳng toạ độ  $Oxy$ , cho đường tròn  $(C)$ , tâm  $I(a; b)$ , bán kính  $R$  (H.7.13). Khi đó, một điểm  $M(x; y)$  thuộc đường tròn  $(C)$  khi và chỉ khi toạ độ của nó thoả mãn điều kiện đại số nào?

Hình 7.13

Điểm  $M(x; y)$  thuộc đường tròn  $(C)$ , tâm  $I(a; b)$ , bán kính  $R$  khi và chỉ khi

$$(x - a)^2 + (y - b)^2 = R^2. \quad (1)$$

Ta gọi (1) là phương trình của đường tròn  $(C)$ .

- » **Ví dụ 1.** Tìm tâm và bán kính của đường tròn  $(C)$  có phương trình:  $(x - 2)^2 + (y + 3)^2 = 16$ .

Viết phương trình đường tròn  $(C')$  có tâm  $J(2; -1)$  và có bán kính gấp đôi bán kính đường tròn  $(C)$ .

**Giải**

Ta viết phương trình của  $(C)$  ở dạng  $(x - 2)^2 + (y - (-3))^2 = 4^2$ .

Vậy  $(C)$  có tâm  $I = (2; -3)$  và bán kính  $R = 4$ .

Đường tròn  $(C')$  có tâm  $J(2; -1)$  và có bán kính  $R' = 2R = 8$ , nên có phương trình

$$(x - 2)^2 + (y + 1)^2 = 64.$$

» **Luyện tập 1.** Tìm tâm và bán kính của đường tròn  $(C)$ :  $(x + 2)^2 + (y - 4)^2 = 7$ .

**Nhận xét.** Phương trình (1) tương đương với

$$x^2 + y^2 - 2ax - 2by + (a^2 + b^2 - R^2) = 0.$$

» **Ví dụ 2.** Cho  $a, b, c$  là các hằng số. Tìm tập hợp những điểm  $M(x; y)$  thoả mãn phương trình

$$x^2 + y^2 - 2ax - 2by + c = 0. \quad (2)$$

**Giải**

Phương trình (2) tương đương với

$$(x - a)^2 + (y - b)^2 + c - a^2 - b^2 = 0 \Leftrightarrow (x - a)^2 + (y - b)^2 = a^2 + b^2 - c.$$

Xét  $I(a; b)$ , khi đó,  $IM = \sqrt{(x - a)^2 + (y - b)^2}$  và phương trình trên trở thành

$$IM^2 = a^2 + b^2 - c. \quad (3)$$

Từ đó, ta xét các trường hợp sau:

- Nếu  $a^2 + b^2 - c > 0$  thì tập hợp những điểm  $M$  thoả mãn (2) là đường tròn tâm  $I(a; b)$ , bán kính  $R = \sqrt{a^2 + b^2 - c}$ .
- Nếu  $a^2 + b^2 - c = 0$  thì (3)  $\Leftrightarrow IM = 0$ . Do đó, tập hợp những điểm  $M$  thoả mãn (2) chỉ gồm một điểm là  $I(a; b)$ .
- Nếu  $a^2 + b^2 - c < 0$  thì tập hợp những điểm  $M$  là tập rỗng.

Phương trình  $x^2 + y^2 - 2ax - 2by + c = 0$  là phương trình của một đường tròn  $(C)$  khi và chỉ khi  $a^2 + b^2 - c > 0$ . Khi đó,  $(C)$  có tâm  $I(a; b)$  và bán kính  $R = \sqrt{a^2 + b^2 - c}$ .

» **Luyện tập 2.** Hãy cho biết phương trình nào dưới đây là phương trình của một đường tròn và tìm tâm, bán kính của đường tròn tương ứng.

- a)  $x^2 - y^2 - 2x + 4y - 1 = 0$ ;
- b)  $x^2 + y^2 - 2x + 4y + 6 = 0$ ;
- c)  $x^2 + y^2 + 6x - 4y + 2 = 0$ .

» **Ví dụ 3.** Viết phương trình đường tròn  $(C)$  đi qua ba điểm  $A(2; 0)$ ,  $B(0; 4)$ ,  $C(-7; 3)$ .

**Giải**

Các đoạn thẳng  $AB$ ,  $AC$  tương ứng có trung điểm là  $M(1; 2)$ ,  $N\left(-\frac{5}{2}; \frac{3}{2}\right)$ . Đường thẳng trung trực  $\Delta_1$  của đoạn thẳng  $AB$  đi qua  $M(1; 2)$  và có vectơ pháp tuyến  $\overrightarrow{AB}(-2; 4)$ .

Vì  $\overrightarrow{AB}(-2; 4)$  cùng phương với  $\vec{n}_1(1; -2)$  nên  $\Delta_1$  cũng nhận  $\vec{n}_1(1; -2)$  là vectơ pháp tuyến.

Do đó, phương trình của  $\Delta_1$  là

$$1(x - 1) - 2(y - 2) = 0 \text{ hay } x - 2y + 3 = 0.$$

Đường thẳng trung trực  $\Delta_2$  của đoạn thẳng  $AC$  đi qua  $N\left(-\frac{5}{2}; \frac{3}{2}\right)$  và có vectơ pháp tuyến  $\overrightarrow{AC}(-9; 3)$ .

Vì  $\overrightarrow{AC}(-9; 3)$  cùng phương với  $\vec{n}_2(3; -1)$  nên  $\Delta_2$  cũng nhận  $\vec{n}_2(3; -1)$  là vectơ pháp tuyến. Do đó, phương trình của  $\Delta_2$  là

$$3\left(x + \frac{5}{2}\right) - 1\left(y - \frac{3}{2}\right) = 0 \text{ hay } 3x - y + 9 = 0.$$

Tâm  $I$  của đường tròn  $(C)$  cách đều ba điểm  $A, B, C$  nên  $I$  là giao điểm của  $\Delta_1$  và  $\Delta_2$ .

Vậy tọa độ của  $I$  là nghiệm của hệ phương trình  $\begin{cases} x - 2y + 3 = 0 \\ 3x - y + 9 = 0. \end{cases}$

Suy ra  $I(-3; 0)$ . Đường tròn  $(C)$  có bán kính là  $IA = 5$ . Vậy phương trình của  $(C)$  là

$$(x + 3)^2 + y^2 = 25.$$

» **Luyện tập 3.** Viết phương trình đường tròn  $(C)$  đi qua ba điểm  $M(4; -5), N(2; -1), P(3; -8)$ .

» **Vận dụng.** Bên trong một hồ bơi, người ta dự định thiết kế hai bể sục nửa hình tròn bằng nhau và một bể sục hình tròn (H.7.14) để người bơi có thể ngồi tựa lưng vào thành các bể sục thư giãn. Hãy tìm bán kính của các bể sục để tổng chu vi của ba bể là 32 m mà tổng diện tích (chiếm hồ bơi) là nhỏ nhất. Trong tính toán, lấy  $\pi = 3,14$ , độ dài tính theo mét và làm tròn tới chữ số thập phân thứ hai.

Hình 7.14

*Hướng dẫn*

- Gọi bán kính bể hình tròn và bể nửa hình tròn tương ứng là  $x, y$  (m). Khi đó, tổng chu vi ba bể là 32 m khi và chỉ khi

$$1,57x + 2,57y - 8 = 0.$$

- Gọi tổng diện tích của ba bể sục là  $S$  (m<sup>2</sup>). Khi đó

$$x^2 + y^2 = \frac{S}{3,14}.$$

- Trong mặt phẳng tọa độ  $Oxy$ , xét đường tròn  $(C)$ :

$$x^2 + y^2 = \frac{S}{3,14} \text{ có tâm } O(0; 0), \text{ bán kính } R = \sqrt{\frac{S}{3,14}} \text{ và}$$

đường thẳng  $\Delta: 1,57x + 2,57y - 8 = 0$ . Khi đó bài toán được chuyển thành: Tìm  $R$  nhỏ nhất để  $(C)$  và  $\Delta$  có ít nhất một điểm chung, với hoành độ và tung độ đều là các số dương (H.7.15).

Hình 7.15

#### 2. PHƯƠNG TRÌNH TIẾP TUYẾN CỦA ĐƯỜNG TRÒN

» **HĐ2.** Cho đường tròn  $(C): (x-1)^2 + (y-2)^2 = 25$  và điểm  $M(4; -2)$ .

- Chứng minh điểm  $M(4; -2)$  thuộc đường tròn  $(C)$ .
- Xác định tâm và bán kính của  $(C)$ .
- Gọi  $\Delta$  là tiếp tuyến của  $(C)$  tại  $M$ . Hãy chỉ ra một vectơ pháp tuyến của đường thẳng  $\Delta$  (H.7.16). Từ đó, viết phương trình đường thẳng  $\Delta$ .

Hình 7.16

Cho điểm  $M(x_0; y_0)$  thuộc đường tròn  $(C): (x-a)^2 + (y-b)^2 = R^2$  (tâm  $I(a; b)$ , bán kính  $R$ ). Khi đó, tiếp tuyến  $\Delta$  của  $(C)$  tại  $M(x_0; y_0)$  có vectơ pháp tuyến  $\vec{MI} = (a - x_0; b - y_0)$  và phương trình

$$(a - x_0)(x - x_0) + (b - y_0)(y - y_0) = 0.$$

» **Ví dụ 4.** Cho đường tròn  $(C)$  có phương trình  $(x+1)^2 + (y-3)^2 = 5$ . Điểm  $M(0; 1)$  có thuộc đường tròn  $(C)$  hay không? Nếu có, hãy viết phương trình tiếp tuyến tại  $M$  của  $(C)$ .

**Giải**

Do  $(0+1)^2 + (1-3)^2 = 5$ , nên điểm  $M$  thuộc  $(C)$ .

Đường tròn  $(C)$  có tâm là  $I(-1; 3)$ . Tiếp tuyến của  $(C)$  tại  $M(0; 1)$  có vectơ pháp tuyến  $\vec{MI} = (-1; 2)$ , nên có phương trình

$$-1(x-0) + 2(y-1) = 0 \Leftrightarrow x - 2y + 2 = 0.$$

» **Luyện tập 4.** Cho đường tròn  $(C): x^2 + y^2 - 2x + 4y + 1 = 0$ . Viết phương trình tiếp tuyến  $\Delta$  của  $(C)$  tại điểm  $N(1; 0)$ .

## Bài 22. Ba đường conic

#### **THUẬT NGỮ**

- Conic, Elip, Hypebol, Parabол
- Tiêu điểm
- Tiêu cự
- Phương trình chính tắc
- Đường chuẩn, tham số tiêu

#### **KIẾN THỨC, KĨ NĂNG**

- Nhận biết ba đường conic bằng hình học.
- Nhận biết phương trình chính tắc của ba đường conic.
- Giải quyết một số vấn đề thực tiễn gắn với ba đường conic.

a)

b)

c)

Hình 7.17

Trong thực tế, em có thể bắt gặp nhiều hình ảnh ứng với các đường elip (ellipse), hypebol (hyperbola), parabol (parabola), gọi chung là ba đường **conic**. Được phát hiện và nghiên cứu từ thời Hy Lạp cổ đại, nhưng các ứng dụng phong phú và quan trọng của các đường conic chỉ được phát hiện trong những thế kỉ gần đây, khởi đầu là định luật nổi tiếng của Kepler (Johannes Kepler, 1571–1630) về quỹ đạo của các hành tinh trong hệ Mặt Trời. Để có thể tiếp tục câu chuyện thú vị này, ta cần tìm hiểu kĩ hơn, đặc biệt là tìm phương trình đại số mô tả các đường conic.

#### **1. ELIP**

**HĐ1.** Đính hai đầu của một sợi dây không đàn hồi vào hai vị trí cố định  $F_1, F_2$  trên một mặt bàn (độ dài sợi dây lớn hơn khoảng cách giữa hai điểm  $F_1, F_2$ ). Kéo căng sợi dây tại một điểm  $M$  bởi một đầu bút dạ (hoặc phấn). Di chuyển đầu bút dạ để nó vẽ trên mặt bàn một đường khép kín (H.7.18).

- Đường vừa nhận được có liên hệ với hình ảnh nào ở Hình 7.17?
- Trong quá trình đầu bút di chuyển để vẽ nên đường nói trên, tổng các khoảng cách từ nó tới các vị trí  $F_1, F_2$  có thay đổi không? Vì sao?

Hình 7.18

Cho hai điểm cố định và phân biệt  $F_1, F_2$ . Đặt  $F_1F_2 = 2c > 0$ . Cho số thực  $a$  lớn hơn  $c$ . Tập hợp các điểm  $M$  sao cho  $MF_1 + MF_2 = 2a$  được gọi là **đường elip** (hay elip). Hai điểm  $F_1, F_2$  được gọi là hai **tiêu điểm** và  $F_1F_2 = 2c$  được gọi là **tiêu cự** của elip đó.

Tại sao trong định nghĩa elip cần điều kiện  $a > c$ ?

» **Ví dụ 1.** Cho lục giác đều  $ABCDEF$ . Chứng minh rằng bốn điểm  $B, C, E, F$  cùng thuộc một elip có hai tiêu điểm là  $A$  và  $D$ .

**Giải**

Lục giác đều  $ABCDEF$  có các cạnh bằng nhau và các góc đều có số đo là  $120^\circ$  (H.7.19). Do đó, các tam giác  $ABC, BCD, DEF, EFA$  bằng nhau (c.g.c). Suy ra  $AC = BD = DF = AE$ . Từ đó, ta có  $BA + BD = CA + CD = EA + ED = FA + FD > AD$ . Vậy  $B, C, E, F$  cùng thuộc một elip có hai tiêu điểm là  $A$  và  $D$ .

Hình 7.19

» **Luyện tập 1.** Trên bàn bida hình elip có một lỗ thu bi tại một tiêu điểm (H.7.20). Nếu gậy chơi tác động đủ mạnh vào một bi đặt tại tiêu điểm còn lại của bàn, thì sau khi va vào thành bàn, bi sẽ bật lại và chạy về lỗ thu (bỏ qua các tác động phụ). Hỏi độ dài quãng đường bi lăn từ điểm xuất phát tới lỗ thu có phụ thuộc vào đường đi của bi hay không? Vì sao?

Hình 7.20

» **HĐ2.** Xét một elip  $(E)$  với các kí hiệu như trong định nghĩa. Chọn hệ trục toạ độ  $Oxy$  có gốc  $O$  là trung điểm của  $F_1F_2$ , tia  $Ox$  trùng tia  $OF_2$  (H.7.21).

a) Nêu toạ độ của các tiêu điểm  $F_1, F_2$ .

b) Giải thích vì sao điểm  $M(x, y)$  thuộc elip khi và chỉ khi

$$\sqrt{(x+c)^2 + y^2} + \sqrt{(x-c)^2 + y^2} = 2a. \quad (1)$$

Hình 7.21

**Chú ý.** Người ta có thể biến đổi (1) về dạng  $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ , với  $b = \sqrt{a^2 - c^2}$ .

Trong mặt phẳng toạ độ  $Oxy$ , elip có hai tiêu điểm thuộc trục hoành sao cho  $O$  là trung điểm của đoạn nối hai tiêu điểm đó, thì có phương trình

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1, \text{ với } a > b > 0. \quad (2)$$

Ngược lại, mỗi phương trình có dạng (2), với  $a > b > 0$ , đều là phương trình của elip có hai tiêu điểm  $F_1(-\sqrt{a^2 - b^2}; 0)$ ,  $F_2(\sqrt{a^2 - b^2}; 0)$ , tiêu cự  $2c = 2\sqrt{a^2 - b^2}$  và tổng các khoảng cách từ mỗi điểm thuộc elip đó tới hai tiêu điểm bằng  $2a$ .

Phương trình (2) được gọi là **phương trình chính tắc của elip** tương ứng.

» **Ví dụ 2.** Cho elip có phương trình chính tắc  $\frac{x^2}{25} + \frac{y^2}{16} = 1$ . Tìm các tiêu điểm và tiêu cự của elip.

Tính tổng các khoảng cách từ mỗi điểm trên elip tới hai tiêu điểm.

**Giải**

Ta có:  $a^2 = 25, b^2 = 16$ . Do đó  $c = \sqrt{a^2 - b^2} = 3$ . Vậy elip có hai tiêu điểm là  $F_1(-3;0)$ ;  $F_2(3;0)$  và tiêu cự là  $F_1F_2 = 2c = 6$ . Ta có  $a = \sqrt{25} = 5$ , nên tổng các khoảng cách từ mỗi điểm trên elip tới hai tiêu điểm bằng  $2a = 10$ .

» **Luyện tập 2.** Cho elip có phương trình chính tắc  $\frac{x^2}{100} + \frac{y^2}{64} = 1$ . Tìm các tiêu điểm và tiêu cự của elip.

» **Vận dụng 1.** Trong bản vẽ thiết kế, vòm của ô thoáng trong Hình 7.22 là nửa nằm phía trên trục hoành của elip có phương trình

$$\frac{x^2}{16} + \frac{y^2}{4} = 1.$$

Biết rằng 1 đơn vị trên mặt phẳng toạ độ của bản vẽ thiết kế ứng với 30 cm trên thực tế. Tính chiều cao  $h$  của ô thoáng tại điểm cách điểm chính giữa của đế ô thoáng 75 cm.

Hình 7.22

#### 2. HYPEBOL

Trên mặt phẳng, nếu hai thiết bị đặt tại các vị trí  $F_1, F_2$  nhận được một tín hiệu âm thanh cùng lúc thì vị trí phát ra tín hiệu cách đều  $F_1$  và  $F_2$ , do đó, nằm trên đường trung trực của đoạn thẳng  $F_1F_2$ . Nếu hai thiết bị nhận được tín hiệu không cùng lúc thì để giới hạn khu vực tìm kiếm nơi phát ra tín hiệu, ta cần biết một đối tượng toán học, gọi là hypebol.

Hình 7.23

Cho hai điểm phân biệt cố định  $F_1$  và  $F_2$ . Đặt  $F_1F_2 = 2c$ . Cho số thực dương  $a$  nhỏ hơn  $c$ . Tập hợp các điểm  $M$  sao cho  $|MF_1 - MF_2| = 2a$  được gọi là **đường hypebol** (hay hypebol). Hai điểm  $F_1, F_2$  được gọi là hai **tiêu điểm** và  $F_1F_2 = 2c$  được gọi là **tiêu cự** của hypebol đó.

Tại sao trong định nghĩa hypebol cần điều kiện  $a < c$ ?

**Chú ý.** Hypebol có hai nhánh (H.7.23), một nhánh gồm những điểm  $M$  thoả mãn  $MF_1 - MF_2 = 2a$  và nhánh còn lại gồm những điểm  $M$  thoả mãn  $MF_1 - MF_2 = -2a$  (hay  $MF_2 - MF_1 = 2a$ ).

» **Ví dụ 3.** Trên biển có hai đảo hình tròn với bán kính khác nhau. Tại vùng biển giữa hai đảo đó, người ta xác định một đường ranh giới cách đều hai đảo, tức là, đường mà khoảng cách từ mỗi vị trí trên đó đến hai đảo là bằng nhau. Hỏi đường ranh giới đó có thuộc một nhánh của một hypebol hay không?

**Chú ý.** Khoảng cách từ một vị trí trên biển đến đảo hình tròn bằng hiệu của khoảng cách từ vị trí đó đến tâm đảo và bán kính của đảo.

**Giải.** Giả sử đảo thứ nhất có tâm  $O_1$  và bán kính  $R_1$ , đảo thứ hai có tâm  $O_2$  và bán kính  $R_2$  (H.7.24). Do hai đường tròn  $(O_1, R_1)$ ,  $(O_2, R_2)$  nằm ngoài nhau nên  $O_1O_2 > R_1 + R_2$ . Gọi  $M$  là một điểm bất kì thuộc đường ranh giới.

Vì  $M$  cách đều hai đảo nên

$$MO_1 - R_1 = MO_2 - R_2 \Leftrightarrow MO_1 - MO_2 = R_1 - R_2.$$

Vậy đường ranh giới thuộc một nhánh của hypebol với tiêu điểm  $F_1$  trùng  $O_1$ ,  $F_2$  trùng  $O_2$ ,  $2c = O_1O_2$ ,  $2a = |R_1 - R_2|$ .

Hình 7.24

» **Luyện tập 3.** Cho hình chữ nhật  $ABCD$  và  $M, N$  tương ứng là trung điểm của các cạnh  $AB, CD$  (H.7.25). Chứng minh rằng bốn điểm  $A, B, C, D$  cùng thuộc một hypebol có hai tiêu điểm là  $M$  và  $N$ .

Hình 7.25

» **HĐ3.** Xét một hypebol  $(H)$  với các kí hiệu như trong định nghĩa. Chọn hệ trục toạ độ  $Oxy$  có gốc  $O$  là trung điểm của  $F_1F_2$ , tia  $Ox$  trùng tia  $OF_2$  (H.7.26). Nêu toạ độ của các tiêu điểm  $F_1, F_2$ . Giải thích vì sao điểm  $M(x; y)$  thuộc  $(H)$  khi và chỉ khi

$$\left| \sqrt{(x+c)^2 + y^2} - \sqrt{(x-c)^2 + y^2} \right| = 2a. \quad (3)$$

Hình 7.26

**Chú ý.** Người ta có thể biến đổi (3) về dạng

$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \text{ với } b = \sqrt{c^2 - a^2}.$$

Trong mặt phẳng toạ độ  $Oxy$ , hypebol có hai tiêu điểm thuộc trục hoành sao cho  $O$  là trung điểm của đoạn nối hai tiêu điểm đó, thì có phương trình

$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \text{ với } a, b > 0. \quad (4)$$

Ngược lại, mỗi phương trình có dạng (4), với  $a, b > 0$ , đều là phương trình của hypebol có hai tiêu điểm  $F_1(-\sqrt{a^2 + b^2}; 0)$ ,  $F_2(\sqrt{a^2 + b^2}; 0)$ , tiêu cự  $2c = 2\sqrt{a^2 + b^2}$  và giá trị tuyệt đối của hiệu các khoảng cách từ mỗi điểm thuộc hypebol đến hai tiêu điểm bằng  $2a$ .

Phương trình (4) được gọi là **phương trình chính tắc của hypebol** tương ứng.

» **Ví dụ 4.** Cho hypebol có phương trình chính tắc  $\frac{x^2}{9} - \frac{y^2}{16} = 1$ . Tìm các tiêu điểm và tiêu cự của hypebol. Hiệu các khoảng cách từ một điểm nằm trên hypebol tới hai tiêu điểm có giá trị tuyệt đối bằng bao nhiêu?

**Giải**

Ta có  $a^2 = 9, b^2 = 16$ , nên  $c = \sqrt{a^2 + b^2} = 5$ . Vậy hypebol có hai tiêu điểm là  $F_1(-5; 0), F_2(5; 0)$  và có tiêu cự  $2c = 10$ . Hiệu các khoảng cách từ một điểm nằm trên hypebol tới hai tiêu điểm có giá trị tuyệt đối bằng  $2a = 2\sqrt{9} = 6$ .

» **Luyện tập 4.** Cho  $(H): \frac{x^2}{144} - \frac{y^2}{25} = 1$ . Tìm các tiêu điểm và tiêu cự của  $(H)$ .

#### 3. PARABOL

» **HĐ4.** Cho parabol  $(P): y = \frac{1}{4}x^2$ . Xét  $F(0; 1)$  và đường thẳng

$\Delta: y + 1 = 0$ . Với điểm  $M(x; y)$  bất kì, chứng minh rằng  $MF = d(M, \Delta) \Leftrightarrow M(x; y)$  thuộc  $(P)$ .

Như vậy, parabol  $(P): y = \frac{1}{4}x^2$  là tập hợp những điểm cách đều điểm  $F(0; 1)$  và đường thẳng  $\Delta: y + 1 = 0$ .

Để ý rằng:  $MF = \sqrt{x^2 + (y - 1)^2}$ ,  
 $d(M, \Delta) = |y + 1|$

Cho một điểm  $F$  cố định và một đường thẳng  $\Delta$  cố định không đi qua  $F$ . Tập hợp các điểm  $M$  cách đều  $F$  và  $\Delta$  được gọi là **đường parabol** (hay parabol). Điểm  $F$  được gọi là **tiêu điểm**,  $\Delta$  được gọi là **đường chuẩn**, khoảng cách từ  $F$  đến  $\Delta$  được gọi là **tham số tiêu** của parabol đó.

» **HĐ5.** Xét  $(P)$  là một parabol với tiêu điểm  $F$  và đường chuẩn  $\Delta$ . Gọi  $p$  là tham số tiêu của  $(P)$  và  $H$  là hình chiếu vuông góc của  $F$  trên  $\Delta$ . Chọn hệ trục tọa độ  $Oxy$  có gốc  $O$  là trung điểm của  $HF$ , tia  $Ox$  trùng tia  $OF$  (H.7.27).

a) Nêu tọa độ của  $F$  và phương trình của  $\Delta$ .

b) Giải thích vì sao điểm  $M(x; y)$  thuộc  $(P)$  khi và chỉ khi

$$\sqrt{\left(x - \frac{p}{2}\right)^2 + y^2} = \left|x + \frac{p}{2}\right|.$$

Hình 7.27

**Chú ý.** Bình phương hai vế của phương trình cuối cùng trong HĐ5 rồi rút gọn, ta dễ dàng nhận được phương trình  $y^2 = 2px$ .

Xét  $(P)$  là một parabol với tiêu điểm  $F$ , đường chuẩn  $\Delta$ . Gọi  $H$  là hình chiếu vuông góc của  $F$  trên  $\Delta$ . Khi đó, trong hệ trục tọa độ  $Oxy$  với gốc  $O$  là trung điểm của  $HF$ , tia  $Ox$  trùng tia  $OF$ , parabol  $(P)$  có phương trình

$$y^2 = 2px \quad (\text{với } p > 0). \quad (5)$$

Phương trình (5) được gọi là **phương trình chính tắc của parabol  $(P)$** .

Ngược lại, mỗi phương trình dạng (5), với  $p > 0$ , là phương trình chính tắc của parabol có tiêu điểm  $F\left(\frac{p}{2}; 0\right)$  và đường chuẩn  $\Delta: x = -\frac{p}{2}$ .

» **Ví dụ 5.** Cho parabol  $(P): y^2 = x$ .

a) Tìm tiêu điểm  $F$ , đường chuẩn  $\Delta$  của  $(P)$ .

b) Tìm những điểm trên  $(P)$  có khoảng cách tới  $F$  bằng 3.

**Giải**

a) Ta có  $2p = 1$  nên  $p = \frac{1}{2}$ .

Parabol có tiêu điểm  $F\left(\frac{1}{4}; 0\right)$  và đường chuẩn  $\Delta: x = -\frac{1}{4}$ .

b) Điểm  $M(x_0; y_0)$  thuộc  $(P)$  có khoảng cách tới  $F$  bằng 3 khi và chỉ khi  $y_0^2 = x_0$  và  $MF = 3$ .  
Do  $MF = d(M, \Delta)$  nên  $d(M, \Delta) = 3$ .

Mặt khác  $\Delta: x + \frac{1}{4} = 0$  và  $x_0 = y_0^2 \geq 0$  nên  $3 = d(M, \Delta) = \left|x_0 + \frac{1}{4}\right| = x_0 + \frac{1}{4}$ .

Vậy  $x_0 = \frac{11}{4}$  và  $y_0 = \frac{\sqrt{11}}{2}$  hoặc  $y_0 = -\frac{\sqrt{11}}{2}$ .

Vậy có hai điểm  $M$  thỏa mãn bài toán với tọa độ là  $\left(\frac{11}{4}; \frac{\sqrt{11}}{2}\right)$  và  $\left(\frac{11}{4}; -\frac{\sqrt{11}}{2}\right)$ .

Sử dụng  $M$  cách đều  $F$  và  $\Delta$ .

» **Vận dụng 2.** Tại một vùng biển giữa đất liền và một đảo, người ta phân định một đường ranh giới cách đều đất liền và đảo (H.7.28). Coi bờ biển vùng đất liền đó là một đường thẳng và đảo là hình tròn. Hỏi đường ranh giới nói trên có hình gì? Vì sao?

Hình 7.28

#### 4. MỘT SỐ ỨNG DỤNG CỦA BA ĐƯỜNG CONIC

#### TÍNH CHẤT QUANG HỌC

Tương tự gương cầu lồi thường đặt ở những khúc đường cua, người ta cũng có những gương (lồi, lõm) elip, hypebol, parabol. Tia sáng gặp các gương này, đều được phản xạ theo một quy tắc được xác định rõ bằng hình học, chẳng hạn:

- Tia sáng phát ra từ một tiêu điểm của elip, hypebol (đối với các gương lõm elip, hypebol) sau khi gặp elip, hypebol sẽ bị hắt lại theo một tia (tia phản xạ) nằm trên đường thẳng đi qua tiêu điểm còn lại (H.7.29).

Hình 7.29

- Tia sáng hướng tới một tiêu điểm của elip, hypebol (đối với các gương elip, hypebol lồi), khi gặp elip, hypebol sẽ bị hắt lại theo một tia nằm trên đường thẳng đi qua tiêu điểm còn lại (H.7.30).

Hình 7.30

- Với gương parabol lõm, tia sáng phát ra từ tiêu điểm khi gặp parabol sẽ bị hắt lại theo một tia vuông góc với đường chuẩn của parabol (H.7.31). Ngược lại, nếu tia tới vuông góc với đường chuẩn của parabol thì tia phản xạ sẽ đi qua tiêu điểm của parabol.

Tính chất quang học được đề cập ở trên giúp ta nhận được ánh sáng mạnh hơn khi các tia sáng hội tụ và giúp ta đổi hướng ánh sáng khi cần. Ta cũng có điều tương tự đối với tín hiệu âm thanh, tín hiệu truyền từ vệ tinh.

Hình 7.31

#### MỘT SỐ ỨNG DỤNG

Nhà vòm hoa (Flower Dome) trong Khu vườn bên vịnh (Gardens by the Bay), Singapore

Công viên với hình elip ở phía nam Nhà Trắng, Hoa Kỳ

Ba đường conic xuất hiện và có nhiều ứng dụng trong khoa học và trong cuộc sống, chẳng hạn:

- Tia nước bắn ra từ đài phun nước, đường đi bồng của quả bóng là những hình ảnh về đường parabol;
- Khi nghiêng cốc tròn, mặt nước trong cốc có hình elip. Tương tự, dưới ánh sáng mặt trời, bóng của một quả bóng, nhìn chung, là một elip;
- Ánh sáng phát ra từ một bóng đèn Led trên trần nhà có thể tạo nên trên tường các nhánh hypebol;
- Nhiều công trình kiến trúc có hình elip, parabol hay hypebol.

Hình 7.32

- Trong vũ trụ bao la, ánh sáng đóng vai trò sứ giả truyền tin. Ánh sáng phát ra từ một thiên thể sẽ mang những thông tin về nơi nó xuất phát. Khi nhận được ánh sáng, các nhà khoa học sẽ dựa vào đó để nghiên cứu, khám phá thiên thể. Trong thiên văn học, các gương trong kính thiên văn (H.7.32a) giúp nhà khoa học nhận được hình ảnh quan sát rõ nét hơn, ánh sáng thu được có các chỉ số phân tích rõ hơn.
- Anten vệ tinh parabol (H.7.32b) là thiết bị thu tín hiệu truyền về từ vệ tinh. Tín hiệu sau khi gặp parabol bị hất lại và hội tụ về điểm thu được đặt tại tiêu điểm của parabol.
- Đèn pha đáy parabol (H.7.32c) giúp ánh sáng có thể phát xa (chẳng hạn, giúp đèn ô tô có thể chiếu xa). Ánh sáng xuất phát từ vị trí tiêu điểm của parabol, chiếu vào đáy đèn, các tia sáng bị hất lại thành các tia sáng nằm trên các đường thẳng song song.
- Trong y học, để tán sỏi thận, người ta có thể dùng chùm tia laser phát ra từ một tiêu điểm của gương elip để sau khi phản xạ sẽ hội tụ tại tiêu điểm còn lại cũng chính là vị trí sỏi.
- Tháp giải nhiệt hình hypebol trong lò phản ứng hạt nhân (H.7.17c) hay trong nhà máy nhiệt điện có kiến trúc đảm bảo độ vững chãi, tiết kiệm nguyên vật liệu và giúp quá trình toả nhiệt được thuận lợi.

- Bằng các quan sát và phân tích thiên văn, Johannes Kepler (1571 – 1630) đã đưa ra định luật nói rằng, các hành tinh trong hệ Mặt Trời chuyển động theo các quỹ đạo là các đường elip nhận tâm Mặt Trời là một tiêu điểm.

» **Vận dụng 3.** Gương elip trong một máy tán sỏi thận (H.7.33) ứng với elip có phương

trình chính tắc  $\frac{x^2}{400} + \frac{y^2}{76} = 1$  (theo đơn vị cm).

Tính khoảng cách từ vị trí đầu phát sóng của máy đến vị trí của sỏi thận cần tán.

Hình 7.33

# CHƯƠNG VIII. ĐẠI SỐ TỔ HỢP

## Bài 23. Quy tắc đếm

#### THUẬT NGỮ

- Quy tắc cộng
- Quy tắc nhân
- Sơ đồ hình cây

#### KIẾN THỨC, KĨ NĂNG

- Vận dụng quy tắc cộng, quy tắc nhân để tính toán số cách thực hiện một công việc hoặc đếm số phân tử của một tập hợp.
- Vận dụng sơ đồ hình cây trong các bài toán đếm đơn giản.

Đếm là một bài toán cổ xưa nhất của nhân loại. Trong khoa học và trong cuộc sống, người ta cần đếm các đối tượng để giải quyết các vấn đề khác nhau. Chẳng hạn như bài toán sau:

Mỗi mật khẩu của một trang web là một dãy có từ 2 tới 3 kí tự, trong đó kí tự đầu tiên là một trong 26 chữ cái in thường trong bảng chữ cái tiếng Anh (từ a đến z), mỗi kí tự còn lại là một chữ số từ 0 đến 9. Hỏi có thể tạo được bao nhiêu mật khẩu khác nhau?

Bài học này sẽ giúp em hiểu và áp dụng hai quy tắc đếm cơ bản để giải quyết bài toán trên.

#### 1. QUY TẮC CỘNG VÀ SƠ ĐỒ HÌNH CÂY

##### » HĐ1. Chọn chuyến đi (H.8.1)

Từ Hà Nội vào Vinh mỗi ngày có 7 chuyến tàu hoả và 2 chuyến máy bay. Bạn An muốn ngày Chủ nhật này đi từ Hà Nội vào Vinh bằng tàu hoả hoặc máy bay.

Hỏi bạn An có bao nhiêu cách chọn chuyến đi?

Hình 8.1

##### » HĐ2. Chọn vé tàu (H.8.2)

Bạn An đã quyết định mua vé tàu đi từ Hà Nội vào Vinh trên chuyến tàu SE7. Trên tàu có các toa ghế ngồi và các toa giường nằm. Toa ngồi có hai loại vé: ngồi cứng và ngồi mềm. Toa nằm có loại khoang 4 giường và khoang 6 giường. Khoang 4 giường có hai loại vé: tầng 1 và tầng 2, khoang 6 giường có ba loại vé: tầng 1, tầng 2 và tầng 3. Hỏi:

- a) Có bao nhiêu loại vé ghế ngồi và bao nhiêu loại vé giường nằm?
- b) Có bao nhiêu loại vé để bạn An lựa chọn?

Hình 8.2

##### Quy tắc cộng

Giả sử một công việc nào đó có thể thực hiện theo một trong hai phương án khác nhau:

- Phương án một có  $n_1$  cách thực hiện,
- Phương án hai có  $n_2$  cách thực hiện.

Khi đó số cách thực hiện công việc sẽ là:  $n_1 + n_2$  cách.

phương án 1 .....  $n_1$  cách

phương án 2 .....  $n_2$  cách

**Chú ý.** Sơ đồ minh hoạ cách phân chia trường hợp như trong Hình 8.2 được gọi là **sơ đồ hình cây**. Trong các bài toán đếm, người ta thường dùng sơ đồ hình cây để minh hoạ, giúp cho việc đếm thuận tiện và không bỏ sót trường hợp.

» **Ví dụ 1.** Một quán phục vụ ăn sáng có bán phở và bún. Phở có 2 loại là phở bò và phở gà. Bún có 3 loại là bún bò, bún riêu cua và bún cá. Một khách hàng muốn chọn một món để ăn sáng. Vẽ sơ đồ hình cây minh hoạ và cho biết khách hàng đó có bao nhiêu cách lựa chọn một món ăn sáng.

**Giải.** Ta có sơ đồ hình cây như Hình 8.3.

Theo quy tắc cộng, số cách chọn một món ăn sáng là:

$2 + 3 = 5$  (cách).

Hình 8.3

**Chú ý.** Ta áp dụng quy tắc cộng cho một công việc có nhiều phương án khi các phương án đó phải rời nhau, không phụ thuộc vào nhau (độc lập với nhau).

» **Ví dụ 2.** Một bộ cờ vua có 32 quân cờ như Hình 8.4.

- a) Bạn Nam lấy ra tất cả các quân tốt. Hãy đếm xem Nam lấy ra bao nhiêu quân cờ.
- b) Bạn Nam lấy ra tất cả các quân cờ trắng và tất cả các quân tốt. Hãy đếm số quân cờ Nam lấy ra.

**Giải**

- a) Quân cờ bạn Nam lấy ra có thể thuộc hai loại: màu trắng hoặc màu đen.
    - Số quân tốt trắng: 8 quân;
    - Số quân tốt đen: 8 quân.
- Nam lấy ra:  $8 + 8 = 16$  (quân cờ).

- b) Nam lấy tất cả các quân trắng và tất cả các quân tốt.
  - Đầu tiên ta đếm tất cả các quân cờ trắng, có 16 quân;
  - Tiếp theo ta đếm tất cả các quân tốt, có 16 quân tốt.

Vì trong 16 quân tốt có 8 quân tốt trắng đã được đếm nên số quân cờ Nam lấy ra là:  
 $16 + 16 - 8 = 24$  (quân cờ).

**Nhận xét.** Ở câu b), nếu gọi  $A$  là tập hợp gồm tất cả các quân cờ trắng,  $B$  là tập hợp gồm tất cả các quân tốt thì các quân cờ Nam lấy ra chính là các phần tử của tập hợp  $A \cup B$ . Nếu ta áp dụng quy tắc cộng:  $n(A \cup B) = n(A) + n(B) = 32$  (quân cờ), suy ra Nam lấy ra 32 quân cờ. Kết luận khi đó là sai, vì  $A \cap B \neq \emptyset$  nên ta không thể áp dụng quy tắc cộng để tính trong trường hợp này.

Hình 8.4

» **Luyện tập 1.** Có bao nhiêu số tự nhiên từ 1 đến 30 mà không nguyên tố cùng nhau với 35?

Hai số tự nhiên  $a$  và  $b$  gọi là nguyên tố cùng nhau nếu chúng có ước chung lớn nhất là 1.

#### 2. QUY TẮC NHÂN

» **HĐ3.** Thầy Trung muốn đi từ Hà Nội vào Huế, rồi từ Huế vào Quảng Nam. Biết rằng từ Hà Nội vào Huế có thể đi bằng 3 cách: ô tô, tàu hỏa hoặc máy bay. Còn từ Huế vào Quảng Nam có thể đi bằng 2 cách: ô tô hoặc tàu hỏa (H.8.5).

Hình 8.5

Hỏi thầy Trung có bao nhiêu cách chọn các phương tiện để đi từ Hà Nội vào Quảng Nam?

» **HĐ4.** Để lấp ghế vào một phòng chiếu phim, các ghế được gắn nhãn bằng một chữ cái in hoa (trong bảng 26 chữ cái tiếng Anh từ A đến Z) đứng trước và một số nguyên từ 1 đến 20, chẳng hạn X15, Z2, ...

Hỏi có thể gắn nhãn tối đa được cho bao nhiêu ghế?

Ta nhận thấy muốn làm một việc có hai công đoạn lần lượt thì trước hết ta xét xem công đoạn một có bao nhiêu cách, sau đó với mỗi cách của công đoạn một, ta tính xem công đoạn hai có bao nhiêu cách. Khi đó số cách thực hiện công việc tính theo quy tắc sau:

##### **Quy tắc nhân**

Giả sử một công việc nào đó phải hoàn thành qua hai công đoạn liên tiếp nhau:

- Công đoạn một có  $m_1$  cách thực hiện,
- Với mỗi cách thực hiện công đoạn một, có  $m_2$  cách thực hiện công đoạn hai.

Khi đó số cách thực hiện công việc là:  $m_1 \cdot m_2$  cách.

##### **Chú ý**

Quy tắc nhân áp dụng để tính số cách thực hiện một công việc có nhiều công đoạn, các công đoạn nối tiếp nhau và những công đoạn này độc lập với nhau.

» **Ví dụ 3.** Một người muốn mua vé tàu ngồi đi từ Hà Nội vào Vinh. Có ba chuyến tàu là SE5, SE7 và SE35. Trên mỗi tàu có 2 loại vé ngồi khác nhau: ngồi cứng hoặc ngồi mềm. Hỏi có bao nhiêu loại vé ngồi khác nhau để người đó lựa chọn?

###### **Giải**

Để mua được vé tàu, người đó phải thực hiện hai công đoạn:

Có 3 cách chọn chuyến tàu, với mỗi chuyến tàu có 2 cách chọn loại vé ngồi. Áp dụng quy tắc nhân, ta có số cách chọn loại vé là:  $3 \cdot 2 = 6$  (cách).

**Chú ý.** Ta cũng có thể dùng quy tắc cộng. Người mua vé có thể lựa chọn một trong ba trường hợp: SE5, SE7 hoặc SE35.

Nếu lựa chọn SE5, có hai loại vé: loại vé SE5 ngồi cứng và SE5 ngồi mềm. Tương tự cho trường hợp SE7 và trường hợp SE35.

Mỗi trường hợp có hai loại vé. Tổng cộng có:

$2 + 2 + 2 = 6$  (cách chọn loại vé).

» **Luyện tập 2.** Tại kì World Cup năm 2018, vòng bảng gồm có 32 đội tham gia, được chia vào 8 bảng, mỗi bảng 4 đội thi đấu vòng tròn (mỗi đội chơi một trận với từng đội khác trong cùng bảng). Hỏi tổng cộng vòng bảng có bao nhiêu trận đấu?

#### 3. KẾT HỢP QUY TẮC CỘNG VÀ QUY TẮC NHÂN

Trong các ví dụ trước, chúng ta chỉ cần áp dụng một quy tắc đếm. Tuy nhiên, hầu hết các bài toán đếm trong thực tế sẽ phức tạp hơn và thường phải áp dụng cả hai quy tắc.

» **Ví dụ 4.** Để tổ chức bữa tiệc, người ta chọn thực đơn gồm một món khai vị, một món chính và một món tráng miệng. Nhà hàng đưa ra danh sách: khai vị có 2 loại súp và 3 loại sa lát; món chính có 4 loại thịt, 3 loại cá và 3 loại tôm; tráng miệng có 5 loại kem và 3 loại bánh. Hỏi có thể thiết kế bao nhiêu thực đơn khác nhau?

**Giải**

Để chọn thực đơn, ta chia thành 3 công đoạn chọn món.

Công đoạn 1, chọn món khai vị: vì có hai phương án là súp hoặc sa lát nên ta áp dụng quy tắc cộng. Số cách chọn là:  $2 + 3 = 5$  (cách).

Công đoạn 2, chọn món chính: tương tự, ta có số cách chọn là:

$4 + 3 + 3 = 10$  (cách).

Công đoạn 3, chọn món tráng miệng: tương tự, ta có số cách chọn là:  $5 + 3 = 8$  (cách).

Tổng kết, theo quy tắc nhân, số cách chọn thực đơn là:  $5 \cdot 10 \cdot 8 = 400$  (cách).

**Chú ý.** Quy tắc cộng được áp dụng khi công việc được chia thành các phương án phân biệt (thực hiện một trong các phương án để hoàn thành công việc).

Quy tắc nhân được áp dụng khi công việc có nhiều công đoạn nối tiếp nhau (phải thực hiện tất cả các công đoạn để hoàn thành công việc).

» **Luyện tập 3.** Từ các chữ số 0, 1, 2, 3 có thể lập được bao nhiêu số thoả mãn:

- a) Là số tự nhiên có ba chữ số khác nhau?
- b) Là số tự nhiên chẵn có ba chữ số khác nhau?

» **Ví dụ 5.** Trở lại tình huống mở đầu, ta thấy có hai trường hợp: độ dài của mật khẩu là 2 hoặc 3 kí tự.

- Trường hợp 1: độ dài mật khẩu là 2 kí tự. Chọn từng kí tự và áp dụng quy tắc nhân.  
Kí tự đầu tiên có 26 cách chọn trong các chữ cái in thường tiếng Anh.  
Kí tự thứ hai có 10 cách chọn trong các chữ số từ 0 đến 9.  
Vậy, theo quy tắc nhân, ta có  $26 \cdot 10 = 260$  cách chọn mật khẩu trong trường hợp 1.
- Trường hợp 2: độ dài mật khẩu là 3 kí tự.  
Tương tự như trường hợp 1, ta có  $26 \cdot 10^2 = 2\,600$  cách chọn mật khẩu.

Vì có hai trường hợp rời nhau, mật khẩu có thể rơi vào một trong hai trường hợp, nên ta áp dụng quy tắc cộng. Tổng số mật khẩu có thể là  $260 + 2600 = 2860$ .

» **Vận dụng.** Khối lớp 10 của một trường trung học phổ thông có ba lớp 10A, 10B, 10C. Lớp 10A có 30 bạn, lớp 10B có 35 bạn, lớp 10C có 32 bạn. Nhà trường muốn chọn 4 bạn để thành lập đội cờ đỏ của khối sao cho có đủ đại diện của các lớp. Hỏi có bao nhiêu cách lựa chọn?

## Bài 24. Hoán vị, chỉnh hợp và tổ hợp

#### THUẬT NGỮ

- Hoán vị
- Chỉnh hợp
- Tổ hợp

#### KIẾN THỨC, KĨ NĂNG

- Tính số hoán vị, chỉnh hợp, tổ hợp.
- Tính số hoán vị, chỉnh hợp, tổ hợp bằng máy tính cầm tay.

Danh sách các cầu thủ của Đội tuyển bóng đá quốc gia tham dự một trận đấu quốc tế có 23 cầu thủ gồm 3 thủ môn, 7 hậu vệ, 8 tiền vệ và 5 tiền đạo. Huấn luyện viên rất bí mật, không cho ai biết đội hình (danh sách 11 cầu thủ) sẽ ra sân. Trong cuộc họp báo, ông chỉ tiết lộ đội sẽ đá theo sơ đồ 3 – 4 – 3 (nghĩa là 3 hậu vệ, 4 tiền vệ, 3 tiền đạo và 1 thủ môn). Đội thủ đã có danh sách 23 cầu thủ (tên và vị trí của từng cầu thủ) và rất muốn dự đoán đội hình, họ xét hết các khả năng có thể xảy ra. Hỏi nếu đội thủ đã dự đoán được trước vị trí thủ môn thì họ sẽ phải xét bao nhiêu đội hình có thể?

#### 1. HOÁN VỊ

**HĐ1.** Một nhóm gồm bốn bạn Hà, Mai, Nam, Đạt xếp thành một hàng, từ trái sang phải, để tham gia một cuộc phỏng vấn.

- Hãy liệt kê ba cách sắp xếp bốn bạn trên theo thứ tự.
- Có bao nhiêu cách sắp xếp thứ tự bốn bạn trên để tham gia phỏng vấn?

**Nhận xét.** Mỗi cách sắp xếp thứ tự của bốn bạn tham gia phỏng vấn ở HĐ1 được gọi là một hoán vị của tập hợp gồm bốn bạn này. Số các hoán vị của bốn bạn ở HĐ1 là  $4 \cdot 3 \cdot 2 \cdot 1$ .

Tổng quát ta có

Một **hoán vị** của một tập hợp có  $n$  phần tử là một cách sắp xếp có thứ tự  $n$  phần tử đó (với  $n$  là một số tự nhiên,  $n \geq 1$ ).

Số các hoán vị của tập hợp có  $n$  phần tử, kí hiệu là  $P_n$ , được tính bằng công thức

$$P_n = n \cdot (n-1) \cdot (n-2) \cdots 2 \cdot 1.$$

**Chú ý.** Kí hiệu  $n \cdot (n-1) \cdot (n-2) \cdots 2 \cdot 1$  là  $n!$  (đọc là  $n$  giai thừa), ta có:  $P_n = n!$ . Chẳng hạn  $P_3 = 3! = 3 \cdot 2 \cdot 1 = 6$ .

Quy ước  $0! = 1$ .

» **Ví dụ 1.** Từ các chữ số 6, 7, 8 và 9 có thể lập được bao nhiêu số có bốn chữ số khác nhau?

**Giải**

Mỗi cách sắp xếp bốn chữ số đã cho để lập thành một số có bốn chữ số khác nhau là một hoán vị của bốn chữ số đó.

Vậy số các số có bốn chữ số khác nhau có thể lập được là  $P_4 = 4! = 24$ .

» **Luyện tập 1.** Trong một cuộc thi điền kinh gồm 6 vận động viên chạy trên 6 đường chạy. Hỏi có bao nhiêu cách xếp các vận động viên vào các đường chạy đó?

#### 2. CHỈNH HỢP

» **HĐ2.** Trong lớp 10T có bốn bạn Tuấn, Hương, Việt, Dung đủ tiêu chuẩn tham gia cuộc thi hùng biện của trường.

a) Giáo viên cần chọn ra hai bạn phụ trách nhóm trên. Hỏi có bao nhiêu cách chọn hai bạn từ bốn bạn nêu trên?

b) Có bao nhiêu cách chọn hai bạn, trong đó một bạn làm nhóm trưởng, một bạn làm nhóm phó?

**Nhận xét.** Trong HĐ2b, mỗi cách sắp xếp hai bạn từ bốn bạn làm nhóm trưởng, nhóm phó được gọi là một **chỉnh hợp** chập 2 của 4. Để tính số các chỉnh hợp ta dùng quy tắc nhân. Tổng quát ta có:

Một **chỉnh hợp chập  $k$  của  $n$**  là một cách sắp xếp có thứ tự  $k$  phần tử từ một tập hợp  $n$  phần tử (với  $k, n$  là các số tự nhiên,  $1 \leq k \leq n$ ).

Số các chỉnh hợp chập  $k$  của  $n$ , kí hiệu là  $A_n^k$ , được tính bằng công thức

$$A_n^k = n \cdot (n-1) \cdots (n-k+1) \text{ hay } A_n^k = \frac{n!}{(n-k)!} \quad (1 \leq k \leq n).$$

» **Ví dụ 2.** Một lớp có 30 học sinh, giáo viên cần chọn lần lượt 4 học sinh trồng bốn cây khác nhau để tham gia lễ phát động Tết trồng cây của trường. Hỏi giáo viên có bao nhiêu cách chọn?

###### Giải

Mỗi cách chọn lần lượt 4 trong 30 học sinh để trồng bốn cây khác nhau là một chỉnh hợp chập 4 của 30.

Vậy số cách chọn là  $A_{30}^4 = 657\,720$ .

##### Chú ý

- Hoán vị sắp xếp tất cả các phần tử của tập hợp, còn chỉnh hợp chọn ra một số phần tử và sắp xếp chúng.
- Mỗi hoán vị của  $n$  phần tử cũng chính là một chỉnh hợp chập  $n$  của  $n$  phần tử đó. Vì vậy  $P_n = A_n^n$ .

Ngày 28-11-1959, Chủ tịch Hồ Chí Minh đã phát động ngày “Tết trồng cây” với mong muốn: Trong mười năm, đất nước ta phong cảnh sẽ ngày càng tươi đẹp hơn, khí hậu điều hoà hơn, ...

» **Luyện tập 2.** Trong một giải đua ngựa gồm 12 con ngựa, người ta chỉ quan tâm đến 3 con ngựa: con nhanh nhất, nhanh nhì và nhanh thứ ba. Hỏi có bao nhiêu kết quả có thể xảy ra?

#### 3. TỔ HỢP

» **HĐ3.** Trở lại HĐ2.

- Hãy cho biết sự khác biệt khi chọn ra hai bạn ở câu HĐ2a và HĐ2b.
- Từ kết quả tính được ở câu HĐ2b (áp dụng chỉnh hợp), hãy chỉ ra cách tính kết quả ở câu HĐ2a.

##### Nhận xét

Mỗi cách chọn ra 2 bạn từ 4 bạn ở HĐ2a được gọi là một *tổ hợp* chập 2 của 4. Vì không cần sắp xếp thứ tự hai bạn được chọn nên số cách chọn sẽ giảm đi  $2!$  lần so với việc chọn ra hai bạn có sắp xếp thứ tự (ở câu HĐ2b).

Tổng quát ta có:

Một **tổ hợp chập  $k$  của  $n$**  là một cách chọn  $k$  phần tử từ một tập hợp  $n$  phần tử (với  $k, n$  là các số tự nhiên,  $0 \leq k \leq n$ ).

Số các tổ hợp chập  $k$  của  $n$ , kí hiệu là  $C_n^k$ , được tính bằng công thức

$$C_n^k = \frac{n!}{(n-k)!k!} \quad (0 \leq k \leq n).$$

##### Chú ý

- $C_n^k = \frac{A_n^k}{k!}$ .
- Chỉnh hợp và tổ hợp có điểm giống nhau là đều chọn một số phần tử trong một tập hợp, nhưng khác nhau ở chỗ, chỉnh hợp là chọn có xếp thứ tự, còn tổ hợp là chọn không xếp thứ tự.

» **Ví dụ 3.** Có 7 bạn học sinh muốn chơi cờ cá ngựa, nhưng mỗi ván chỉ có 4 người chơi. Hỏi có bao nhiêu cách chọn 4 bạn chơi cờ cá ngựa?

**Giải**

Mỗi cách chọn 4 bạn trong 7 bạn học sinh là một tổ hợp chập 4 của 7.

Vậy số cách chọn 4 bạn chơi cờ cá ngựa là  $C_7^4 = \frac{7!}{4!3!} = 35$ .

» **Luyện tập 3.** Trong ngân hàng để kiểm tra cuối học kì II môn Vật lí có 20 câu lí thuyết và 40 câu bài tập. Người ta chọn ra 2 câu lí thuyết và 3 câu bài tập trong ngân hàng để đề tạo thành một đề thi. Hỏi có bao nhiêu cách lập đề thi gồm 5 câu hỏi theo cách chọn như trên?

#### 4. ỨNG DỤNG HOÁN VỊ, CHỈNH HỢP, TỔ HỢP VÀO CÁC BÀI TOÁN ĐẾM

Các khái niệm hoán vị, chỉnh hợp và tổ hợp liên quan mật thiết với nhau và là những khái niệm cốt lõi của các phép đếm. Rất nhiều bài toán đếm liên quan đến việc lựa chọn, việc sắp xếp, vì vậy các công thức tính  $P_n$ ,  $A_n^k$ ,  $C_n^k$  sẽ được dùng rất nhiều.

Dưới đây ta xét một số ví dụ về các bài toán đếm.

» **Ví dụ 4.** Một lản anh Hưng đến Hà Nội và dự định từ Hà Nội tham quan Đền Hùng, Ninh Bình, Hạ Long, Đường Lâm và Bát Tràng, mỗi ngày đi tham quan một địa điểm rồi lại về Hà Nội.

- Hỏi anh Hưng có thể xếp được bao nhiêu lịch trình đi tham quan tất cả các địa điểm (ở đây lịch trình tính cả thứ tự tham quan).
- Anh Hưng có việc đột xuất phải về sớm, nên anh chỉ có 3 ngày để đi tham quan 3 địa điểm. Hỏi anh Hưng có bao nhiêu cách xếp lịch trình đi tham quan?

**Giải**

- Anh Hưng đi tham quan 5 địa điểm, mỗi cách xếp lịch trình là một cách chọn có thứ tự của 5 địa điểm trên. Vậy số cách xếp lịch trình chính bằng số các hoán vị của 5 địa điểm, và bằng

$$P_5 = 5! = 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 120 \text{ (cách).}$$

- Nếu anh Hưng chỉ có 3 ngày để đi tham quan 3 nơi, thì mỗi cách xếp lịch trình của anh chính là một cách chọn có thứ tự 3 địa điểm từ 5 địa điểm, tức là một chỉnh hợp chập 3 của 5.

Vậy số cách xếp lịch trình đi tham quan trong trường hợp này là

$$A_5^3 = \frac{5!}{(5-3)!} = \frac{5!}{2!} = 60 \text{ (cách).}$$

» **Ví dụ 5.** Giải bài toán trong tình huống mở đầu về đội hình của Đội tuyển bóng đá quốc gia.

**Giải**

Vì mỗi đội hình gồm có 1 thủ môn, 3 hậu vệ, 4 tiền vệ và 3 tiền đạo và đã biết trước vị trí thủ môn, nên để chọn đội hình ta cần thực hiện 3 công đoạn:

- Chọn hậu vệ là chọn 3 trong số 7 hậu vệ: có  $C_7^3 = 35$  (cách).
- Chọn tiền vệ là chọn 4 trong số 8 tiền vệ: có  $C_8^4 = 70$  (cách).
- Chọn tiền đạo là chọn 3 trong số 5 tiền đạo: có  $C_5^3 = 10$  (cách).

Vậy, theo quy tắc nhân, số các đội hình có thể có (khi đã biết vị trí thủ môn) là  $35 \cdot 70 \cdot 10 = 24\,500$ .

» **Vận dụng.** Một câu lạc bộ có 20 học sinh.

- a) Có bao nhiêu cách chọn 6 thành viên vào Ban quản lí?
- b) Có bao nhiêu cách chọn Trưởng ban, 1 Phó ban, 4 thành viên khác vào Ban quản lí?

#### 5. SỬ DỤNG MÁY TÍNH CẦM TAY

Ta có thể dùng máy tính cầm tay để tính số các hoán vị, chỉnh hợp và tổ hợp.

##### Hoán vị

Để tính  $n!$ , ta ấn phím theo trình tự sau:

Ấn số  $n$ , ấn phím  , sau đó ấn phím . Khi đó, kết quả sẽ hiển thị ở dòng kết quả.

*Ví dụ.* Tính  $9!$ .

Ta ấn liên tiếp các phím như sau:    

Dòng kết quả hiện ra 362 880.

##### Chỉnh hợp

Để tính  $A_n^k$  ta ấn phím theo trình tự sau:

Ấn số  $n$ , ấn phím  , ấn số  $k$ , sau đó ấn phím . Khi đó, kết quả sẽ hiển thị ở dòng kết quả.

*Ví dụ.* Tính  $A_{15}^2$ .

Ta ấn các phím theo trình tự sau:      

Dòng kết quả hiện ra 210.

##### Tổ hợp

Để tính  $C_n^k$  ta ấn phím theo trình tự sau:

Ấn số  $n$ , ấn phím  , ấn số  $k$ , sau đó ấn phím . Khi đó, kết quả sẽ hiển thị ở dòng kết quả.

*Ví dụ.* Tính  $C_{20}^5$ .

Ta ấn các phím theo trình tự sau:      

Dòng kết quả hiện ra 15 504.

## Bài 25. Nhị thức Newton

#### **THUẬT NGỮ**

- Khai triển
- Nhị thức

#### **KIẾN THỨC, KĨ NĂNG**

- Khai triển nhị thức Newton  $(a + b)^n$  bằng vận dụng tổ hợp với số mũ thấp ( $n = 4$  hoặc  $n = 5$ ).

Ở lớp 8, khi học về hằng đẳng thức, ta đã biết **khai triển**:

$$(a + b)^2 = a^2 + 2ab + b^2;$$

$$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3.$$

Quan sát các đơn thức ở vế phải của các đẳng thức trên, hãy nhận xét về quy luật số mũ của  $a$  và  $b$ . Có thể tìm được cách tính các hệ số của đơn thức trong khai triển  $(a + b)^n$  khi  $n \in \{4; 5\}$  không?

**HĐ1.** Hãy xây dựng sơ đồ hình cây của tích hai **nhị thức**  $(a + b) \cdot (c + d)$  như sau:

- Từ một điểm gốc, kẻ các mũi tên, mỗi mũi tên tương ứng với một đơn thức (gọi là nhãn của mũi tên) của nhị thức thứ nhất (H.8.6);
- Từ ngọn của mỗi mũi tên đã xây dựng, kẻ các mũi tên, mỗi mũi tên tương ứng với một đơn thức của nhị thức thứ hai;
- Tại ngọn của các mũi tên xây dựng tại bước sau cùng, ghi lại tích của các nhãn của các mũi tên đi từ điểm gốc đến đầu mút đó.

Sơ đồ hình cây của  $(a + b) \cdot (c + d)$

Hình 8.6

Hãy lấy tổng của các tích nhận được và so sánh kết quả với khai triển của tích  $(a + b) \cdot (c + d)$ .

**HĐ2.** Hãy cho biết các đơn thức còn thiếu (...) trong sơ đồ hình cây (H.8.7) của tích  $(a + b) \cdot (a + b) \cdot (a + b)$ .

Có bao nhiêu tích nhận được lần lượt bằng  $a^3, a^2b, ab^2, b^3$ ?

Hãy so sánh chúng với các hệ số nhận được khi khai triển  $(a + b)^3$ .

Sơ đồ hình cây của  $(a + b) \cdot (a + b) \cdot (a + b)$ .

Hình 8.7

**Nhận xét.** Các tích nhận được từ sơ đồ hình cây của một tích các đa thức giống như cách lấy ra một đơn thức từ mỗi đa thức rồi nhân lại với nhau. Hơn nữa, tổng của chúng cho ta khai triển của tích các đa thức đã cho.

Chẳng hạn, trong sơ đồ hình cây (H.8.8) của  $(a + b) \cdot (c + d)$  thì các tích nhận được là  $a \cdot c$ ,  $a \cdot d$ ,  $b \cdot c$ ,  $b \cdot d$  cũng chính là các tích nhận được khi ta lấy một hạng tử của nhị thức thứ nhất (là  $a$  hoặc  $b$ ) nhân với một hạng tử của nhị thức thứ hai (là  $c$  hoặc  $d$ ). Ta có

$$(a + b) \cdot (c + d) = a \cdot c + a \cdot d + b \cdot c + b \cdot d.$$

Hình 8.8

» **HĐ3.** Hãy vẽ sơ đồ hình cây của khai triển  $(a + b)^4$  được mô tả như Hình 8.9. Sau khi khai triển, ta thu được một tổng gồm  $2^4$  (theo quy tắc nhân) đơn thức có dạng  $x \cdot y \cdot z \cdot t$ , trong đó mỗi  $x, y, z, t$  là  $a$  hoặc  $b$ . Chẳng hạn, nếu  $x, y, t$  là  $a$ , còn  $z$  là  $b$  thì ta có đơn thức  $a \cdot a \cdot b \cdot a$ , thu gọn là  $a^3b$ . Để có đơn thức này, thì trong 4 nhân tử  $x, y, z, t$  có 1 nhân tử là  $b$ , 3 nhân tử còn lại là  $a$ . Khi đó số đơn thức đồng dạng với  $a^3b$  trong tổng là  $C_4^1$ .

Sơ đồ hình cây của  $(a + b)^4$

Hình 8.9

Lập luận tương tự trên, dùng kiến thức về tổ hợp, hãy cho biết trong tổng nêu trên, có bao nhiêu đơn thức đồng dạng với mỗi đơn thức thu gọn sau:

- $a^4$ ; •  $a^3b$ ; •  $a^2b^2$ ; •  $ab^3$ ; •  $b^4$ ?

Từ HĐ3, sau khi rút gọn các đơn thức đồng dạng ta thu được:

$$(a + b)^4 = C_4^0 a^4 + C_4^1 a^3 b + C_4^2 a^2 b^2 + C_4^3 a b^3 + C_4^4 b^4 \\ = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4.$$

Trong khai triển nhị thức Newton  $(a + b)^4$ , các đơn thức có bậc là 4.

» **Ví dụ 1.** Khai triển  $(2x + 1)^4$ .

**Giải**

Thay  $a = 2x$  và  $b = 1$  trong công thức khai triển của  $(a + b)^4$ , ta được:

$$(2x + 1)^4 = (2x)^4 + 4 \cdot (2x)^3 \cdot 1 + 6 \cdot (2x)^2 \cdot 1^2 + 4 \cdot (2x) \cdot 1^3 + 1^4 \\ = 16x^4 + 32x^3 + 24x^2 + 8x + 1.$$

» **Luyện tập 1.** Khai triển  $(x - 2)^4$ .

» **HĐ4.** Tương tự như HĐ3, sau khi khai triển  $(a + b)^5$ , ta thu được một tổng gồm 2<sup>5</sup> đơn thức có dạng  $x \cdot y \cdot z \cdot t \cdot u$ , trong đó mỗi kí hiệu  $x, y, z, t, u$  là  $a$  hoặc  $b$ . Chẳng hạn, nếu  $x, z$  là  $a$ , còn  $y, t, u$  là  $b$  thì ta có đơn thức  $a \cdot b \cdot a \cdot b \cdot b$ , thu gọn là  $a^2b^3$ . Để có đơn thức này, thì trong 5 nhân tử  $x, y, z, t, u$  có 3 nhân tử là  $b$ , 2 nhân tử còn lại là  $a$ . Khi đó số đơn thức đồng dạng với  $a^2b^3$  trong tổng là  $C_5^3$ .

Lập luận tương tự như trên, dùng kiến thức về tổ hợp, hãy cho biết, trong tổng nhận được nêu trên có bao nhiêu đơn thức đồng dạng với mỗi đơn thức thu gọn sau:

- $a^5$ ;
- $a^4b$ ;
- $a^3b^2$ ;
- $a^2b^3$ ;
- $ab^4$ ;
- $b^5$  ?

Từ HĐ4, sau khi rút gọn các đơn thức đồng dạng ta thu được:

$$\begin{aligned} (a + b)^5 &= C_5^0 a^5 + C_5^1 a^4 b + C_5^2 a^3 b^2 + C_5^3 a^2 b^3 + C_5^4 ab^4 + C_5^5 b^5 \\ &= a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5. \end{aligned}$$

Trong khai triển nhị thức Newton  $(a + b)^5$ , các đơn thức có bậc là 5.

» **Ví dụ 2.** Khai triển  $(x + 3)^5$ .

**Giải**

Thay  $a = x$  và  $b = 3$  trong công thức khai triển của  $(a + b)^5$ , ta được:

$$\begin{aligned} (x + 3)^5 &= x^5 + 5 \cdot x^4 \cdot 3 + 10 \cdot x^3 \cdot 3^2 + 10 \cdot x^2 \cdot 3^3 + 5 \cdot x \cdot 3^4 + 3^5 \\ &= x^5 + 15x^4 + 90x^3 + 270x^2 + 405x + 243. \end{aligned}$$

» **Luyện tập 2.** Khai triển  $(3x - 2)^5$ .

**Nhận xét.** Các công thức khai triển  $(a + b)^n$  với  $n \in \{4; 5\}$ , là một công cụ hiệu quả để tính chính xác hoặc xấp xỉ một số đại lượng mà không cần dùng máy tính.

» **Vận dụng**

- a) Dùng hai số hạng đầu tiên trong khai triển của  $(1 + 0,05)^4$  để tính giá trị gần đúng của  $1,05^4$ .
- b) Dùng máy tính cầm tay tính giá trị của  $1,05^4$  và tính sai số tuyệt đối của giá trị gần đúng nhận được ở câu a.
