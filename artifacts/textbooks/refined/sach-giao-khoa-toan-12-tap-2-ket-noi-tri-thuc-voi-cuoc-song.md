# CHƯƠNG IV. NGUYÊN HÀM VÀ TÍCH PHÂN

## Bài 11. Nguyên hàm

### THUẬT NGỮ

- Nguyên hàm
- Họ các nguyên hàm
- Bảng nguyên hàm

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết khái niệm nguyên hàm của một hàm số.
- Giải thích một số tính chất của nguyên hàm.
- Tìm nguyên hàm của một số hàm số sơ cấp thường gặp.

Một máy bay di chuyển ra đến đường băng và bắt đầu chạy đà để cất cánh. Giả sử vận tốc của máy bay khi chạy đà được cho bởi  $v(t) = 5 + 3t$  (m/s), với  $t$  là thời gian (tính bằng giây) kể từ khi máy bay bắt đầu chạy đà. Sau 30 giây thì máy bay cất cánh rời đường băng. quãng đường máy bay đã di chuyển từ khi bắt đầu chạy đà đến khi rời đường băng là bao nhiêu mét?

Ta cần tìm quãng đường  $S(t)$  mà máy bay di chuyển được sau  $t$  giây kể từ lúc bắt đầu chạy đà. Từ ý nghĩa cơ học của đạo hàm, ta biết rằng  $S'(t) = v(t)$ . Như vậy, ta cần tìm một hàm số có đạo hàm bằng hàm số  $v(t)$  đã cho. Bài toán này dẫn đến một khái niệm quan trọng trong Toán học, đó là khái niệm *nguyên hàm*.

Hình 4.1

### 1. NGUYÊN HÀM CỦA MỘT HÀM SỐ

##### » HĐ1. Nhận biết khái niệm nguyên hàm

Cho hai hàm số  $f(x) = x^2 + 1$  và  $F(x) = \frac{1}{3}x^3 + x$ , với  $x \in \mathbb{R}$ .

- Tính đạo hàm của hàm số  $F(x)$ .
- $F'(x)$  và  $f(x)$  có bằng nhau không?

Cho hàm số  $f(x)$  xác định trên một khoảng  $K$  (hoặc một đoạn, hoặc một nửa khoảng). Hàm số  $F(x)$  được gọi là một **nguyên hàm** của hàm số  $f(x)$  trên  $K$  nếu  $F'(x) = f(x)$  với mọi  $x$  thuộc  $K$ .

**Chú ý.** Trường hợp  $K = [a; b]$  thì các đẳng thức  $F'(a) = f(a)$  và  $F'(b) = f(b)$  được hiểu là đạo hàm bên phải tại điểm  $x = a$  và đạo hàm bên trái tại điểm  $x = b$  của hàm số  $F(x)$ , tức là

$$\lim_{x \rightarrow a^+} \frac{F(x) - F(a)}{x - a} = f(a) \text{ và } \lim_{x \rightarrow b^-} \frac{F(x) - F(b)}{x - b} = f(b).$$

» **Ví dụ 1.** Cho hàm số  $f(x) = x^2 - 2x$ . Trong các hàm số cho dưới đây, hàm số nào là một nguyên hàm của hàm số  $f(x)$  trên  $\mathbb{R}$ ?

a)  $F(x) = \frac{x^3}{3} - x^2$ ;                      b)  $G(x) = \frac{x^3}{3} + x^2$ .

**Giải**

Ta có:  $F'(x) = x^2 - 2x$ ,  $G'(x) = x^2 + 2x$ .

Vì  $F'(x) = f(x)$  với mọi  $x \in \mathbb{R}$  nên hàm số  $F(x)$  là một nguyên hàm của  $f(x)$  trên  $\mathbb{R}$ .

Hàm số  $G(x)$  không là nguyên hàm của  $f(x)$  trên  $\mathbb{R}$  vì với  $x = 1$ , ta có

$$G'(1) = 3 \neq -1 = f(1).$$

» **Luyện tập 1.** Hàm số nào dưới đây là một nguyên hàm của hàm số  $f(x) = x + \frac{1}{x}$  trên khoảng  $(0; +\infty)$ ?

a)  $F(x) = \frac{1}{2}x^2 + \ln x$ ;                      b)  $G(x) = \frac{x^2}{2} - \ln x$ .

» **HĐ2.** Nhận biết họ nguyên hàm của một hàm số

a) Chứng minh rằng hàm số  $F(x) = \frac{x^4}{4}$  là một nguyên hàm của hàm số  $f(x) = x^3$  trên  $\mathbb{R}$ .

b) Hàm số  $G(x) = \frac{x^4}{4} + C$  (với  $C$  là hằng số) có là một nguyên hàm của hàm số  $f(x)$  trên  $\mathbb{R}$  không? Vì sao?

Giả sử hàm số  $F(x)$  là một nguyên hàm của  $f(x)$  trên  $K$ . Khi đó:

a) Với mỗi hằng số  $C$ , hàm số  $F(x) + C$  cũng là một nguyên hàm của  $f(x)$  trên  $K$ ;

b) Nếu hàm số  $G(x)$  là một nguyên hàm của  $f(x)$  trên  $K$  thì tồn tại một hằng số  $C$  sao cho  $G(x) = F(x) + C$  với mọi  $x \in K$ .

Như vậy, nếu  $F(x)$  là một nguyên hàm của  $f(x)$  trên  $K$  thì mọi nguyên hàm của  $f(x)$  trên  $K$  đều có dạng  $F(x) + C$  ( $C$  là hằng số). Ta gọi  $F(x) + C$  ( $C \in \mathbb{R}$ ) là **họ các nguyên hàm** của  $f(x)$  trên  $K$ , kí hiệu bởi  $\int f(x) dx$ .

###### Chú ý

- a) Để tìm họ các nguyên hàm (gọi tắt là tìm nguyên hàm) của hàm số  $f(x)$  trên  $K$ , ta chỉ cần tìm một nguyên hàm  $F(x)$  của  $f(x)$  trên  $K$  và khi đó

$$\int f(x)dx = F(x) + C, \quad C \text{ là hằng số.}$$

- b) Người ta chứng minh được rằng, nếu hàm số  $f(x)$  liên tục trên khoảng  $K$  thì  $f(x)$  có nguyên hàm trên khoảng đó.  
 c) Biểu thức  $f(x)dx$  gọi là vi phân của nguyên hàm  $F(x)$ , kí hiệu là  $dF(x)$ . Vậy  $dF(x) = F'(x)dx = f(x)dx$ .  
 d) Khi tìm nguyên hàm của một hàm số mà không chỉ rõ tập  $K$ , ta hiểu là tìm nguyên hàm của hàm số đó trên tập xác định của nó.

Hình 4.2. Mối quan hệ giữa đạo hàm và nguyên hàm

» **Ví dụ 2.** Tìm một nguyên hàm của hàm số  $f(x) = x^2$  trên  $\mathbb{R}$ . Từ đó hãy tìm  $\int x^2 dx$ .

**Giải**

Vì  $\left(\frac{x^3}{3}\right)' = \frac{3x^2}{3} = x^2$  nên  $F(x) = \frac{x^3}{3}$  là một nguyên hàm của hàm số  $f(x)$  trên  $\mathbb{R}$ .

Do đó,  $\int x^2 dx = \frac{x^3}{3} + C$ .

» **Luyện tập 2.** Tìm  $\int x^3 dx$ .

### 2. TÍNH CHẤT CƠ BẢN CỦA NGUYÊN HÀM

» **HĐ3.** Khám phá nguyên hàm của tích một hàm số với một hằng số khác 0

Cho  $f(x)$  là hàm số liên tục trên  $K$ ,  $k$  là một hằng số khác 0. Giả sử  $F(x)$  là một nguyên hàm của  $f(x)$  trên  $K$ .

- a) Chứng minh  $kF(x)$  là một nguyên hàm của hàm số  $kf(x)$  trên  $K$ .  
 b) Nêu nhận xét về  $\int kf(x) dx$  và  $k \int f(x) dx$ .

$$\int kf(x) dx = k \int f(x) dx \quad (k \neq 0).$$

» **Ví dụ 3.** Sử dụng kết quả của Ví dụ 2, hãy tìm:

- a)  $\int 3x^2 dx$ ;

##### » **Luyện tập 3.** Cho hàm số $f(x) = x^n (n \in \mathbb{N}^*)$ .

- a) Chứng minh rằng hàm số  $F(x) = \frac{x^{n+1}}{n+1}$  là một nguyên hàm của hàm số  $f(x)$ . Từ đó tìm  $\int x^n dx$ .
- b) Từ kết quả câu a, tìm  $\int kx^n dx$  ( $k$  là hằng số thực khác 0).

##### » **HĐ4.** Khám phá nguyên hàm của một tổng

Cho  $f(x)$  và  $g(x)$  là hai hàm số liên tục trên  $K$ . Giả sử  $F(x)$  là một nguyên hàm của  $f(x)$ ,  $G(x)$  là một nguyên hàm của  $g(x)$  trên  $K$ .

- a) Chứng minh  $F(x) + G(x)$  là một nguyên hàm của hàm số  $f(x) + g(x)$  trên  $K$ .
- b) Nêu nhận xét về  $\int [f(x) + g(x)] dx$  và  $\int f(x) dx + \int g(x) dx$ .

- $\int [f(x) + g(x)] dx = \int f(x) dx + \int g(x) dx$ .
- $\int [f(x) - g(x)] dx = \int f(x) dx - \int g(x) dx$ .

##### » **Ví dụ 4.** Sử dụng kết quả của Luyện tập 3 và tính chất cơ bản của nguyên hàm, hãy tìm:

- a)  $\int (x^2 + x) dx$ ;                      b)  $\int (4x^3 - 3x^2) dx$ .

Giải

Ta có:

- a)  $\int (x^2 + x) dx = \int x^2 dx + \int x dx = \frac{x^3}{3} + \frac{x^2}{2} + C$ .
- b)  $\int (4x^3 - 3x^2) dx = 4 \int x^3 dx - 3 \int x^2 dx = x^4 - x^3 + C$ .

##### » **Luyện tập 4.** Tìm:

- a)  $\int (3x^2 + 1) dx$ ;                      b)  $\int (2x - 1)^2 dx$ .

###### » **Ví dụ 5.** Giải bài toán trong tình huống mở đầu.

Giải

Gọi  $S(t)$  ( $0 \leq t \leq 30$ ) là quãng đường máy bay di chuyển được sau  $t$  giây kể từ lúc bắt đầu chạy đà.

Ta có  $v(t) = S'(t)$ . Do đó,  $S(t)$  là một nguyên hàm của hàm số vận tốc  $v(t)$ . Sử dụng tính chất của nguyên hàm ta được

$$S(t) = \int v(t) dt = \int (5 + 3t) dt = 5 \int dt + 3 \int t dt = 5t + \frac{3}{2}t^2 + C.$$

Theo giả thiết,  $S(0) = 0$  nên  $C = 0$  và ta được  $S(t) = \frac{3}{2}t^2 + 5t$  (m).

Máy bay rời đường băng khi  $t = 30$  (giây) nên  $S = S(30) = \frac{3}{2} \cdot 30^2 + 5 \cdot 30 = 1\,500$  (m).

Vậy quãng đường máy bay đã di chuyển từ khi bắt đầu chạy đà đến khi nó rời đường băng là  $S = 1\,500$  m.

» **Vận dụng.** Doanh thu bán hàng của một công ty khi bán một loại sản phẩm là số tiền  $R(x)$  (triệu đồng) thu được khi  $x$  đơn vị sản phẩm được bán ra. Tốc độ biến động (thay đổi) của doanh thu khi  $x$  đơn vị sản phẩm đã được bán là hàm số  $M_R(x) = R'(x)$ . Một công ty công nghệ cho biết, tốc độ biến đổi của doanh thu khi bán một loại con chíp của hãng được cho bởi  $M_R(x) = 300 - 0,1x$ , ở đó  $x$  là số lượng chíp đã bán. Tìm doanh thu của công ty khi đã bán 1 000 con chíp.

*Hướng dẫn:* Vì  $R'(x) = M_R(x)$  nên doanh thu  $R(x)$  là một nguyên hàm của  $M_R(x)$ .

### 3. NGUYÊN HÀM CỦA MỘT SỐ HÀM SÔ THƯỜNG GẶP

#### a) Nguyên hàm của hàm số lũy thừa

Hàm số  $y = x^\alpha$ , với  $\alpha \in \mathbb{R}$ , được gọi là *hàm số lũy thừa*.

Tập xác định của hàm số lũy thừa  $y = x^\alpha$  tùy thuộc vào giá trị của  $\alpha$ . Cụ thể:

- Với  $\alpha$  nguyên dương, tập xác định là  $\mathbb{R}$ ;
- Với  $\alpha$  nguyên âm hoặc bằng 0, tập xác định là  $\mathbb{R} \setminus \{0\}$ ;
- Với  $\alpha$  không nguyên, tập xác định là  $(0; +\infty)$ .

Ở lớp 11, ta đã biết đạo hàm của các hàm số  $y = x^n$  ( $n \in \mathbb{N}^*$ ) và  $y = \sqrt{x}$  là:

$$(x^n)' = nx^{n-1};$$

$$(\sqrt{x})' = \frac{1}{2\sqrt{x}} \text{ hay } \left(x^{\frac{1}{2}}\right)' = \frac{1}{2}x^{\frac{1}{2}-1} \quad (x > 0).$$

Tổng quát, người ta chứng minh được

Hàm số lũy thừa  $y = x^\alpha$  ( $\alpha \in \mathbb{R}$ ) có đạo hàm với mọi  $x > 0$  và

$$(x^\alpha)' = \alpha x^{\alpha-1}.$$

 Bằng cách viết lại các hàm số sau dưới dạng hàm số lũy thừa  $y = x^\alpha$  ( $x > 0$ ), hãy tính đạo hàm của các hàm số sau với  $x > 0$ :  $y = \frac{1}{x^4}$ ;  $y = x^{\sqrt{2}}$ ;  $y = \frac{1}{\sqrt[3]{x}}$ .

##### » **HĐ5.** Khám phá nguyên hàm của hàm số lũy thừa

a) Với  $\alpha \neq -1$ , tính đạo hàm của hàm số  $y = \frac{x^{\alpha+1}}{\alpha+1}$  ( $x > 0$ ).

b) Cho hàm số  $y = \ln|x|$  ( $x \neq 0$ ). Tính đạo hàm của hàm số này trong hai trường hợp:  $x > 0$  và  $x < 0$ .

Từ kết quả của HĐ5, ta có

- $\int x^\alpha dx = \frac{x^{\alpha+1}}{\alpha+1} + C \quad (\alpha \neq -1).$
- $\int \frac{1}{x} dx = \ln|x| + C.$

##### » **Ví dụ 6.** Tìm:

a)  $\int \sqrt{x} dx \quad (x > 0);$

b)  $\int \frac{1}{x^3} dx;$

c)  $\int \left(2x^2 + \frac{3}{\sqrt{x}}\right) dx.$

**Giải**

$$a) \int \sqrt{x} dx = \int x^{\frac{1}{2}} dx = \frac{x^{\frac{1}{2}+1}}{\frac{1}{2}+1} + C = \frac{2}{3} x^{\frac{3}{2}} + C = \frac{2}{3} x \sqrt{x} + C.$$

$$b) \int \frac{1}{x^3} dx = \int x^{-3} dx = \frac{x^{-3+1}}{-3+1} + C = -\frac{1}{2} x^{-2} + C = -\frac{1}{2x^2} + C.$$

$$c) \int \left( 2x^2 + \frac{3}{\sqrt{x}} \right) dx = \int 2x^2 dx + \int \frac{3}{\sqrt{x}} dx = 2 \int x^2 dx + 3 \int \frac{1}{\sqrt{x}} dx = \frac{2}{3} x^3 + 6\sqrt{x} + C.$$

» **Luyện tập 5.** Tìm:

$$a) \int \frac{1}{x^4} dx;$$

$$b) \int x \sqrt{x} dx \quad (x > 0);$$

$$c) \int \left( \frac{3}{x} - 5\sqrt[3]{x} \right) dx \quad (x > 0).$$

#### b) Nguyên hàm của hàm số lượng giác

» **HĐ6.** Khám phá nguyên hàm của hàm số lượng giác

a) Tính đạo hàm của các hàm số sau và nêu kết quả tương ứng vào bảng dưới đây.

|         |          |          |          |          |
|---------|----------|----------|----------|----------|
| $F(x)$  | $\sin x$ | $\cos x$ | $\tan x$ | $\cot x$ |
| $F'(x)$ | ?        | ?        | ?        | ?        |

b) Sử dụng kết quả ở câu a, tìm nguyên hàm của các hàm số cho trong bảng dưới đây.

|                |          |          |                      |                      |
|----------------|----------|----------|----------------------|----------------------|
| $f(x)$         | $\cos x$ | $\sin x$ | $\frac{1}{\cos^2 x}$ | $\frac{1}{\sin^2 x}$ |
| $\int f(x) dx$ | ?        | ?        | ?                    | ?                    |

Từ kết quả của HĐ6, ta có

$$\begin{aligned} & \bullet \int \cos x dx = \sin x + C; & \bullet \int \sin x dx = -\cos x + C; \\ & \bullet \int \frac{1}{\cos^2 x} dx = \tan x + C; & \bullet \int \frac{1}{\sin^2 x} dx = -\cot x + C. \end{aligned}$$

» **Ví dụ 7.** Tìm:

$$a) \int (\cos x + \sin x) dx;$$

$$b) \int \left( 2 \cos x - \frac{1}{\cos^2 x} \right) dx.$$

**Giải**

$$a) \int (\cos x + \sin x) dx = \int \cos x dx + \int \sin x dx = \sin x - \cos x + C.$$

$$b) \int \left( 2 \cos x - \frac{1}{\cos^2 x} \right) dx = 2 \int \cos x dx - \int \frac{1}{\cos^2 x} dx = 2 \sin x - \tan x + C.$$

» **Luyện tập 6.** Tìm:

$$a) \int (3 \cos x - 4 \sin x) dx;$$

$$b) \int \left( \frac{1}{\cos^2 x} - \frac{1}{\sin^2 x} \right) dx.$$

#### c) Nguyên hàm của hàm số mũ

##### » HD7. Khám phá nguyên hàm của hàm số mũ

a) Tính đạo hàm của các hàm số sau và nêu kết quả tương ứng vào bảng dưới đây.

|         |       |                                    |
|---------|-------|------------------------------------|
| $F(x)$  | $e^x$ | $\frac{a^x}{\ln a} (0 < a \neq 1)$ |
| $F'(x)$ | ?     | ?                                  |

b) Sử dụng kết quả ở câu a, tìm nguyên hàm của các hàm số cho trong bảng dưới đây.

|                |       |                      |
|----------------|-------|----------------------|
| $f(x)$         | $e^x$ | $a^x (0 < a \neq 1)$ |
| $\int f(x) dx$ | ?     | ?                    |

Từ kết quả của HD7, ta có

- $\int e^x dx = e^x + C.$
- $\int a^x dx = \frac{a^x}{\ln a} + C (0 < a \neq 1).$

##### » Ví dụ 8. Tìm:

a)  $\int 2^x dx;$       b)  $\int \frac{1}{3^x} dx;$       c)  $\int (2e^x - 5^x) dx.$

Giải

a)  $\int 2^x dx = \frac{2^x}{\ln 2} + C.$

b)  $\int \frac{1}{3^x} dx = \int \left(\frac{1}{3}\right)^x dx = \frac{\left(\frac{1}{3}\right)^x}{\ln \frac{1}{3}} + C = -\frac{1}{3^x \ln 3} + C.$

c)  $\int (2e^x - 5^x) dx = 2 \int e^x dx - \int 5^x dx = 2e^x - \frac{5^x}{\ln 5} + C.$

##### » Luyện tập 7. Tìm:

a)  $\int 4^x dx;$       b)  $\int \frac{1}{e^x} dx;$       c)  $\int \left(2 \cdot 3^x - \frac{1}{3} \cdot 7^x\right) dx.$

Ta tổng kết lại bảng nguyên hàm của một số hàm số thường gặp như sau.

|                                                                         |                                                      |
|-------------------------------------------------------------------------|------------------------------------------------------|
| $\int 0 dx = C$                                                         | $\int 1 dx = x + C$                                  |
| $\int x^\alpha dx = \frac{x^{\alpha+1}}{\alpha+1} + C (\alpha \neq -1)$ | $\int \frac{1}{x} dx = \ln x  + C$                   |
| $\int e^x dx = e^x + C$                                                 | $\int a^x dx = \frac{a^x}{\ln a} + C (0 < a \neq 1)$ |
| $\int \cos x dx = \sin x + C$                                           | $\int \sin x dx = -\cos x + C$                       |
| $\int \frac{1}{\sin^2 x} dx = -\cot x + C$                              | $\int \frac{1}{\cos^2 x} dx = \tan x + C$            |

Dựa vào bảng nguyên hàm của các hàm số thường gặp và tính chất cơ bản của nguyên hàm, ta có thể tìm được nguyên hàm của nhiều hàm số khác.

## Bài 12. Tích phân

#### THUẬT NGỮ

- Tích phân
- Cận tích phân
- Hàm số dưới dấu tích phân

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết định nghĩa và các tính chất của tích phân.
- Tính tích phân trong những trường hợp đơn giản.
- Vận dụng tích phân để giải một số bài toán liên quan đến thực tiễn.

Một ô tô đang chạy với vận tốc 20 m/s thì người lái đạp phanh. Sau khi đạp phanh, ô tô chuyển động chậm dần đều với vận tốc  $v(t) = -40t + 20$  (m/s), trong đó  $t$  là thời gian tính bằng giây kể từ lúc đạp phanh. Hỏi từ lúc đạp phanh đến khi dừng hẳn, ô tô còn di chuyển bao nhiêu mét?

### 1. KHÁI NIỆM TÍCH PHÂN

#### a) Diện tích hình thang cong

###### Hình thang cong

Hình phẳng giới hạn bởi đồ thị  $y = f(x)$ , trục hoành và hai đường thẳng  $x = a$ ,  $x = b$  ( $a < b$ ), trong đó  $f(x)$  là hàm liên tục không âm trên đoạn  $[a; b]$ , gọi là một *hình thang cong*.

» **Ví dụ 1.** Những hình phẳng được tô màu dưới đây có phải là hình thang cong không?

Hình 4.4

###### Giải

Hình 4.4a là hình thang cong giới hạn bởi đồ thị  $y = x^2$ , trục hoành và hai đường thẳng  $x = 1$ ,  $x = 2$ .

Hình 4.4b là hình thang cong giới hạn bởi đồ thị  $y = x^3$ , trục hoành và hai đường thẳng  $x = 0$ ,  $x = 1$ .

##### » H01. Diện tích của hình thang

Kí hiệu  $T$  là hình thang vuông giới hạn bởi đường thẳng  $y = x + 1$ , trục hoành và hai đường thẳng  $x = 1, x = t$  ( $1 \leq t \leq 4$ ) (H.4.3).

- Tính diện tích  $S$  của  $T$  khi  $t = 4$ .
- Tính diện tích  $S(t)$  của  $T$  khi  $t \in [1, 4]$ .
- Chứng minh rằng  $S(t)$  là một nguyên hàm của hàm số  $f(t) = t + 1, t \in [1, 4]$  và diện tích  $S = S(4) - S(1)$ .

Hình 4.3

##### » H02. Diện tích của hình thang cong

Xét hình thang cong giới hạn bởi đồ thị  $y = x^2$ , trục hoành và hai đường thẳng  $x = 1, x = 2$ .

Ta muốn tính diện tích  $S$  của hình thang cong này.

- Với mỗi  $x \in [1, 2]$ , gọi  $S(x)$  là diện tích phần hình thang cong đã cho nằm giữa hai đường thẳng vuông góc với trục  $Ox$  tại điểm có hoành độ bằng 1 và  $x$  (H.4.5).

Cho  $h > 0$  sao cho  $x + h < 2$ . So sánh hiệu  $S(x + h) - S(x)$  với diện tích hai hình chữ nhật  $MNPQ$  và  $MNEF$  (H.4.6). Từ đó suy ra

$$0 \leq \frac{S(x + h) - S(x)}{h} - x^2 \leq 2xh + h^2.$$

- Cho  $h < 0$  sao cho  $x + h > 1$ . Tương tự phần a, đánh giá hiệu  $S(x) - S(x + h)$  và từ đó suy ra

$$2xh + h^2 \leq \frac{S(x + h) - S(x)}{h} - x^2 \leq 0.$$

- Từ kết quả phần a và phần b, suy ra với mọi  $h \neq 0$ , ta có

$$\left| \frac{S(x + h) - S(x)}{h} - x^2 \right| \leq 2x|h| + h^2.$$

Từ đó chứng minh  $S'(x) = x^2, x \in (1, 2)$ .

Người ta chứng minh được  $S'(1) = 1, S'(2) = 4$ , tức là  $S(x)$  là một nguyên hàm của  $x^2$  trên  $[1, 2]$ .

- Từ kết quả của phần c, ta có  $S(x) = \frac{x^3}{3} + C$ . Sử dụng điều này với lưu ý  $S(1) = 0$  và diện tích cần tính  $S = S(2)$ , hãy tính  $S$ .

Gọi  $F(x)$  là một nguyên hàm tuỳ ý của  $f(x) = x^2$  trên  $[1, 2]$ . Hãy so sánh  $S$  và  $F(2) - F(1)$ .

Tổng quát, ta có:

Hình 4.5

Hình 4.6

###### Định lí 1

Nếu hàm số  $f(x)$  liên tục và không âm trên đoạn  $[a; b]$ , thì diện tích  $S$  của hình thang cong giới hạn bởi đồ thị  $y = f(x)$ , trục hoành và hai đường thẳng  $x = a, x = b$  là  $S = F(b) - F(a)$ , trong đó  $F(x)$  là một nguyên hàm của hàm số  $f(x)$  trên đoạn  $[a; b]$ .

Hình 4.7

» **Ví dụ 2.** Tính diện tích  $S$  của hình thang cong giới hạn bởi đồ thị hàm số  $y = f(x) = x^3$ , trục hoành và hai đường thẳng  $x = 1, x = 2$ .

**Giải (H.4.8)**

Một nguyên hàm của hàm số  $f(x) = x^3$  là  $F(x) = \frac{x^4}{4}$ .

Do đó, diện tích của hình thang cong cần tính là

$$S = F(2) - F(1) = \frac{2^4}{4} - \frac{1^4}{4} = \frac{15}{4}.$$

Hình 4.8

#### b) Định nghĩa tích phân

» **HĐ3.** Nhận biết khái niệm tích phân

Giả sử  $f(x)$  là hàm số liên tục trên đoạn  $[a; b]$ ,  $F(x)$  và  $G(x)$  là hai nguyên hàm tuỳ ý của  $f(x)$  trên đoạn  $[a; b]$ . Chứng minh rằng  $F(b) - F(a) = G(b) - G(a)$ .

Từ đó, ta có định nghĩa sau:

Chú ý  $G(x) = F(x) + C$ ,  $C$  là hằng số.

Cho  $f(x)$  là hàm số liên tục trên đoạn  $[a; b]$ . Nếu  $F(x)$  là một nguyên hàm của hàm số  $f(x)$  trên đoạn  $[a; b]$  thì hiệu số  $F(b) - F(a)$  được gọi là **tích phân** từ  $a$  đến  $b$  của hàm số  $f(x)$ , kí hiệu là  $\int_a^b f(x) dx$ .

###### Chú ý

a) Hiệu  $F(b) - F(a)$  thường được kí hiệu là  $F(x) \Big|_a^b$ .

Như vậy

$$\int_a^b f(x) dx = F(x) \Big|_a^b.$$

b) Ta gọi  $\int_a^b$  là dấu tích phân,  $a$  là **cận dưới**,  $b$  là **cận trên**,  $f(x)dx$  là biểu thức dưới dấu tích phân và  $f(x)$  là **hàm số dưới dấu tích phân**.

c) Trong trường hợp  $a = b$  hoặc  $a > b$ , ta quy ước:

$$\int_a^a f(x) dx = 0; \quad \int_a^b f(x) dx = -\int_b^a f(x) dx.$$

Tích phân không phụ thuộc vào cách kí hiệu biến:

$$\int_a^b f(x) dx = \int_a^b f(t) dt = \int_a^b f(u) du.$$

###### » **Ví dụ 3.** Tính:

a)  $\int_{-1}^3 x^2 dx$ ;

b)  $\int_0^{\frac{\pi}{6}} \cos t dt$ ;

c)  $\int_0^{\frac{\pi}{4}} \frac{du}{\cos^2 u}$ ;

d)  $\int_1^2 2^x dx$ .

**Giải**

a)  $\int_{-1}^3 x^2 dx = \frac{x^3}{3} \Big|_{-1}^3 = \frac{1}{3} [3^3 - (-1)^3] = \frac{28}{3}$ .

b)  $\int_0^{\frac{\pi}{6}} \cos t dt = \sin t \Big|_0^{\frac{\pi}{6}} = \sin \frac{\pi}{6} - \sin 0 = \frac{1}{2}$ .

c)  $\int_0^{\frac{\pi}{4}} \frac{du}{\cos^2 u} = \tan u \Big|_0^{\frac{\pi}{4}} = \tan \frac{\pi}{4} - \tan 0 = 1 - 0 = 1$ .

d)  $\int_1^2 2^x dx = \frac{2^x}{\ln 2} \Big|_1^2 = \frac{2^2}{\ln 2} - \frac{2^1}{\ln 2} = \frac{2}{\ln 2}$ .

###### » **Luyện tập 1.** Tính:

a)  $\int_0^1 e^x dx$ ;

b)  $\int_1^e \frac{1}{x} dx$ ;

c)  $\int_0^{\frac{\pi}{2}} \sin x dx$ ;

d)  $\int_{\frac{\pi}{6}}^{\frac{\pi}{3}} \frac{dx}{\sin^2 x}$ .

Từ Định lí 1 và định nghĩa tích phân, ta có

###### **Ý nghĩa hình học của tích phân:**

Nếu hàm số  $f(x)$  liên tục và không âm trên đoạn  $[a; b]$ , thì

tích phân  $\int_a^b f(x) dx$  là diện tích  $S$  của hình thang cong giới

hạn bởi đồ thị  $y = f(x)$ , trục hoành và hai đường thẳng  $x = a$ ,  $x = b$  (H.4.9). Vậy

$$S = \int_a^b f(x) dx.$$

Hình 4.9

###### » **Ví dụ 4.** Sử dụng ý nghĩa hình học của tích phân, tính:

a)  $\int_0^1 (x + 1) dx$ ;

b)  $\int_{-1}^1 \sqrt{1 - x^2} dx$ .

**Giải**

a) Tích phân cần tính là diện tích của hình thang vuông

$OABC$ , có đáy nhỏ  $OC = 1$ , đáy lớn  $AB = 2$  và đường cao

$OA = 1$  (H.4.10). Do đó:

$$\int_0^1 (x + 1) dx = S_{OABC} = \frac{1}{2} (OC + AB) \cdot OA = \frac{1}{2} (1 + 2) \cdot 1 = \frac{3}{2}.$$

Hình 4.10

b) Ta có  $y = \sqrt{1-x^2}$  là phương trình nửa phía trên trục hoành của đường tròn tâm tại gốc tọa độ  $O$  và bán kính 1. Do đó, tích phân cần tính là diện tích nửa phía trên trục hoành của hình tròn tương ứng (H.4.11).

$$\text{Vậy } \int_{-1}^1 \sqrt{1-x^2} dx = \frac{\pi}{2}.$$

Hình 4.11

» **Luyện tập 2.** Sử dụng ý nghĩa hình học của tích phân, tính:

a)  $\int_1^3 (2x+1) dx;$

b)  $\int_{-2}^2 \sqrt{4-x^2} dx.$

Lưu ý  $v(t) = s'(t).$

» **Vận dụng 1.** Giải quyết bài toán ở tình huống mở đầu.

### 2. TÍNH CHẤT CỦA TÍCH PHÂN

» **HĐ4.** Nhận biết tính chất của tích phân

Tính và so sánh:

a)  $\int_0^1 2x dx$  và  $2 \int_0^1 x dx;$

b)  $\int_0^1 (x^2 + x) dx$  và  $\int_0^1 x^2 dx + \int_0^1 x dx;$

c)  $\int_0^3 x dx$  và  $\int_0^1 x dx + \int_1^3 x dx.$

Tính chất của tích phân:

Cho  $f(x), g(x)$  là các hàm số liên tục trên đoạn  $[a; b]$ . Khi đó, ta có

$$1) \int_a^b kf(x) dx = k \int_a^b f(x) dx \quad (k \text{ là hằng số});$$

$$2) \int_a^b [f(x) + g(x)] dx = \int_a^b f(x) dx + \int_a^b g(x) dx;$$

$$3) \int_a^b [f(x) - g(x)] dx = \int_a^b f(x) dx - \int_a^b g(x) dx;$$

$$4) \int_a^b f(x) dx = \int_a^c f(x) dx + \int_c^b f(x) dx \quad (a < c < b).$$

##### » **Ví dụ 5.** Tính:

$$a) \int_1^4 (x^3 + 3\sqrt{x}) dx;$$

$$b) \int_0^{\frac{\pi}{2}} (e^x - 2 \cos x) dx;$$

$$c) \int_1^4 \left(2^x - \frac{3}{x^2}\right) dx.$$

Giải

$$\begin{aligned} a) \int_1^4 (x^3 + 3\sqrt{x}) dx &= \int_1^4 x^3 dx + 3 \int_1^4 \sqrt{x} dx = \frac{x^4}{4} \Big|_1^4 + 3 \cdot \frac{x^{\frac{3}{2}}}{\frac{3}{2}} \Big|_1^4 \\ &= \frac{1}{4} (4^4 - 1) + 2 \left( 4^{\frac{3}{2}} - 1 \right) = \frac{255}{4} + 14 = \frac{311}{4}. \end{aligned}$$

$$\begin{aligned} b) \int_0^{\frac{\pi}{2}} (e^x - 2 \cos x) dx &= \int_0^{\frac{\pi}{2}} e^x dx - 2 \int_0^{\frac{\pi}{2}} \cos x dx \\ &= e^x \Big|_0^{\frac{\pi}{2}} - 2 \sin x \Big|_0^{\frac{\pi}{2}} = \left( e^{\frac{\pi}{2}} - 1 \right) - 2(1 - 0) = e^{\frac{\pi}{2}} - 3. \end{aligned}$$

$$\begin{aligned} c) \int_1^4 \left(2^x - \frac{3}{x^2}\right) dx &= \int_1^4 2^x dx - 3 \int_1^4 x^{-2} dx = \frac{2^x}{\ln 2} \Big|_1^4 + 3 \cdot \frac{1}{x} \Big|_1^4 \\ &= \frac{1}{\ln 2} (2^4 - 2^1) + 3 \left( \frac{1}{4} - 1 \right) = \frac{15}{\ln 2} - \frac{9}{4}. \end{aligned}$$

##### » **Luyện tập 3.** Tính các tích phân sau:

$$a) \int_0^{2\pi} (2x + \cos x) dx;$$

$$b) \int_1^2 \left(3^x - \frac{3}{x}\right) dx;$$

$$c) \int_{\frac{\pi}{6}}^{\frac{\pi}{3}} \left( \frac{1}{\cos^2 x} - \frac{1}{\sin^2 x} \right) dx.$$

##### » **Ví dụ 6.** Tính $\int_0^3 |x - 2| dx$ .

Giải

Ta có:

$$\begin{aligned} \int_0^3 |x - 2| dx &= \int_0^2 |x - 2| dx + \int_2^3 |x - 2| dx = \int_0^2 (2 - x) dx + \int_2^3 (x - 2) dx \\ &= \left( 2x - \frac{x^2}{2} \right) \Big|_0^2 + \left( \frac{x^2}{2} - 2x \right) \Big|_2^3 = [(4 - 2) - 0] + \left[ \left( \frac{9}{2} - 6 \right) - (2 - 4) \right] = \frac{5}{2}. \end{aligned}$$

###### » **Luyện tập 4.** Tính $\int_0^3 |2x - 3| dx$ .

##### » **Vận dụng 2.** Giá trị trung bình của hàm số liên tục $f(x)$ trên đoạn $[a; b]$ được định nghĩa là

$$\frac{1}{b-a} \int_a^b f(x) dx.$$

Giả sử nhiệt độ (tính bằng  $^{\circ}\text{C}$ ) tại thời điểm  $t$  giờ trong khoảng thời gian từ 6 giờ sáng đến 12 giờ trưa ở một địa phương vào một ngày nào đó được mô hình hoá bởi hàm số

$$T(t) = 20 + 1,5(t - 6), \quad 6 \leq t \leq 12.$$

Tìm nhiệt độ trung bình vào ngày đó trong khoảng thời gian từ 6 giờ sáng đến 12 giờ trưa.

## Bài 13. Ứng dụng hình học của tích phân

#### THUẬT NGỮ

- Hình phẳng
- Thể tích
- Khối tròn xoay

#### KIẾN THỨC, KĨ NĂNG

- Sử dụng tích phân để tính diện tích của một số hình phẳng.
- Sử dụng tích phân để tính thể tích của một số vật thể.

Trong phần Hình học ở Trung học cơ sở và lớp 11, chúng ta đã được học công thức tính thể tích của nhiều vật thể trong không gian như khối lăng trụ, khối chóp, khối chóp cụt đều, khối trụ, khối nón, khối cầu. Tuy nhiên, ta thường phải thừa nhận các công thức này.

Bài học này sẽ cung cấp một phương pháp tổng quát giúp ta thiết lập một cách dễ dàng tất cả các công thức tính diện tích và thể tích đã được học trong Hình học, cũng như tính được diện tích của những hình phẳng và thể tích của những vật thể phức tạp hơn gặp trong thực tiễn.

### 1. ỨNG DỤNG TÍCH PHÂN ĐỂ TÍNH DIỆN TÍCH HÌNH PHẪNG

#### a) Hình phẳng giới hạn bởi một đồ thị hàm số, trục hoành và hai đường thẳng $x = a, x = b$

##### » H01. Nhận biết công thức tính diện tích

Xét hình phẳng giới hạn bởi đường thẳng  $y = f(x) = x + 1$ , trục hoành và hai đường thẳng  $x = -2, x = 1$  (H.4.12).

a) Tính diện tích  $S$  của hình phẳng này.

b) Tính  $\int_{-2}^1 |f(x)| dx$  và so sánh với  $S$ .

Diện tích  $S$  của hình phẳng giới hạn bởi đồ thị của hàm số  $f(x)$  liên tục, trục hoành và hai đường thẳng  $x = a, x = b$  ( $a < b$ ), được tính bằng công thức

$$S = \int_a^b |f(x)| dx.$$

Hình 4.12

» **Ví dụ 1.** Tính diện tích hình phẳng giới hạn bởi đồ thị của hàm số  $y = x^3$ , trục hoành và hai đường thẳng  $x = 0, x = 2$  (H.4.13).

**Giải**

Diện tích hình phẳng cần tính là

$$\begin{aligned} S &= \int_0^2 |x^3| dx = \int_0^2 x^3 dx \\ &= \frac{x^4}{4} \Big|_0^2 = 4 - 0 = 4. \end{aligned}$$

Hình 4.13

» **Ví dụ 2.** Tính diện tích hình phẳng giới hạn bởi đồ thị hàm số  $y = \sin x$ , trục hoành và hai đường thẳng  $x = 0, x = 2\pi$  (H.4.14).

**Giải**

Diện tích hình phẳng cần tính là

$$\begin{aligned} S &= \int_0^{2\pi} |\sin x| dx = \int_0^\pi |\sin x| dx + \int_\pi^{2\pi} |\sin x| dx \\ &= \int_0^\pi \sin x dx + \int_\pi^{2\pi} (-\sin x dx) \\ &= -\cos x \Big|_0^\pi + \cos x \Big|_\pi^{2\pi} = 4. \end{aligned}$$

Hình 4.14

» **Luyện tập 1.** Tính diện tích hình phẳng giới hạn bởi parabol  $y = x^2 - 4$ , trục hoành và hai đường thẳng  $x = 0, x = 3$  (H.4.15).

**b) Hình phẳng giới hạn bởi hai đồ thị hàm số và hai đường thẳng  $x = a, x = b$**

» **HĐ2.** Nhận biết công thức tính diện tích

Gọi  $S$  là diện tích hình phẳng giới hạn bởi đồ thị của các hàm số  $f(x) = -x^2 + 4x$ ,  $g(x) = x$  và hai đường thẳng  $x = 1, x = 3$  (H.4.16).

Hình 4.15

Hình 4.16

a) Giả sử  $S_1$  là diện tích hình phẳng giới hạn bởi parabol  $y = -x^2 + 4x$ , trục hoành và hai đường thẳng  $x = 1, x = 3$ ;  $S_2$  là diện tích hình phẳng giới hạn bởi đường thẳng  $y = x$ , trục hoành và hai đường thẳng  $x = 1, x = 3$ . Tính  $S_1, S_2$  và từ đó suy ra  $S$ .

b) Tính  $\int_1^3 |f(x) - g(x)| dx$  và so sánh với  $S$ .

Diện tích  $S$  của hình phẳng giới hạn bởi đồ thị của hai hàm số  $f(x), g(x)$  liên tục trên đoạn  $[a; b]$  và hai đường thẳng  $x = a, x = b$ , được tính bằng công thức

$$S = \int_a^b |f(x) - g(x)| dx.$$

**Chú ý.** Nếu hiệu  $f(x) - g(x)$  không đổi dấu trên đoạn  $[a; b]$  thì

$$\int_a^b |f(x) - g(x)| dx = \left| \int_a^b [f(x) - g(x)] dx \right|.$$

» **Ví dụ 3.** Tính diện tích hình phẳng giới hạn bởi hai parabol  $y = 4 - x^2, y = x^2$  và hai đường thẳng  $x = -1, x = 1$  (H.4.17).

**Giải**

Diện tích hình phẳng cần tính là

$$\begin{aligned} S &= \int_{-1}^1 |(4 - x^2) - x^2| dx = \int_{-1}^1 |4 - 2x^2| dx \\ &= \int_{-1}^1 (4 - 2x^2) dx = \left( 4x - \frac{2}{3}x^3 \right) \Big|_{-1}^1 = \frac{20}{3}. \end{aligned}$$

Hình 4.17

» **Ví dụ 4.** Tính diện tích hình phẳng giới hạn bởi đồ thị hai hàm số  $y = \sin x, y = \cos x$  và hai đường thẳng  $x = 0, x = \frac{\pi}{4}$  (H.4.18).

**Giải**

Diện tích hình phẳng cần tính là

$$\begin{aligned} S &= \int_0^{\pi/4} |\sin x - \cos x| dx = \int_0^{\pi/4} (\cos x - \sin x) dx \\ &= (\sin x + \cos x) \Big|_0^{\pi/4} = \sqrt{2} - 1. \end{aligned}$$

Hình 4.18

» **Luyện tập 2.** Tính diện tích hình phẳng giới hạn bởi đồ thị của các hàm số  $y = \sqrt{x}, y = x - 2$  và hai đường thẳng  $x = 1, x = 4$ .

» **Vận dụng 1.** Ta biết rằng hàm cầu liên quan đến giá  $p$  của một sản phẩm với nhu cầu của người tiêu dùng, hàm cung liên quan đến giá  $p$  của sản phẩm với mức độ sẵn sàng cung cấp sản phẩm của nhà sản xuất. Điểm cắt nhau  $(x_0; p_0)$  của đồ thị hàm cầu  $p = D(x)$  và đồ thị hàm cung  $p = S(x)$  được gọi là điểm cân bằng.

Hình 4.19

Các nhà kinh tế gọi diện tích của hình giới hạn bởi đồ thị hàm cầu, đường ngang  $p = p_0$  và đường thẳng đứng  $x = 0$  là *thặng dư tiêu dùng*. Tương tự, diện tích của hình giới hạn bởi đồ thị của hàm cung, đường ngang  $p = p_0$  và đường thẳng đứng  $x = 0$  được gọi là *thặng dư sản xuất*, như trong Hình 4.19.

(Theo R. Larson, *Brief Calculus: An Applied Approach*, 8th edition, Cengage Learning, 2009)

Giả sử hàm cung và hàm cầu của một loại sản phẩm được mô hình hoá bởi:

Hàm cầu:  $p = -0,36x + 9$  và hàm cung:  $p = 0,14x + 2$ , trong đó  $x$  là số đơn vị sản phẩm. Tìm thặng dư tiêu dùng và thặng dư sản xuất cho sản phẩm này.

### 2. ỨNG DỤNG TÍCH PHÂN ĐỂ TÍNH THỂ TÍCH VẬT THỂ

#### a) Tính thể tích của vật thể

» **HĐ3.** Nhận biết công thức tính thể tích vật thể

Xét hình trụ có bán kính đáy  $R$ , có trục là trục hoành  $Ox$ , nằm giữa hai mặt phẳng  $x = a$  và  $x = b$  ( $a < b$ ) (H.4.20).

Hình 4.20

a) Tính thể tích  $V$  của hình trụ.

b) Tính diện tích mặt cắt  $S(x)$  khi cắt hình trụ bởi mặt phẳng vuông góc với trục  $Ox$  tại điểm có hoành độ là  $x$

( $a \leq x \leq b$ ). Từ đó tính  $\int_a^b S(x) dx$  và so sánh với  $V$ .

**Công thức tính thể tích vật thể**

Cho một vật thể trong không gian  $Oxyz$ . Gọi  $B$  là phần vật thể giới hạn bởi hai mặt phẳng vuông góc với trục  $Ox$  tại các điểm có hoành độ  $x = a$ ,  $x = b$ . Một mặt phẳng vuông góc với trục  $Ox$  tại điểm có hoành độ là  $x$  cắt vật thể theo mặt cắt có diện tích là  $S(x)$ . Giả sử  $S(x)$  là hàm số liên tục trên đoạn  $[a; b]$ .

Khi đó thể tích  $V$  của phần vật thể  $B$  được tính bởi công thức

$$V = \int_a^b S(x) dx.$$

Hình 4.21

» **Ví dụ 5.** Tính thể tích của khối lăng trụ có diện tích đáy bằng  $S$  và chiều cao bằng  $h$ .

**Giải (H.4.22)**

Chọn trục  $Ox$  song song với đường cao của khối lăng trụ và hai đáy nằm trên hai mặt phẳng vuông góc với  $Ox$  tại  $x = 0$  và  $x = h$ .

Mỗi mặt phẳng vuông góc với trục  $Ox$  tại điểm có hoành độ bằng  $x$  ( $0 \leq x \leq h$ ) cắt khối lăng trụ theo mặt cắt có diện tích không đổi là  $S(x) = S$ .

Do đó, thể tích của khối lăng trụ là

$$V = \int_0^h S(x) dx = \int_0^h S dx = Sx \Big|_0^h = Sh.$$

Hình 4.22

» **Ví dụ 6.** Tính thể tích của khối chóp đều có đáy là hình vuông cạnh  $L$  và chiều cao là  $h$ .

**Giải (H.4.23)**

Hình 4.23

Chọn trục  $Ox$  sao cho gốc  $O$  trùng với đỉnh của khối chóp và trục đi qua tâm của đáy. Khi đó, đáy của khối chóp nằm trên mặt phẳng vuông góc với  $Ox$  tại  $x = h$ .

Mỗi mặt phẳng vuông góc với trục  $Ox$  tại điểm có hoành độ bằng  $x$  ( $0 \leq x \leq h$ ), cắt khối chóp theo mặt cắt là hình vuông có cạnh là  $a$ .

Theo định lí Thalès, ta có  $\frac{x}{h} = \frac{\frac{a}{2}}{\frac{L}{2}}$ , suy ra  $a = \frac{L}{h}x$ .

Do đó, diện tích của mặt cắt này là  $S(x) = \frac{L^2}{h^2}x^2$ .

Vậy thể tích của khối chóp này là  $V = \int_0^h S(x) dx = \int_0^h \frac{L^2}{h^2}x^2 dx = \frac{L^2}{h^2} \frac{x^3}{3} \Big|_0^h = \frac{1}{3}L^2h$ .

**Chú ý.** Bằng ứng dụng của tích phân, người ta chứng minh được thể tích của khối chóp bất kì bằng  $\frac{1}{3}$  diện tích mặt đáy nhân với chiều cao của nó.

» **Vận dụng 2.** Tính thể tích của khối chóp cụt đều có diện tích hai đáy là  $S_0, S_1$  và chiều cao bằng  $h$  (H.4.24). Từ đó suy ra công thức tính thể tích khối chóp đều có diện tích đáy bằng  $S$  và chiều cao bằng  $h$ .

Hình 4.24

#### b) Tính thể tích khối tròn xoay

##### » H04. Nhận biết công thức tính thể tích của khối tròn xoay

Xét hình phẳng giới hạn bởi đồ thị hàm số  $f(x) = \frac{1}{2}x$ , trục hoành và hai đường thẳng  $x = 0$ ,  $x = 4$ . Khi quay hình phẳng này xung quanh trục hoành  $Ox$  ta được khối nón có đỉnh là gốc  $O$ , trục là  $Ox$  và đáy là hình tròn bán kính bằng 2 (H.4.25).

Hình 4.25

a) Tính thể tích  $V$  của khối nón.

b) Chứng minh rằng khi cắt khối nón bởi mặt phẳng vuông góc với trục hoành tại điểm có hoành độ bằng  $x$  ( $0 \leq x \leq 4$ ) thì mặt cắt thu được là một hình tròn có bán kính là  $f(x)$ , do đó diện tích mặt cắt là  $S(x) = \pi f^2(x)$ .

Tính  $\pi \int_0^4 f^2(x) dx$  và so sánh với  $V$ .

###### Công thức tính thể tích của khối tròn xoay

Cho hàm số  $f(x)$  liên tục, không âm trên đoạn  $[a; b]$ .

Khi quay hình phẳng giới hạn bởi đồ thị hàm số  $y = f(x)$ , trục hoành và hai đường thẳng  $x = a$ ,  $x = b$  xung quanh trục hoành, ta được hình khối gọi là một **khối tròn xoay**.

Khi cắt khối tròn xoay đó bởi một mặt phẳng vuông góc với trục  $Ox$  tại điểm  $x \in [a; b]$  được một hình tròn có bán kính  $f(x)$ .

Thể tích của khối tròn xoay này là

$$V = \pi \int_a^b f^2(x) dx.$$

###### » Ví dụ 7. Tính thể tích khối tròn xoay sinh ra khi quay quanh trục $Ox$ hình phẳng giới hạn bởi đồ thị hàm số $y = \sqrt{x}$ , trục hoành và hai đường thẳng $x = 0$ , $x = 1$ (H.4.26).

Hình 4.26

Giải

Thể tích khối tròn xoay cần tính là

$$V = \pi \int_0^1 f^2(x) dx = \pi \int_0^1 (\sqrt{x})^2 dx = \pi \int_0^1 x dx = \pi \frac{x^2}{2} \Big|_0^1 = \frac{\pi}{2}.$$

###### » **Ví dụ 8.** Tính thể tích của khối cầu bán kính $R$ .

**Giải**

Khối cầu bán kính  $R$  có thể xem là vật thể sinh ra khi quay quanh trục hoành nửa hình tròn giới hạn bởi đồ thị hàm số  $y = \sqrt{R^2 - x^2}$  ( $-R \leq x \leq R$ ), trục hoành và hai đường thẳng  $x = -R$ ,  $x = R$  (H.4.27).

Do đó, thể tích của khối cầu bán kính  $R$  là

$$\begin{aligned} V &= \pi \int_{-R}^R (\sqrt{R^2 - x^2})^2 dx = \pi \int_{-R}^R (R^2 - x^2) dx \\ &= \pi \left( R^2x - \frac{x^3}{3} \right) \Big|_{-R}^R = \frac{4}{3} \pi R^3. \end{aligned}$$

Hình 4.27

##### » **Vận dụng 3.** a) Tính thể tích của khối tròn xoay sinh ra khi quay hình thang vuông $OABC$ trong mặt phẳng $Oxy$ với $OA = h$ , $AB = R$ và $OC = r$ , quanh trục $Ox$ (H.4.28).

Hình 4.28

b) Từ công thức thu được ở phần a, hãy rút ra công thức tính thể tích của khối nón có bán kính đáy bằng  $R$  và chiều cao  $h$ .

# CHƯƠNG V. PHƯƠNG PHÁP TOẠ ĐỘ TRONG KHÔNG GIAN

## Bài 14. Phương trình mặt phẳng

#### THUẬT NGỮ

- Vectơ pháp tuyến của mặt phẳng
- Cặp vectơ chỉ phương của mặt phẳng
- Phương trình tổng quát của mặt phẳng
- Khoảng cách từ một điểm đến một mặt phẳng

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết phương trình mặt phẳng.
- Viết phương trình mặt phẳng trong các trường hợp: qua một điểm và biết vectơ pháp tuyến, qua một điểm và biết cặp vectơ chỉ phương, qua ba điểm không thẳng hàng.
- Nhận biết hai mặt phẳng song song, hai mặt phẳng vuông góc.
- Tính khoảng cách từ một điểm đến một mặt phẳng.
- Vận dụng kiến thức về phương trình mặt phẳng, công thức tính khoảng cách từ một điểm đến một mặt phẳng vào một số bài toán liên quan đến thực tiễn.

Một vật thể chuyển động trong không gian  $Oxyz$ . Tại mỗi thời điểm  $t$ , vật thể ở vị trí  $M(\cos t - \sin t; \cos t + \sin t; \cos t)$ . Hỏi vật thể có chuyển động trong một mặt phẳng cố định hay không?

### 1. VECTƠ PHÁP TUYẾN VÀ CẶP VECTƠ CHỈ PHƯƠNG CỦA MẶT PHẪNG

##### » HĐ1. Hình thành khái niệm vectơ pháp tuyến

Trên mặt bàn phẳng, đặt một vật. Khi đó, mặt bàn tác động lên vật phản lực pháp tuyến  $\vec{n}$ , giá của vectơ  $\vec{n}$  vuông góc với mặt bàn. Nếu mặt bàn thuộc mặt phẳng nằm ngang thì  $\vec{n}$  có phương gì? (H.5.1)

Hình 5.1

Vector  $\vec{n} \neq \vec{0}$  được gọi là **vector pháp tuyến** của mặt phẳng  $(\alpha)$  nếu giá của  $\vec{n}$  vuông góc với  $(\alpha)$ .

Hình 5.2

###### Chú ý

- Mặt phẳng hoàn toàn xác định khi biết một điểm và một vector pháp tuyến của nó.
- Nếu  $\vec{n}$  là một vector pháp tuyến của mặt phẳng  $(\alpha)$  thì  $k\vec{n}$  (với  $k$  là một số khác 0) cũng là một vector pháp tuyến của  $(\alpha)$ .

» **Ví dụ 1.** Cho hình lập phương  $ABCD.A'B'C'D'$  (H.5.3).

Trong các khẳng định sau, những khẳng định nào là đúng?

- $\overrightarrow{AA'}$  và  $2\overrightarrow{BB'}$  đều là vector pháp tuyến của mặt phẳng  $(ABCD)$ .
- $\overrightarrow{BD}$  là một vector pháp tuyến của mặt phẳng  $(ACC'A')$ .
- $\overrightarrow{A'C'}$  là một vector pháp tuyến của mặt phẳng  $(ABCD)$ .

Hình 5.3

###### Giải

Vì các đường thẳng  $AA'$ ,  $BB'$  vuông góc với mặt phẳng  $(ABCD)$  nên  $\overrightarrow{AA'}$ ,  $2\overrightarrow{BB'}$  đều là vector pháp tuyến của mặt phẳng  $(ABCD)$ .

Đường thẳng  $BD$  vuông góc với hai đường thẳng  $AC$  và  $AA'$  nên vuông góc với mặt phẳng  $(ACC'A')$ . Vậy  $\overrightarrow{BD}$  là một vector pháp tuyến của mặt phẳng  $(ACC'A')$ .

Đường thẳng  $A'C'$  không vuông góc với mặt phẳng  $(ABCD)$  nên vector  $\overrightarrow{A'C'}$  không phải là vector pháp tuyến của mặt phẳng đó.

Vậy các khẳng định a và b là đúng, khẳng định c là sai.

» **Luyện tập 1.** Trong không gian  $Oxyz$ , cho các điểm  $A(1; -2; 3)$ ,  $B(-3; 0; 1)$ . Gọi  $(\alpha)$  là mặt phẳng trung trực của đoạn thẳng  $AB$ . Hãy chỉ ra một vector pháp tuyến của  $(\alpha)$ .

» **HĐ2.** Tìm một vector vuông góc với hai vector cho trước

Trong không gian  $Oxyz$ , cho hai vector  $\vec{u} = (a; b; c)$  và  $\vec{v} = (a'; b'; c')$ .

- Vector  $\vec{n} = (bc' - b'c; ca' - c'a; ab' - a'b)$  có vuông góc với cả hai vector  $\vec{u}$  và  $\vec{v}$  hay không?
- $\vec{n} = \vec{0}$  khi và chỉ khi  $\vec{u}$  và  $\vec{v}$  có mối quan hệ gì?

Trong không gian  $Oxyz$ , cho hai vector  $\vec{u} = (a; b; c)$  và  $\vec{v} = (a'; b'; c')$ . Khi đó vector  $\vec{n} = (bc' - b'c; ca' - c'a; ab' - a'b)$  vuông góc với cả hai vector  $\vec{u}$  và  $\vec{v}$ , được gọi là **tích có hướng** của  $\vec{u}$  và  $\vec{v}$ , kí hiệu là  $[\vec{u}, \vec{v}]$ .

Hình 5.4

###### Chú ý

- $[\vec{u}, \vec{v}] = \vec{0}$  khi và chỉ khi  $\vec{u}, \vec{v}$  cùng phương.
- Với bốn số  $x, y, x', y'$ , ta kí hiệu  $\begin{vmatrix} x & y \\ x' & y' \end{vmatrix} = xy' - x'y$ . Khi đó tích có hướng của  $\vec{u} = (a; b; c)$  và  $\vec{v} = (a'; b'; c')$  là

$$[\vec{u}, \vec{v}] = \begin{vmatrix} b & c \\ b' & c' \end{vmatrix}; \begin{vmatrix} c & a \\ c' & a' \end{vmatrix}; \begin{vmatrix} a & b \\ a' & b' \end{vmatrix}.$$

» **Ví dụ 2.** Trong không gian  $Oxyz$ , cho  $\vec{u} = (1; -2; 0)$  và  $\vec{v} = (3; 1; -4)$ . Tính  $[\vec{u}, \vec{v}]$ .

Giải

$$\text{Ta có } [\vec{u}, \vec{v}] = \left( \begin{array}{cc|cc|cc} -2 & 0 & 0 & 1 & 1 & -2 \\ 1 & -4 & -4 & 3 & 3 & 1 \end{array} \right) = (8; 4; 7).$$

» **Luyện tập 2.** Trong không gian  $Oxyz$ , cho  $\vec{u} = (2; 3; 1)$  và  $\vec{v} = (4; 6; 2)$ . Tính  $[\vec{u}, \vec{v}]$ .

» **HĐ3.** Hình thành khái niệm cặp vectơ chỉ phương của mặt phẳng

Trong không gian  $Oxyz$ , cho hai vectơ  $\vec{u}, \vec{v}$  không cùng phương và có giá nằm trong hoặc song song với mặt phẳng  $(P)$ .

- a) Vectơ  $[\vec{u}, \vec{v}]$  có khác vectơ-không và giá của nó có vuông góc với cả hai giá của  $\vec{u}, \vec{v}$  hay không?
- b) Mặt phẳng  $(P)$  có nhận  $[\vec{u}, \vec{v}]$  làm một vectơ pháp tuyến hay không?

- Trong không gian  $Oxyz$ , hai vectơ  $\vec{u}, \vec{v}$  được gọi là **cặp vectơ chỉ phương** của mặt phẳng  $(P)$  nếu chúng không cùng phương và có giá nằm trong hoặc song song với mặt phẳng  $(P)$ .
- Nếu  $\vec{u}, \vec{v}$  là cặp vectơ chỉ phương của  $(P)$  thì  $[\vec{u}, \vec{v}]$  là một vectơ pháp tuyến của  $(P)$ .

Hình 5.5

» **Ví dụ 3.** Trong không gian  $Oxyz$ , cho các vectơ  $\vec{u} = (2; -1; 0)$ ,  $\vec{v} = (1; -1; 2)$ . Gọi  $(\alpha)$  là một mặt phẳng song song với các giá của  $\vec{u}, \vec{v}$ . Hãy tìm một vectơ pháp tuyến của  $(\alpha)$ .

Giải

$$\text{Ta có } \vec{n} = [\vec{u}, \vec{v}] = \left( \begin{array}{cc|cc|cc} -1 & 0 & 0 & 2 & 2 & -1 \\ -1 & 2 & 2 & 1 & 1 & -1 \end{array} \right) = (-2; -4; -1) \neq \vec{0}.$$

Do đó  $\vec{u}, \vec{v}$  là cặp vectơ chỉ phương và  $\vec{n}$  là một vectơ pháp tuyến của  $(\alpha)$ .

» **Luyện tập 3.** Trong không gian  $Oxyz$ , cho ba điểm không thẳng hàng  $A(1; -2; 1)$ ,  $B(-2; 1; 0)$ ,  $C(-2; 3; 2)$ . Hãy chỉ ra một vectơ pháp tuyến của mặt phẳng  $(ABC)$ .

» **Vận dụng 1.** Moment lực là một đại lượng Vật lí, thể hiện tác động gây ra sự quay quanh một điểm hoặc một trục của một vật thể. Trong không gian  $Oxyz$ , với đơn vị đo là mét, nếu tác động vào cán mỏ lết tại vị trí  $P$  một lực  $\vec{F}$  để vặn con ốc ở vị trí  $O$  (H.5.6) thì moment lực  $\vec{M}$  được tính bởi công thức  $\vec{M} = [\vec{OP}, \vec{F}]$ .

Hình 5.6

a) Cho  $\vec{OP} = (x; y; z)$ ,  $\vec{F} = (a; b; c)$ . Tính  $\vec{M}$ .

b) Giải thích vì sao, nếu giữ nguyên lực tác động  $\vec{F}$  trong khi thay vị trí đặt lực từ  $P$  sang  $P'$  sao cho  $\vec{OP'} = 2\vec{OP}$  thì moment lực sẽ tăng lên gấp đôi. Từ đó, ta có thể rút ra điều gì để đỡ tốn sức khi dùng mỏ lết vặn ốc?

### 2. PHƯƠNG TRÌNH TỔNG QUÁT CỦA MẶT PHẪNG

##### » HĐ4. Hình thành khái niệm phương trình tổng quát của mặt phẳng

Trong không gian  $Oxyz$ , cho mặt phẳng  $(\alpha)$ . Gọi  $\vec{n} = (A; B; C)$  là một vectơ pháp tuyến của  $(\alpha)$  và  $M_0(x_0; y_0; z_0)$  là một điểm thuộc  $(\alpha)$ .

a) Một điểm  $M(x; y; z)$  thuộc  $(\alpha)$  khi và chỉ khi hai vectơ  $\vec{n}$  và  $\overrightarrow{M_0M}$  có mối quan hệ gì?

b) Điểm  $M(x; y; z)$  thuộc  $(\alpha)$  khi và chỉ khi toạ độ của nó thoả mãn hệ thức nào?

Trong không gian  $Oxyz$ , mỗi mặt phẳng đều có phương trình dạng  $Ax + By + Cz + D = 0$ , trong đó  $A, B, C$  không đồng thời bằng 0, được gọi là **phương trình tổng quát** của mặt phẳng đó.

**Chú ý.** Trong không gian  $Oxyz$ , mỗi phương trình  $Ax + By + Cz + D = 0$  (các hệ số  $A, B, C$  không đồng thời bằng 0) xác định một mặt phẳng nhận  $\vec{n} = (A; B; C)$  làm một vectơ pháp tuyến.

##### » Ví dụ 4. Trong không gian $Oxyz$ , phương trình nào trong các phương trình sau là phương trình tổng quát của một mặt phẳng?

a)  $x + 2y - 3z^2 + 1 = 0$ ;

b)  $\frac{1}{x} + \frac{2}{y} + \frac{3}{z} + 2 = 0$ ;

c)  $y + 1 = 0$ .

Giải

Trong các phương trình trên, chỉ có phương trình  $y + 1 = 0$  có dạng  $Ax + By + Cz + D = 0$  và thoả mãn  $A, B, C$  không đồng thời bằng 0 ( $A = 0, B = 1, C = 0$ ). Vì vậy, trong các phương trình trên, chỉ có phương trình  $y + 1 = 0$  là phương trình mặt phẳng.

##### » Luyện tập 4. Trong không gian $Oxyz$ , phương trình nào trong các phương trình sau là phương trình tổng quát của một mặt phẳng?

a)  $x^2 + 2y^2 + 3z^2 - 1 = 0$ ;

b)  $\frac{x}{2} - y + \frac{z}{3} + 5 = 0$ ;

c)  $xy + 5 = 0$ .

##### » Ví dụ 5. Trong không gian $Oxyz$ , cho mặt phẳng $(\alpha) : x + 2y - z + 1 = 0$ .

a) Hãy chỉ ra một vectơ pháp tuyến của  $(\alpha)$ .

b) Vectơ  $\vec{m} = (2; 4; -2)$  có là vectơ pháp tuyến của  $(\alpha)$  hay không?

c) Trong hai điểm  $A(1; 3; 2)$ ,  $B(1; 1; 4)$ , điểm nào thuộc mặt phẳng  $(\alpha)$ ?

Giải

a) Mặt phẳng  $(\alpha)$  nhận  $\vec{n} = (1; 2; -1)$  làm một vectơ pháp tuyến.

b) Do  $\vec{m} = 2\vec{n}$  mà  $\vec{n}$  là vectơ pháp tuyến của  $(\alpha)$  nên  $\vec{m}$  cũng là vectơ pháp tuyến của  $(\alpha)$ .

c) Ta cần kiểm tra xem trong hai điểm  $A(1; 3; 2)$ ,  $B(1; 1; 4)$ , điểm nào có toạ độ thoả mãn phương trình mặt phẳng  $(\alpha)$ .

Do  $1 + 2 \cdot 3 - 2 + 1 \neq 0$  và  $1 + 2 \cdot 1 - 4 + 1 = 0$  nên trong hai điểm  $A, B$  chỉ có toạ độ điểm  $B$  thoả mãn phương trình mặt phẳng  $(\alpha)$ . Vậy điểm  $B$  thuộc mặt phẳng  $(\alpha)$ , điểm  $A$  không thuộc mặt phẳng  $(\alpha)$ .

» **Luyện tập 5.** Trong không gian  $Oxyz$ , cho mặt phẳng  $(\alpha) : x + 2 = 0$ .

- a) Điểm  $A(-2; 1; 0)$  có thuộc  $(\alpha)$  hay không?  
b) Hãy chỉ ra một vectơ pháp tuyến của  $(\alpha)$ .

#### 3. LẬP PHƯƠNG TRÌNH TỔNG QUÁT CỦA MẶT PHẪNG

» **HĐ5.** Lập phương trình mặt phẳng đi qua một điểm và biết vectơ pháp tuyến

Trong không gian  $Oxyz$ , cho mặt phẳng  $(\alpha)$  đi qua điểm  $M_0(x_0; y_0; z_0)$  và có vectơ pháp tuyến  $\vec{n} = (A; B; C)$ .

Dựa vào HĐ4, hãy nêu phương trình của  $(\alpha)$ .

Trong không gian  $Oxyz$ , nếu mặt phẳng  $(\alpha)$  đi qua điểm  $M_0(x_0; y_0; z_0)$  và có vectơ pháp tuyến  $\vec{n} = (A; B; C)$  thì có phương trình là:

$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \Leftrightarrow Ax + By + Cz + D = 0, \text{ với } D = -(Ax_0 + By_0 + Cz_0).$$

» **Ví dụ 6.** Trong không gian  $Oxyz$ , viết phương trình mặt phẳng  $(\alpha)$  đi qua điểm  $M(2; -1; 0)$  và có vectơ pháp tuyến  $\vec{n} = (3; -4; 6)$ .

Giải

Mặt phẳng  $(\alpha)$  có phương trình là:

$$3(x - 2) - 4[y - (-1)] + 6(z - 0) = 0 \Leftrightarrow 3x - 4y + 6z - 10 = 0.$$

» **Luyện tập 6.** Trong không gian  $Oxyz$ , viết phương trình mặt phẳng  $(\alpha)$  đi qua điểm  $M(1; 2; -4)$  và vuông góc với trục  $Oz$ .

» **HĐ6.** Lập phương trình mặt phẳng đi qua một điểm và biết cặp vectơ chỉ phương

Trong không gian  $Oxyz$ , cho mặt phẳng  $(\alpha)$  đi qua điểm  $M(x_0; y_0; z_0)$  và biết cặp vectơ chỉ phương  $\vec{u} = (a; b; c)$ ,  $\vec{v} = (a'; b'; c')$ .

- a) Hãy chỉ ra một vectơ pháp tuyến của mặt phẳng  $(\alpha)$ .  
b) Viết phương trình mặt phẳng  $(\alpha)$ .

Trong không gian  $Oxyz$ , bài toán viết phương trình mặt phẳng đi qua điểm  $M$  và biết cặp vectơ chỉ phương  $\vec{u}$ ,  $\vec{v}$  có thể thực hiện theo các bước sau:

- Tìm vectơ pháp tuyến  $\vec{n} = [\vec{u}, \vec{v}]$ .
- Lập phương trình tổng quát của mặt phẳng đi qua  $M$  và biết vectơ pháp tuyến  $\vec{n}$ .

» **Ví dụ 7.** Trong không gian  $Oxyz$ , cho hình lăng trụ  $ABC.A'B'C'$  với  $A(1; 2; 3)$ ,  $B(4; 3; 5)$ ,  $C(2; 3; 2)$ ,  $A'(1; 1; 1)$ . Viết phương trình mặt phẳng  $(A'B'C')$ .

###### **Giải (H.5.7)**

Mặt phẳng  $(A'B'C')$  nhận  $\overrightarrow{AB} = (3; 1; 2), \overrightarrow{AC} = (1; 1; -1)$  làm cặp vectơ chỉ phương nên có vectơ pháp tuyến là

$$\vec{n} = [\overrightarrow{AB}, \overrightarrow{AC}] = (-3; 5; 2).$$

Mặt phẳng  $(A'B'C')$  đi qua  $A'(1; 1; 1)$  và nhận  $\vec{n} = (-3; 5; 2)$  làm một vectơ pháp tuyến nên có phương trình:

$$-3(x - 1) + 5(y - 1) + 2(z - 1) = 0 \Leftrightarrow 3x - 5y - 2z + 4 = 0.$$

Hình 5.7

» **Luyện tập 7.** Trong không gian  $Oxyz$ , cho các điểm  $A(1; -2; -1), B(4; 1; 2), C(2; 3; 1)$ . Viết phương trình mặt phẳng  $(\alpha)$  đi qua điểm  $A(1; -2; -1)$  đồng thời song song với trục  $Oy$  và đường thẳng  $BC$ .

» **HĐ7. Lập phương trình mặt phẳng đi qua ba điểm không thẳng hàng**

Trong không gian  $Oxyz$ , cho ba điểm không thẳng hàng:

$$A(1; 2; 3), B(-1; 3; 4), C(2; -1; 2).$$

- Hãy chỉ ra một cặp vectơ chỉ phương của mặt phẳng  $(ABC)$ .
- Viết phương trình mặt phẳng  $(ABC)$ .

Trong không gian  $Oxyz$ , bài toán viết phương trình mặt phẳng đi qua ba điểm không thẳng hàng  $A, B, C$  có thể thực hiện theo các bước sau:

- Tìm cặp vectơ chỉ phương  $\overrightarrow{AB}, \overrightarrow{AC}$ .
- Tìm vectơ pháp tuyến  $\vec{n} = [\overrightarrow{AB}, \overrightarrow{AC}]$ .
- Lập phương trình tổng quát của mặt phẳng đi qua  $A$  và biết vectơ pháp tuyến  $\vec{n}$ .

» **Ví dụ 8.** Trong không gian  $Oxyz$ , cho ba điểm  $A(2; 1; -1), B(3; 2; 1), C(3; 1; 4)$ .

- Chứng minh rằng ba điểm  $A, B, C$  không thẳng hàng.
- Viết phương trình mặt phẳng  $(ABC)$ .

**Giải**

a) Hai vectơ  $\overrightarrow{AB} = (1; 1; 2), \overrightarrow{AC} = (1; 0; 5)$  không cùng phương nên ba điểm  $A, B, C$  không thẳng hàng.

b) Mặt phẳng  $(ABC)$  có cặp vectơ chỉ phương  $\overrightarrow{AB} = (1; 1; 2), \overrightarrow{AC} = (1; 0; 5)$  nên có vectơ pháp tuyến  $\vec{n} = [\overrightarrow{AB}, \overrightarrow{AC}] = (5; -3; -1)$ .

Mặt phẳng  $(ABC)$  đi qua  $A(2; 1; -1)$  và có vectơ pháp tuyến  $\vec{n} = (5; -3; -1)$  nên có phương trình:

$$5(x - 2) - 3(y - 1) - 1(z + 1) = 0 \Leftrightarrow 5x - 3y - z - 8 = 0.$$

» **Luyện tập 8.** (H.5.8) Trong không gian Oxyz, cho mặt phẳng  $(\alpha)$  không đi qua gốc toạ độ và cắt ba trục Ox, Oy, Oz tương ứng tại các điểm  $A(a; 0; 0)$ ,  $B(0; b; 0)$ ,  $C(0; 0; c)$  ( $a, b, c \neq 0$ ).

Hình 5.8

Chứng minh rằng mặt phẳng  $(\alpha)$  có phương trình:

$$\frac{x}{a} + \frac{y}{b} + \frac{z}{c} = 1.$$

(Phương trình trên được gọi là phương trình mặt phẳng theo đoạn chắn).

» **Vận dụng 2.** Trong tình huống mở đầu, hãy thực hiện các bước sau và trả lời câu hỏi đã được nêu ra.

- Xác định toạ độ của vị trí  $M_1, M_2, M_3$  của vật tương ứng với các thời điểm  $t = 0, t = \frac{\pi}{2}, t = \pi$ .
- Chứng minh rằng  $M_1, M_2, M_3$  không thẳng hàng và viết phương trình mặt phẳng  $(M_1M_2M_3)$ .
- Vị trí  $M(\cos t - \sin t; \cos t + \sin t; \cos t)$  có luôn thuộc mặt phẳng  $(M_1M_2M_3)$  hay không?

### 4. ĐIỀU KIỆN ĐỂ HAI MẶT PHẪNG VUÔNG GÓC VỚI NHAU

» **HĐ8.** Tìm điều kiện để hai mặt phẳng vuông góc

Trong không gian Oxyz, cho hai mặt phẳng:

$$(\alpha): Ax + By + Cz + D = 0, (\beta): A'x + B'y + C'z + D' = 0,$$

với hai vectơ pháp tuyến  $\vec{n} = (A; B; C)$ ,  $\vec{n}' = (A'; B'; C')$  tương ứng.

- Góc giữa hai mặt phẳng  $(\alpha)$ ,  $(\beta)$  và góc giữa hai giá của  $\vec{n}$ ,  $\vec{n}'$  có mối quan hệ gì?
- Hai mặt phẳng  $(\alpha)$  và  $(\beta)$  vuông góc với nhau khi và chỉ khi hai vectơ pháp tuyến tương ứng  $\vec{n}$ ,  $\vec{n}'$  có mối quan hệ gì?

Góc giữa hai mặt phẳng bằng góc giữa hai đường thẳng bất kì tương ứng vuông góc với hai mặt phẳng đó.

Trong không gian  $Oxyz$ , cho hai mặt phẳng:

$(\alpha): Ax + By + Cz + D = 0, (\beta): A'x + B'y + C'z + D' = 0$ ,  
với hai vectơ pháp tuyến  $\vec{n} = (A; B; C), \vec{n}' = (A'; B'; C')$   
tương ứng.

Khi đó:

$$(\alpha) \perp (\beta) \Leftrightarrow \vec{n} \perp \vec{n}' \Leftrightarrow AA' + BB' + CC' = 0.$$

Hình 5.9

**Chú ý.** Nếu hai mặt phẳng vuông góc với nhau thì vectơ pháp tuyến của mặt phẳng này có giá song song hoặc nằm trong mặt phẳng kia.

» **Ví dụ 9.** Trong không gian  $Oxyz$ , chứng minh rằng hai mặt phẳng sau vuông góc với nhau:

$$(\alpha): x - 3y + 2z + 1 = 0, (\beta): 5x + y - z + 2 = 0.$$

**Giải**

Hai mặt phẳng  $(\alpha), (\beta)$  có vectơ pháp tuyến tương ứng là  $\vec{n} = (1; -3; 2), \vec{n}' = (5; 1; -1)$ .

Ta có  $\vec{n} \cdot \vec{n}' = 1 \cdot 5 + (-3) \cdot 1 + 2 \cdot (-1) = 0$  nên  $\vec{n} \perp \vec{n}'$ . Do đó  $(\alpha)$  vuông góc với  $(\beta)$ .

» **Luyện tập 9.** Trong không gian  $Oxyz$ , hai mặt phẳng sau đây có vuông góc với nhau hay không?

$$(\alpha): 3x + y - z + 1 = 0, (\beta): 9x + 3y - 3z + 3 = 0.$$

» **Ví dụ 10.** Trong không gian  $Oxyz$ , viết phương trình mặt phẳng  $(P)$  đi qua hai điểm  $A(1; 2; -2), B(2; 4; 1)$  và vuông góc với mặt phẳng  $(Q): x + 3y + z - 1 = 0$ .

**Giải**

Mặt phẳng  $(Q)$  có vectơ pháp tuyến  $\vec{n}_Q = (1; 3; 1)$ . Mặt phẳng  $(P)$  đi qua  $A, B$  và vuông góc với  $(Q)$  nên có cặp vectơ chỉ phương là  $\vec{AB} = (1; 2; 3)$  và  $\vec{n}_Q = (1; 3; 1)$ . Do đó  $(P)$  có vectơ pháp tuyến là:  $\vec{n}_P = [\vec{AB}, \vec{n}_Q] = (-7; 2; 1)$ .

Mặt phẳng  $(P)$  đi qua  $A(1; 2; -2)$  và có vectơ pháp tuyến  $\vec{n}_P = (-7; 2; 1)$  nên có phương trình:  
 $-7x + 2y + z - ((-7) \cdot 1 + 2 \cdot 2 + 1 \cdot (-2)) = 0 \Leftrightarrow 7x - 2y - z - 5 = 0$ .

» **Vận dụng 3.** (H.5.10) Trong không gian  $Oxyz$ , sàn của một căn phòng có dạng hình tứ giác với bốn đỉnh  $O(0; 0; 0), A(2; 0; 0), B(2; 3; 0); C(0; 2\sqrt{2}; 0)$ . Bốn bức tường của căn phòng đều vuông góc với sàn.

a) Viết phương trình bốn mặt phẳng tương ứng chứa bốn bức tường đó.

b) Trong bốn mặt phẳng tương ứng chứa bốn bức tường đó, hãy chỉ ra những cặp mặt phẳng vuông góc với nhau.

Hình 5.10

### 5. ĐIỀU KIỆN ĐỂ HAI MẶT PHẪNG SONG SONG VỚI NHAU

##### » HĐ9. Tìm điều kiện để hai mặt phẳng song song hoặc trùng nhau

Trong không gian  $Oxyz$ , cho hai mặt phẳng

$$(\alpha): Ax + By + Cz + D = 0,$$

$$(\beta): A'x + B'y + C'z + D' = 0,$$

với các vectơ pháp tuyến  $\vec{n} = (A; B; C)$ ,  $\vec{n}' = (A'; B'; C')$  tương ứng.

Nếu hai mặt phẳng  $(\alpha)$  và  $(\beta)$  song song hoặc trùng nhau thì các vectơ pháp tuyến  $\vec{n}$ ,  $\vec{n}'$  có mối quan hệ gì?

Hình 5.11

Trong không gian  $Oxyz$ , cho hai mặt phẳng

$$(\alpha): Ax + By + Cz + D = 0, (\beta): A'x + B'y + C'z + D' = 0,$$

với các vectơ pháp tuyến  $\vec{n} = (A; B; C)$ ,  $\vec{n}' = (A'; B'; C')$  tương ứng. Khi đó:

$$(\alpha) // (\beta) \Leftrightarrow \begin{cases} \vec{n}' = k\vec{n} \\ D' \neq kD \end{cases} \text{ với } k \text{ nào đó.}$$

###### Chú ý

- Nếu hai mặt phẳng song song với nhau thì vectơ pháp tuyến của mặt phẳng này cũng là vectơ pháp tuyến của mặt phẳng kia.
- Hai mặt phẳng  $(\alpha)$  và  $(\beta)$  trùng nhau khi và chỉ khi tồn tại số  $k$  khác 0 sao cho

$$A' = kA, B' = kB, C' = kC, D' = kD.$$

##### » Ví dụ 11. Trong không gian $Oxyz$ , cho hai mặt phẳng:

$$(\alpha): 3x - y + z + \sqrt{2} = 0 \text{ và } (\beta): 3\sqrt{2}x - \sqrt{2}y + \sqrt{2}z + 1 = 0.$$

Hỏi  $(\alpha)$  và  $(\beta)$  có song song với nhau hay không?

Giải

Các mặt phẳng trên có vectơ pháp tuyến tương ứng là  $\vec{n}_\alpha = (3; -1; 1)$ ,  $\vec{n}_\beta = (3\sqrt{2}; -\sqrt{2}; \sqrt{2})$ .

Do  $\vec{n}_\beta = \sqrt{2} \cdot \vec{n}_\alpha$  và  $1 \neq \sqrt{2} \cdot \sqrt{2}$  nên hai mặt phẳng  $(\alpha)$  và  $(\beta)$  song song với nhau.

##### » Luyện tập 10. Trong không gian $Oxyz$ , cho hai mặt phẳng:

$$(\alpha): 5x + 2y - 4z + 6 = 0 \text{ và } (\beta): 10x + 4y - 2z + 12 = 0.$$

- Hỏi  $(\alpha)$  và  $(\beta)$  có song song với nhau hay không?
- Chứng minh rằng điểm  $M(1; -3; 5)$  không thuộc mặt phẳng  $(\alpha)$  nhưng thuộc mặt phẳng  $(\beta)$ .
- Viết phương trình mặt phẳng  $(P)$  đi qua  $M(1; -3; 5)$  và song song với  $(\alpha)$ .

##### » Vận dụng 4. Trong một kì thi tuyển sinh có ba môn thi Toán, Văn, Tiếng Anh. Trong không gian $Oxyz$ , người ta biểu diễn kết quả thi của mỗi thí sinh bởi điểm có hoành độ, tung độ, cao độ tương ứng là điểm Toán, Văn, Tiếng Anh của thí sinh đó.

- a) Chứng minh rằng các điểm biểu diễn tương ứng với các thí sinh có tổng số điểm ba môn thi bằng 27 (nếu có) cùng thuộc mặt phẳng có phương trình  $x + y + z - 27 = 0$ .
- b) Chứng minh rằng tồn tại một số mặt phẳng đôi một song song với nhau sao cho hai điểm biểu diễn ứng với hai thí sinh có tổng số điểm thi bằng nhau thì cùng thuộc một mặt phẳng trong số các mặt phẳng đó.

Hình 5.12

### 6. KHOẢNG CÁCH TỪ MỘT ĐIỂM ĐẾN MỘT MẶT PHẪNG

» **HĐ10.** Thiết lập công thức tính khoảng cách từ một điểm đến một mặt phẳng

Trong không gian  $Oxyz$ , cho điểm  $M(x_0; y_0; z_0)$  và mặt phẳng  $(P): Ax + By + Cz + D = 0$  có vectơ pháp tuyến  $\vec{n} = (A; B; C)$ . Gọi  $N$  là hình chiếu vuông góc của  $M$  trên  $(P)$  (H.5.13).

Hình 5.13

- a) Giải thích vì sao tồn tại số  $k$  để  $\vec{MN} = k\vec{n}$ . Tính toạ độ của  $N$  theo  $k$ , toạ độ của  $M$  và các hệ số  $A, B, C, D$ .
- b) Thay toạ độ của  $N$  vào phương trình mặt phẳng  $(P)$  để từ đó tính  $k$  theo toạ độ của  $M$  và các hệ số  $A, B, C, D$ .
- c) Từ  $|\vec{MN}| = |k||\vec{n}|$ , hãy tính độ dài của đoạn thẳng  $MN$  theo toạ độ của  $M$  và các hệ số  $A, B, C, D$ . Từ đó suy ra công thức tính khoảng cách từ điểm  $M$  đến mặt phẳng  $(P)$ .

Trong không gian  $Oxyz$ , khoảng cách từ điểm  $M(x_0; y_0; z_0)$  đến mặt phẳng  $(P): Ax + By + Cz + D = 0$  là:

$$d(M, (P)) = \frac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}.$$

» **Ví dụ 12.** Trong không gian  $Oxyz$ , tính khoảng cách từ điểm  $M(1; 2; -1)$  đến mặt phẳng  $(P): x + 2y - 2z + 5 = 0$ .

**Giải**

Khoảng cách từ điểm  $M(1; 2; -1)$  đến mặt phẳng  $(P): x + 2y - 2z + 5 = 0$  là:

$$d(M, (P)) = \frac{|1 + 2 \cdot 2 - 2 \cdot (-1) + 5|}{\sqrt{1^2 + 2^2 + (-2)^2}} = 4.$$

» **Luyện tập 11.** Trong không gian  $Oxyz$ , cho hai mặt phẳng  $(P): x + 3y + z + 2 = 0$  và  $(Q): x + 3y + z + 5 = 0$ .

- Chứng minh rằng  $(P)$  và  $(Q)$  song song với nhau.
- Lấy một điểm thuộc  $(P)$ , tính khoảng cách từ điểm đó đến  $(Q)$ . Từ đó tính khoảng cách giữa hai mặt phẳng  $(P)$  và  $(Q)$ .

» **Vận dụng 5.** (H.5.14) Góc quan sát ngang của một camera là  $115^\circ$ . Trong không gian  $Oxyz$ , camera được đặt tại điểm  $C(1; 2; 4)$  và chiếu thẳng về phía mặt phẳng  $(P): x + 2y + 2z + 3 = 0$ . Hỏi vùng quan sát được trên mặt phẳng  $(P)$  của camera là hình tròn có bán kính bằng bao nhiêu? (Làm tròn kết quả đến chữ số thập phân thứ nhất.)

Hình 5.14

## Bài 15. Phương trình đường thẳng trong không gian

#### **THUẬT NGỮ**

- Vectơ chỉ phương của đường thng
- Phương trình tham số của đường thng
- Phương trình chính tắc của đường thng
- Hai đường thng vuông góc với nhau
- Hai đường thng song với nhau
- Hai đường thng trùng nhau
- Hai đường thng chéo nhau
- Hai đường thng cắt nhau

#### **KIẾN THỨC, KĨ NĂNG**

- Nhận biết các phương trình tham số, chính tắc của đường thng.
- Viết phương trình đường thng đi qua một điểm và biết vectơ chỉ phương.
- Viết phương trình đường thng đi qua hai điểm
- Nhận biết vị trí tương đối của hai đường thng.
- Vận dụng kiến thức về phương trình đường thng, vị trí tương đối giữa hai đường thng vào một số bài toán liên quan đến thực tiễn.

Trong không gian  $Oxyz$ , mắt một người quan sát đặt ở điểm  $M(2; 3; -4)$  và vật cản quan sát đặt tại điểm  $N(-1; 0; 8)$ . Một tấm bìa chắn đường truyền của ánh sáng có dạng hình tròn với tâm  $O(0; 0; 0)$ , bán kính bằng 3 và đặt trong mặt phẳng  $Oxy$ . Hỏi tấm bìa có che khuất tầm nhìn của người quan sát đối với vật đặt ở điểm  $N$  hay không?

### **1. PHƯƠNG TRÌNH ĐƯỜNG THẦNG**

#### **a) Vectơ chỉ phương của đường thng**

###### **HĐ1.** Hình thành khái niệm vectơ chỉ phương của đường thng

Trong không gian, cho điểm  $M$  và vectơ  $\vec{u}$  khác vectơ-không. Khẳng định nào trong hai khẳng định sau là đúng?

- a) Có duy nhất đường thng đi qua  $M$  và vuông góc với giá của  $\vec{u}$ .
- b) Có duy nhất đường thng đi qua  $M$  và song song hoặc trùng với giá của  $\vec{u}$ .

Vectơ  $\vec{u} \neq \vec{0}$  được gọi là vectơ chỉ phương của đường thng  $\Delta$  nếu giá của  $\vec{u}$  song song hoặc trùng với  $\Delta$ .

Hình 5.23

###### **Chú ý**

- Đường thng hoàn toàn xác định khi biết một điểm mà nó đi qua và một vectơ chỉ phương.
- Nếu  $\vec{u}$  là một vectơ chỉ phương của  $\Delta$  thì  $k\vec{u}$  (với  $k$  là một số khác 0) cũng là một vectơ chỉ phương của  $\Delta$ .

###### **Ví dụ 1.** Cho hình hộp $ABCD.A'B'C'D'$ . Hãy chỉ ra các vectơ chỉ phương của đường thng $BC'$ mà điểm đầu và điểm cuối của vectơ đó đều là các đỉnh của hình hộp $ABCD.A'B'C'D'$ .

**Giải** (H.5.24)

Đường thng  $BC'$  nhận các vectơ  $\overrightarrow{BC'}$ ,  $\overrightarrow{C'B}$ ,  $\overrightarrow{AD'}$ ,  $\overrightarrow{D'A}$  là các vectơ chỉ phương.

Hình 5.24

» **Luyện tập 1.** Cho hình lăng trụ  $ABC.A'B'C'$  (H.5.25). Trong các vectơ có điểm đầu và điểm cuối đều là đỉnh của hình lăng trụ, những vectơ nào là vectơ chỉ phương của đường thẳng  $AB$ ?

Hình 5.25

#### b) Phương trình tham số của đường thẳng

» **HĐ2.** Hình thành khái niệm phương trình tham số của đường thẳng

Trong không gian  $Oxyz$ , một vật thể chuyển động với vectơ vận tốc không đổi  $\vec{u} = (a; b; c) \neq \vec{0}$  và xuất phát từ điểm  $A(x_0; y_0; z_0)$  (H.5.26).

- a) Hỏi vật thể chuyển động trên đường thẳng nào (chỉ ra điểm mà nó đi qua và vectơ chỉ phương của đường thẳng đó)?  
 b) Giả sử tại thời điểm  $t (t > 0)$  tính từ khi xuất phát, vật thể ở vị trí  $M(x; y; z)$ . Tính  $x, y, z$  theo  $a, b, c, x_0, y_0, z_0$  và  $t$ .

Hình 5.26

Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta$  đi qua điểm  $A(x_0; y_0; z_0)$  và có vectơ chỉ phương  $\vec{u} = (a; b; c)$ . Hệ phương trình:

$$\begin{cases} x = x_0 + at \\ y = y_0 + bt \\ z = z_0 + ct \end{cases}$$

được gọi là **phương trình tham số** của đường thẳng  $\Delta$  ( $t$  là tham số,  $t \in \mathbb{R}$ ).

###### Chú ý

- Với các số  $a, b, c$  không đồng thời bằng 0, hệ phương trình  $\begin{cases} x = x_0 + at \\ y = y_0 + bt \\ z = z_0 + ct \end{cases} (t \in \mathbb{R})$  xác định một đường thẳng đi qua  $M(x_0; y_0; z_0)$  và có vectơ chỉ phương  $\vec{u} = (a; b; c)$ .
- Từ phương trình tham số của đường thẳng, mỗi giá trị của tham số tương ứng với một điểm thuộc đường thẳng đó và ngược lại.

» **Ví dụ 2.** Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta : \begin{cases} x = -1 + 3t \\ y = 1 \\ z = 2t. \end{cases}$

- a) Hãy chỉ ra một điểm thuộc  $\Delta$  và một vectơ chỉ phương của  $\Delta$ .  
 b) Viết phương trình tham số của đường thẳng  $\Delta'$  đi qua  $A(2; 1; 0)$  và có vectơ chỉ phương  $\vec{v} = (3; 0; 2)$ .

###### Giải

a) Do  $\Delta$  có phương trình  $\begin{cases} x = -1 + 3t \\ y = 1 + 0t \\ z = 0 + 2t \end{cases}$

nên điểm  $M(-1; 1; 0)$  thuộc  $\Delta$  và  $\vec{u}(3; 0; 2)$  là một vectơ chỉ phương của  $\Delta$ .

b) Đường thẳng  $\Delta'$  có phương trình tham số là  $\begin{cases} x = 2 + 3s \\ y = 1 \\ z = 2s. \end{cases}$

» **Luyện tập 2.** Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta: \begin{cases} x = 2 + t \\ y = 3t \\ z = 1 + t. \end{cases}$

- a) Hãy chỉ ra hai điểm thuộc  $\Delta$  và một vectơ chỉ phương của  $\Delta$ .  
 b) Viết phương trình tham số của đường thẳng đi qua gốc tọa độ  $O(0; 0; 0)$  và có vectơ chỉ phương  $\vec{v} = (1; 3; 1)$ .

#### c) Phương trình chính tắc của đường thẳng

» **HĐ3.** Hình thành khái niệm phương trình chính tắc của đường thẳng

Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta$  đi qua điểm  $A(x_0; y_0; z_0)$  và có vectơ chỉ phương  $\vec{u} = (a; b; c)$  ( $a, b, c$  là các số khác 0).

- a) Điểm  $M(x; y; z)$  thuộc  $\Delta$  khi và chỉ khi hai vectơ  $\overrightarrow{AM} = (x - x_0; y - y_0; z - z_0)$  và  $\vec{u} = (a; b; c)$  có mối quan hệ gì?  
 b) Điểm  $M(x; y; z)$  thuộc  $\Delta$  khi và chỉ khi các phân số  $\frac{x - x_0}{a}, \frac{y - y_0}{b}, \frac{z - z_0}{c}$  có mối quan hệ gì?

Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta$  đi qua điểm  $A(x_0; y_0; z_0)$  và có vectơ chỉ phương  $\vec{u} = (a; b; c)$  với  $a, b, c$  là các số khác 0.

Hệ phương trình

$$\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}$$

được gọi là **phương trình chính tắc** của đường thẳng  $\Delta$ .

» **Ví dụ 3.** Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta: \frac{x - 1}{2} = \frac{y}{3} = \frac{z + 2}{1}$ .

Hãy chỉ ra một điểm thuộc  $\Delta$  và một vectơ chỉ phương của  $\Delta$ .

**Giải**

Đường thẳng  $\Delta$  có phương trình  $\frac{x - 1}{2} = \frac{y - 0}{3} = \frac{z - (-2)}{1}$  nên điểm  $A(1; 0; -2)$  thuộc  $\Delta$  và  $\vec{u} = (2; 3; 1)$  là một vectơ chỉ phương của  $\Delta$ .

» **Luyện tập 3.** Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta: \frac{x + 1}{3} = \frac{y - 1}{1} = \frac{z - 2}{5}$ . Hãy chỉ ra một vectơ chỉ phương của  $\Delta$  và hai điểm thuộc  $\Delta$ .

» **Ví dụ 4.** Trong không gian  $Oxyz$ , viết phương trình tham số và phương trình chính tắc của đường thẳng  $\Delta$  đi qua điểm  $M(1; -2; 4)$  và có vectơ chỉ phương  $\vec{u} = (3; -5; 1)$ .

**Giải**

Đường thẳng  $\Delta$  có phương trình tham số là:  $\begin{cases} x = 1 + 3t \\ y = -2 - 5t \\ z = 4 + t \end{cases}$  và có phương trình chính tắc là:

$$\frac{x - 1}{3} = \frac{y + 2}{-5} = \frac{z - 4}{1}.$$

» **Luyện tập 4.** Trong không gian Oxyz, viết phương trình tham số và phương trình chính tắc của đường thẳng  $\Delta$  đi qua điểm  $A(2; -1; 0)$  và có vectơ chỉ phương  $\vec{u} = (-1; 2; 3)$ .

» **Ví dụ 5.** Trong không gian Oxyz, viết phương trình tham số của đường thẳng  $\Delta$  đi qua điểm  $M(-1; 4; 5)$  và vuông góc với mặt phẳng  $(\alpha): 3x + 2y = 0$ .

**Giải**

Mặt phẳng  $(\alpha)$  có vectơ pháp tuyến  $\vec{n} = (3; 2; 0)$ . Giá của  $\vec{n} = (3; 2; 0)$  và  $\Delta$  cùng vuông góc với  $(\alpha)$  nên chúng trùng nhau hoặc song song với nhau. Do đó  $\Delta$  nhận  $\vec{n} = (3; 2; 0)$  làm một vectơ chỉ phương.

Vậy  $\Delta$  có phương trình tham số là: 
$$\begin{cases} x = -1 + 3t \\ y = 4 + 2t \\ z = 5. \end{cases}$$

**Nhận xét.** Đường thẳng  $\Delta$  trong Ví dụ 5 không có phương trình chính tắc.

» **Luyện tập 5.** Trong không gian Oxyz, viết phương trình tham số của đường thẳng  $\Delta$  đi qua điểm  $M(2; -1; 3)$  và vuông góc với mặt phẳng Oyz.

#### d) Lập phương trình đường thẳng đi qua hai điểm

» **HĐ 4.** Lập phương trình đường thẳng đi qua hai điểm

Trong không gian Oxyz, cho hai điểm phân biệt  $A_1(x_1; y_1; z_1)$ ,  $A_2(x_2; y_2; z_2)$ .

a) Hãy chỉ ra một vectơ chỉ phương của đường thẳng  $A_1A_2$ .

b) Viết phương trình đường thẳng  $A_1A_2$ .

Trong không gian Oxyz, cho hai điểm phân biệt  $A_1(x_1; y_1; z_1)$  và  $A_2(x_2; y_2; z_2)$ . Đường thẳng  $A_1A_2$  có vectơ chỉ phương  $\vec{A_1A_2} = (x_2 - x_1; y_2 - y_1; z_2 - z_1)$ .

- Đường thẳng  $A_1A_2$  có phương trình tham số là 
$$\begin{cases} x = x_1 + (x_2 - x_1)t \\ y = y_1 + (y_2 - y_1)t \\ z = z_1 + (z_2 - z_1)t \end{cases} \quad (t \in \mathbb{R}).$$
- Trong trường hợp  $x_1 \neq x_2$ ,  $y_1 \neq y_2$ ,  $z_1 \neq z_2$  thì đường thẳng  $A_1A_2$  có phương trình chính tắc là:

$$\frac{x - x_1}{x_2 - x_1} = \frac{y - y_1}{y_2 - y_1} = \frac{z - z_1}{z_2 - z_1}.$$

» **Ví dụ 6.** Trong không gian Oxyz, viết phương trình tham số và phương trình chính tắc của đường thẳng đi qua hai điểm  $A(1; 2; -1)$  và  $B(2; 4; 0)$ .

**Giải**

Đường thẳng  $AB$  đi qua  $A(1; 2; -1)$  và có vectơ chỉ phương  $\vec{AB} = (1; 2; 1)$ . Do đó  $AB$  có

phương trình chính tắc là  $\frac{x-1}{1} = \frac{y-2}{2} = \frac{z+1}{1}$  và có phương trình tham số là 
$$\begin{cases} x = 1 + t \\ y = 2 + 2t \\ z = -1 + t. \end{cases}$$

» **Luyện tập 6.** Trong không gian Oxyz, viết phương trình đường thẳng đi qua hai điểm  $A(2; 1; 3)$  và  $B(2; 4; 6)$ .

» **Vận dụng 1.** (H.5.27) Trong tình huống mở đầu hãy thực hiện các bước sau và trả lời câu hỏi đã được nêu ra.

- Viết phương trình tham số của đường thẳng  $MN$ .
- Tính tọa độ giao điểm  $D$  của đường thẳng  $MN$  với mặt phẳng  $Oxy$ .
- Hỏi điểm  $D$  có nằm giữa hai điểm  $M$  và  $N$  hay không?

Hình 5.27

### 2. HAI ĐƯỜNG THẲNG VUÔNG GÓC

» **HĐ5.** Tìm điều kiện để hai đường thẳng vuông góc với nhau

Trong không gian  $Oxyz$ , cho hai đường thẳng  $\Delta_1, \Delta_2$  tương ứng có vectơ chỉ phương  $\vec{u}_1 = (a_1; b_1; c_1)$ ,  $\vec{u}_2 = (a_2; b_2; c_2)$ .

- Hai đường thẳng  $\Delta_1$  và  $\Delta_2$  vuông góc với nhau khi và chỉ khi hai giá của  $\vec{u}_1, \vec{u}_2$  có mối quan hệ gì?
- Tìm điều kiện đối với  $\vec{u}_1, \vec{u}_2$  để  $\Delta_1$  và  $\Delta_2$  vuông góc với nhau.

Hình 5.28

Trong không gian  $Oxyz$ , cho hai đường thẳng  $\Delta_1, \Delta_2$  tương ứng có vectơ chỉ phương  $\vec{u}_1 = (a_1; b_1; c_1)$ ,  $\vec{u}_2 = (a_2; b_2; c_2)$ . Khi đó:

$$\Delta_1 \perp \Delta_2 \Leftrightarrow \vec{u}_1 \cdot \vec{u}_2 = 0 \Leftrightarrow a_1 a_2 + b_1 b_2 + c_1 c_2 = 0.$$

» **Ví dụ 7.** Trong không gian  $Oxyz$ , chứng minh rằng hai đường thẳng sau vuông góc với nhau:

$$\Delta_1 : \begin{cases} x = 1 + 2t \\ y = -1 - 3t \\ z = 2 - t \end{cases}, \quad \Delta_2 : \begin{cases} x = 2 + s \\ y = 1 - 2s \\ z = 3 + 8s \end{cases}.$$

**Giải**

Các đường thẳng  $\Delta_1, \Delta_2$  tương ứng có vectơ chỉ phương  $\vec{u}_1 = (2; -3; -1)$ ,  $\vec{u}_2 = (1; -2; 8)$ .

Do  $\vec{u}_1 \cdot \vec{u}_2 = 2 \cdot 1 + (-3) \cdot (-2) + (-1) \cdot 8 = 0$  nên  $\Delta_1 \perp \Delta_2$ .

» **Luyện tập 7.** Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta : \frac{x-1}{2} = \frac{y}{1} = \frac{z-1}{-1}$ . Hỏi đường thẳng  $\Delta$  có vuông góc với trục  $Oz$  hay không?

» **Vận dụng 2.** Tại một nút giao thông có hai con đường. Trên thiết kế, trong không gian  $Oxyz$ , hai con đường đó tương ứng thuộc hai đường thẳng:

$$\Delta_1 : \begin{cases} x = 2 + t \\ y = 1 + t \\ z = 0 \end{cases}, \quad \Delta_2 : \begin{cases} x = 1 - 2s \\ y = 2s \\ z = 1 \end{cases}.$$

Hỏi hai con đường trên có vuông góc với nhau hay không?

### 3. VỊ TRÍ TƯƠNG ĐỐI GIỮA HAI ĐƯỜNG THẲNG

##### » HĐ6. Xác định vị trí tương đối giữa hai đường thẳng

Trong không gian  $Oxyz$ , cho hai đường thẳng  $\Delta_1, \Delta_2$  lần lượt đi qua các điểm  $A_1(x_1; y_1; z_1), A_2(x_2; y_2; z_2)$  và tương ứng có vectơ chỉ phương  $\vec{u}_1 = (a_1; b_1; c_1), \vec{u}_2 = (a_2; b_2; c_2)$  (H.5.29).

- Tìm điều kiện đối với  $\vec{u}_1$  và  $\vec{u}_2$  để  $\Delta_1$  và  $\Delta_2$  song song hoặc trùng nhau.
- Giả sử  $[\vec{u}_1, \vec{u}_2] \neq \vec{0}$  và  $\vec{A_1A_2} \cdot [\vec{u}_1, \vec{u}_2] = 0$  thì  $\Delta_1$  và  $\Delta_2$  có cắt nhau hay không?
- Giả sử  $\vec{A_1A_2} \cdot [\vec{u}_1, \vec{u}_2] \neq 0$  thì  $\Delta_1$  và  $\Delta_2$  có chéo nhau hay không?

Hình 5.29

Trong không gian  $Oxyz$ , cho hai đường thẳng  $\Delta_1, \Delta_2$  lần lượt đi qua các điểm  $A_1(x_1; y_1; z_1), A_2(x_2; y_2; z_2)$  và tương ứng có vectơ chỉ phương  $\vec{u}_1 = (a_1; b_1; c_1), \vec{u}_2 = (a_2; b_2; c_2)$ . Khi đó:

- $\Delta_1 // \Delta_2 \Leftrightarrow \vec{u}_1$  cùng phương với  $\vec{u}_2$  và  $A_1 \notin \Delta_2$ .
- $\Delta_1 \equiv \Delta_2 \Leftrightarrow \vec{u}_1$  cùng phương với  $\vec{u}_2$  và  $A_1 \in \Delta_2$ .
- $\Delta_1$  và  $\Delta_2$  cắt nhau  $\Leftrightarrow \begin{cases} [\vec{u}_1, \vec{u}_2] \neq \vec{0} \\ \vec{A_1A_2} \perp [\vec{u}_1, \vec{u}_2] \end{cases} \Leftrightarrow \begin{cases} [\vec{u}_1, \vec{u}_2] \neq \vec{0} \\ \vec{A_1A_2} \cdot [\vec{u}_1, \vec{u}_2] = 0. \end{cases}$
- $\Delta_1$  và  $\Delta_2$  chéo nhau  $\Leftrightarrow \vec{A_1A_2} \cdot [\vec{u}_1, \vec{u}_2] \neq 0$ .

##### » Ví dụ 8. Trong không gian $Oxyz$ , chứng minh rằng hai đường thẳng sau vuông góc với nhau và chéo nhau:

$$\Delta_1 : \begin{cases} x = 1 + t \\ y = 2 - t \\ z = -1 + 2t \end{cases} \quad \text{và} \quad \Delta_2 : \frac{x - 4}{3} = \frac{y + 1}{1} = \frac{z}{-1}.$$

Giải

Đường thẳng  $\Delta_1$  đi qua điểm  $A_1(1; 2; -1)$  và có vectơ chỉ phương  $\vec{u}_1 = (1; -1; 2)$ .

Đường thẳng  $\Delta_2$  đi qua điểm  $A_2(4; -1; 0)$  và có vectơ chỉ phương  $\vec{u}_2 = (3; 1; -1)$ .

Vì  $\vec{u}_1 \cdot \vec{u}_2 = 1 \cdot 3 + (-1) \cdot 1 + 2 \cdot (-1) = 0$  nên  $\vec{u}_1$  vuông góc với  $\vec{u}_2$ . Do đó  $\Delta_1$  vuông góc với  $\Delta_2$ .

Ta có  $\vec{A_1A_2} = (3; -3; 1)$  và  $[\vec{u}_1, \vec{u}_2] = (-1; 7; 4)$ .

Do  $\vec{A_1A_2} \cdot [\vec{u}_1, \vec{u}_2] = 3 \cdot (-1) + (-3) \cdot 7 + 1 \cdot 4 = -20 \neq 0$  nên  $\Delta_1$  và  $\Delta_2$  chéo nhau.

##### » Luyện tập 8. Trong không gian $Oxyz$ , chứng minh rằng hai đường thẳng sau song song với nhau:

$$\Delta_1 : \frac{x - 3}{1} = \frac{y}{-2} = \frac{z - 1}{3} \quad \text{và} \quad \Delta_2 : \frac{x - 1}{1} = \frac{y - 2}{-2} = \frac{z}{3}.$$

» **Ví dụ 9.** Trong không gian Oxyz, chứng minh rằng hai đường thẳng sau cắt nhau:

$$\Delta_1 : \begin{cases} x = 1 - t \\ y = 2 + t \\ z = -1 + 2t \end{cases} \quad \text{và} \quad \Delta_2 : \begin{cases} x = -6 + s \\ y = 5 + s \\ z = 5 + 2s. \end{cases}$$

**Giải**

Đường thẳng  $\Delta_1$  đi qua  $A_1(1; 2; -1)$  và có vectơ chỉ phương  $\vec{u}_1 = (-1; 1; 2)$ . Đường thẳng  $\Delta_2$  đi qua  $A_2(-6; 5; 5)$  và có vectơ chỉ phương  $\vec{u}_2 = (1; 1; 2)$ . Ta có  $\overrightarrow{A_1A_2} = (-7; 3; 6)$  và  $[\vec{u}_1, \vec{u}_2] = (0; 4; -2)$ .

Do  $\overrightarrow{A_1A_2} \cdot [\vec{u}_1, \vec{u}_2] = (-7) \cdot 0 + 3 \cdot 4 + 6 \cdot (-2) = 0$  và  $[\vec{u}_1, \vec{u}_2] \neq \vec{0}$  nên hai đường thẳng  $\Delta_1$  và  $\Delta_2$  cắt nhau.

» **Luyện tập 9.** Trong không gian Oxyz, cho hai đường thẳng  $\Delta_1 : \frac{x-1}{1} = \frac{y+2}{1} = \frac{z-3}{4}$  và

$\Delta_2 : \frac{x+1}{1} = \frac{y+1}{1} = \frac{z}{4}$ . Chứng minh rằng:

- Hai đường thẳng  $\Delta_1$  và  $\Delta_2$  song song với nhau;
- Đường thẳng  $\Delta_1$  và trục Ox chéo nhau;
- Đường thẳng  $\Delta_2$  trùng với đường thẳng  $\Delta_3 : \frac{x+2}{1} = \frac{y+2}{1} = \frac{z+4}{4}$ ;
- Đường thẳng  $\Delta_2$  cắt trục Oz.

**Chú ý.** Để xét vị trí tương đối giữa hai đường thẳng, ta cũng có thể dựa vào các vectơ chỉ phương và phương trình của hai đường thẳng đó theo tiêu chuẩn sau đây.

Trong không gian Oxyz, cho hai đường thẳng  $\Delta_1, \Delta_2$  tương ứng có vectơ chỉ phương  $\vec{u}_1 = (a_1; b_1; c_1)$ ,  $\vec{u}_2 = (a_2; b_2; c_2)$  và có phương trình tham số:

$$\Delta_1 : \begin{cases} x = x_1 + a_1 t \\ y = y_1 + b_1 t \\ z = z_1 + c_1 t, \end{cases} \quad \Delta_2 : \begin{cases} x = x_2 + a_2 s \\ y = y_2 + b_2 s \\ z = z_2 + c_2 s. \end{cases}$$

Xét hệ phương trình hai ẩn  $t, s$ : 
$$\begin{cases} x_1 + a_1 t = x_2 + a_2 s \\ y_1 + b_1 t = y_2 + b_2 s \\ z_1 + c_1 t = z_2 + c_2 s \end{cases} \quad (*).$$

Khi đó:

- $\Delta_1 // \Delta_2 \Leftrightarrow \vec{u}_1$  cùng phương với  $\vec{u}_2$  và hệ (\*) vô nghiệm.
- $\Delta_1 \equiv \Delta_2 \Leftrightarrow$  Hệ (\*) có vô số nghiệm.
- $\Delta_1$  cắt  $\Delta_2 \Leftrightarrow$  Hệ (\*) có nghiệm duy nhất.
- $\Delta_1$  và  $\Delta_2$  chéo nhau  $\Leftrightarrow \vec{u}_1$  và  $\vec{u}_2$  không cùng phương và hệ (\*) vô nghiệm.

» **Luyện tập 10.** Trong không gian  $Oxyz$ , xét vị trí tương đối giữa hai đường thẳng

$$\Delta_1 : \begin{cases} x = 1 + 2t \\ y = 3 + t \\ z = 1 - t \end{cases} \text{ và } \Delta_2 : \begin{cases} x = s \\ y = 1 + 2s \\ z = 3s. \end{cases}$$

» **Vận dụng 3.** (H.5.30) Trong không gian  $Oxyz$ , có hai vật thể lặn lượt xuất phát từ  $A(1; 2; 0)$  và  $B(3; 5; 0)$  với vận tốc không đổi tương ứng là  $\vec{v}_1 = (2; 1; 3)$ ,  $\vec{v}_2 = (1; 2; 1)$ . Hỏi trong quá trình chuyển động, hai vật thể trên có va chạm vào nhau hay không?

Hình 5.30

## Bài 16. Công thức tính góc trong không gian

#### THUẬT NGỮ

- Góc giữa hai đường thẳng
- Góc giữa đường thẳng và mặt phẳng
- Góc giữa hai mặt phẳng

#### KIẾN THỨC, KĨ NĂNG

- Tính góc giữa hai đường thẳng, góc giữa đường thẳng và mặt phẳng, góc giữa hai mặt phẳng.
- Vận dụng kiến thức về góc vào một số bài toán liên quan đến thực tiễn.

Một mái nhà hình tròn được đặt trên ba cây cột trụ (H.5.33). Các cây cột vuông góc với mặt sàn nhà phẳng và có độ cao lần lượt là 7 m, 6 m, 5 m. Ba chân cột là ba đỉnh của một tam giác đều trên mặt sàn nhà với cạnh dài 4 m. Hỏi mái nhà nghiêng với mặt sàn nhà một góc bao nhiêu độ?

Hình 5.33

#### 1. CÔNG THỨC TÍNH GÓC GIỮA HAI ĐƯỜNG THẳng

**HĐ1.** Tìm mối quan hệ của góc giữa hai đường thẳng và góc giữa hai vectơ chỉ phương

Trong không gian  $Oxyz$ , cho hai đường thẳng  $\Delta$  và  $\Delta'$  tương ứng có các vectơ chỉ phương  $\vec{u} = (a; b; c)$ ,  $\vec{u}' = (a'; b'; c')$  (H.5.34).

a) Hãy tìm mối quan hệ giữa các góc  $(\Delta, \Delta')$  và  $(\vec{u}, \vec{u}')$ .

b) Có nhận xét gì về mối quan hệ giữa  $\cos(\Delta, \Delta')$  và  $|\cos(\vec{u}, \vec{u}')|$ ?

Hình 5.34

Trong không gian  $Oxyz$ , cho hai đường thẳng  $\Delta$  và  $\Delta'$  tương ứng có vectơ chỉ phương  $\vec{u} = (a; b; c)$ ,  $\vec{u}' = (a'; b'; c')$ . Khi đó:

$$\cos(\Delta, \Delta') = |\cos(\vec{u}, \vec{u}')| = \frac{|aa' + bb' + cc'|}{\sqrt{a^2 + b^2 + c^2} \cdot \sqrt{a'^2 + b'^2 + c'^2}}$$

» **Ví dụ 1.** Trong không gian  $Oxyz$ , tính góc giữa hai đường thẳng:

$$\Delta : \begin{cases} x = 1 + t \\ y = -1 + t \\ z = 3 \end{cases} \text{ và } \Delta' : \begin{cases} x = 1 + 2s \\ y = -2 + 2s \\ z = 4 + s. \end{cases}$$

**Giải**

Hai đường thẳng  $\Delta$  và  $\Delta'$  tương ứng có các vectơ chỉ phương  $\vec{u} = (1; 1; 0)$ ,  $\vec{u}' = (2; 2; 1)$ . Khi đó:

$$\cos(\Delta, \Delta') = |\cos(\vec{u}, \vec{u}')| = \frac{|1 \cdot 2 + 1 \cdot 2 + 0 \cdot 1|}{\sqrt{1^2 + 1^2 + 0^2} \cdot \sqrt{2^2 + 2^2 + 1^2}} = \frac{2\sqrt{2}}{3}.$$

Vậy  $(\Delta, \Delta') \approx 19,5^\circ$ .

Trong bài học này, nếu không nói gì thêm, ta quy ước tính góc theo đơn vị độ và làm tròn đến chữ số thập phân thứ nhất.

» **Luyện tập 1.** Trong không gian  $Oxyz$ , tính góc giữa trục  $Oz$  và đường thẳng

$$\Delta : \frac{x-3}{1} = \frac{y+1}{2} = \frac{z-1}{-2}.$$

#### 2. CÔNG THỨC TÍNH GÓC GIỮA ĐƯỜNG THẲNG VÀ MẶT PHẲNG

» **HĐ2.** Tìm mối quan hệ của góc giữa đường thẳng và mặt phẳng với góc giữa vectơ chỉ phương và vectơ pháp tuyến tương ứng

Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta$  và mặt phẳng  $(P)$ . Xét  $\vec{u} = (a; b; c)$  là một vectơ chỉ phương của  $\Delta$  và  $\vec{n} = (A; B; C)$  (với giá  $\Delta$ ) là một vectơ pháp tuyến của  $(P)$ . (H.5.35)

a) Hãy tìm mối quan hệ giữa các góc  $(\Delta, (P))$  và  $(\Delta, \Delta')$ .

b) Có nhận xét gì về mối quan hệ giữa  $\sin(\Delta, \Delta')$  và  $|\cos(\vec{u}, \vec{n})|$ ?

Hình 5.35

Trong không gian  $Oxyz$ , cho đường thẳng  $\Delta$  có vectơ chỉ phương  $\vec{u} = (a; b; c)$  và mặt phẳng  $(P)$  có vectơ pháp tuyến  $\vec{n} = (A; B; C)$ . Khi đó:

$$\sin(\Delta, (P)) = |\cos(\vec{u}, \vec{n})| = \frac{|aA + bB + cC|}{\sqrt{a^2 + b^2 + c^2} \cdot \sqrt{A^2 + B^2 + C^2}}.$$

» **Ví dụ 2.** Trong không gian  $Oxyz$ , tính góc tạo bởi trục  $Ox$  và mặt phẳng  $(P) : \sqrt{2}x - y + z + 2 = 0$ .

**Giải**

Trục  $Ox$  có vectơ chỉ phương  $\vec{i} = (1; 0; 0)$ , mặt phẳng  $(P)$  có vectơ pháp tuyến  $\vec{n} = (\sqrt{2}; -1; 1)$ . Ta có:

$$\sin(Ox, (P)) = \frac{|1 \cdot \sqrt{2} + 0 \cdot (-1) + 0 \cdot 1|}{\sqrt{1^2 + 0^2 + 0^2} \cdot \sqrt{2^2 + (-1)^2 + 1^2}} = \frac{\sqrt{2}}{2}.$$

Vậy  $Ox$  tạo với  $(P)$  góc  $45^\circ$ .

» **Luyện tập 2.** Trong không gian  $Oxyz$ , tính góc giữa đường thẳng  $\Delta$  và mặt phẳng  $(P)$ , với:

$$\Delta : \frac{x+2}{-1} = \frac{y-4}{2} = \frac{z+1}{1}, (P) : x - y + z - 1 = 0.$$

#### 3. CÔNG THỨC TÍNH GÓC GIỮA HAI MẶT PHẪNG

» **HĐ3.** Tìm mối quan hệ của góc giữa hai mặt phẳng và góc giữa hai vectơ pháp tuyến

Trong không gian  $Oxyz$ , cho hai mặt phẳng  $(P)$ ,  $(Q)$  tương ứng có các vectơ pháp tuyến là  $\vec{n} = (A; B; C)$ ,  $\vec{n}' = (A'; B'; C')$ . Lấy các đường thẳng  $\Delta$ ,  $\Delta'$  tương ứng có vectơ chỉ phương  $\vec{n}$ ,  $\vec{n}'$ . (H.5.36)

a) Góc giữa hai mặt phẳng  $(P)$  và  $(Q)$  và góc giữa hai đường thẳng  $\Delta$  và  $\Delta'$  có mối quan hệ gì?

b) Tính côsin của góc giữa hai mặt phẳng  $(P)$  và  $(Q)$ .

Hình 5.36

Trong không gian  $Oxyz$ , cho hai mặt phẳng  $(P)$ ,  $(Q)$  tương ứng có các vectơ pháp tuyến là  $\vec{n} = (A; B; C)$ ,  $\vec{n}' = (A'; B'; C')$ . Khi đó, góc giữa  $(P)$  và  $(Q)$ , kí hiệu là  $((P), (Q))$ , được tính theo công thức:

$$\cos((P), (Q)) = |\cos(\vec{n}, \vec{n}')| = \frac{|AA' + BB' + CC'|}{\sqrt{A^2 + B^2 + C^2} \cdot \sqrt{A'^2 + B'^2 + C'^2}}.$$

» **Ví dụ 3.** Trong không gian  $Oxyz$ , tính góc giữa hai mặt phẳng  $(P) : x + 2y + 2z - 1 = 0$  và  $(Q) : x + y - z + 1 = 0$ .

**Giải**

Các mặt phẳng  $(P)$ ,  $(Q)$  tương ứng có các vectơ pháp tuyến là  $\vec{n} = (1; 2; 2)$ ,  $\vec{n}' = (1; 1; -1)$ .

Ta có:  $\cos((P), (Q)) = \frac{|1 \cdot 1 + 2 \cdot 1 + 2 \cdot (-1)|}{\sqrt{1^2 + 2^2 + 2^2} \cdot \sqrt{1^2 + 1^2 + (-1)^2}} = \frac{\sqrt{3}}{9}.$

Do đó  $((P), (Q)) \approx 78,9^\circ$ .

» **Luyện tập 3.** Trong không gian  $Oxyz$ , tính góc giữa hai mặt phẳng  $(P) : x - \sqrt{2}y + z - 2 = 0$  và  $(Oxz) : y = 0$ .

» **Ví dụ 4.** Trong không gian  $Oxyz$ , cho  $A(0; 0; 4)$ ,  $B(0; -3; 0)$ ,  $C(0; 3; 0)$ ,  $D(3; 0; 0)$ . Tính góc giữa hai mặt phẳng  $(ABD)$  và  $(ACD)$ .

**Giải** (H.5.37)

Mặt phẳng  $(ABD)$  có cặp vectơ chỉ phương là  $\overrightarrow{BD} = (3; 3; 0)$

và  $\overrightarrow{AD} = (3; 0; -4)$ .

Suy ra  $(ABD)$  có vectơ pháp tuyến  $[\overrightarrow{BD}, \overrightarrow{AD}] = (-12; 12; -9)$ .

Do đó  $\vec{n} = (-4; 4; -3)$  cũng là vectơ pháp tuyến của  $(ABD)$ .

Mặt phẳng  $(ACD)$  có cặp vectơ chỉ phương là  $\overrightarrow{AC} = (0; 3; -4)$

và  $\overrightarrow{AD} = (3; 0; -4)$ . Suy ra  $(ACD)$  có vectơ pháp tuyến là

$[\overrightarrow{AC}, \overrightarrow{AD}] = (-12; -12; -9)$ . Do đó  $\vec{m} = (4; 4; 3)$  cũng là vectơ pháp tuyến của  $(ACD)$ .

Hình 5.37

Gọi  $\varphi$  là góc giữa hai mặt phẳng  $(ABD)$  và  $(ACD)$ . Khi đó:

$$\cos \varphi = |\cos(\vec{n}, \vec{m})| = \frac{|-4 \cdot 4 + 4 \cdot 4 + (-3) \cdot 3|}{\sqrt{(-4)^2 + 4^2 + (-3)^2} \cdot \sqrt{4^2 + 4^2 + 3^2}} = \frac{9}{41}.$$

Vậy  $\varphi \approx 77,3^\circ$ .

» **Vận dụng.** Hãy trả lời câu hỏi đã được nêu ra trong tình huống mở đầu.

## Bài 17. Phương trình mặt cầu

#### THUẬT NGỮ

- Phương trình mặt cầu
- Tâm và bán kính của mặt cầu

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết phương trình mặt cầu.
- Xác định tâm và bán kính mặt cầu khi biết phương trình.
- Lập phương trình mặt cầu khi biết tâm và bán kính.
- Vận dụng kiến thức về phương trình mặt cầu để giải quyết một số bài toán liên quan đến thực tiễn.

Bằng ứng dụng Google Maps, thực hiện phép đo khoảng cách trên bề mặt Trái Đất từ vị trí 10°N, 15°E đến vị trí 80°N, 70°E ta sẽ được khoảng cách 8271,74 km (H.5.40). Cơ sở toán học cho việc thiết lập phần mềm tính công thức khoảng cách trên bề mặt Trái Đất là gì?

Hình 5.40. Đo khoảng cách trên bề mặt Trái Đất bằng Google Maps

### 1. PHƯƠNG TRÌNH MẶT CẦU

Mặt cầu tâm  $I$  bán kính  $R$  ( $R > 0$ ) là tập các điểm trong không gian cách  $I$  một khoảng bằng  $R$ .

Một điểm  $M$  được gọi là nằm trong mặt cầu tâm  $I$  bán kính  $R$  nếu  $IM < R$  và được gọi là nằm ngoài mặt cầu đó nếu  $IM > R$ . Mỗi đường thẳng đi qua tâm mặt cầu đều cắt mặt cầu tại hai điểm phân biệt, đoạn thẳng nối hai điểm đó được gọi là một **đường kính của mặt cầu**. Mỗi đường kính của mặt cầu đều có trung điểm là tâm mặt cầu và có độ dài bằng hai lần bán kính mặt cầu.

##### » HØ1. Tìm phương trình mặt cầu biết tâm và bán kính

Trong không gian  $Oxyz$ , cho mặt cầu  $(S)$  tâm  $I(a; b; c)$  bán kính  $R$  (H.5.41). Khi đó, một điểm  $M(x; y; z)$  thuộc mặt cầu  $(S)$  khi và chỉ khi toạ độ của nó thoả mãn điều kiện gì?

Trong không gian  $Oxyz$ , mặt cầu  $(S)$  tâm  $I(a; b; c)$  bán kính  $R$  có phương trình

$$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2.$$

Hình 5.41

###### Chú ý

– Điểm  $M(x; y; z)$  nằm trong mặt cầu  $(S)$  nếu

$$(x - a)^2 + (y - b)^2 + (z - c)^2 < R^2.$$

– Điểm  $M(x; y; z)$  nằm ngoài mặt cầu  $(S)$  nếu

$$(x - a)^2 + (y - b)^2 + (z - c)^2 > R^2.$$

» **Ví dụ 1.** Trong không gian  $Oxyz$ , cho mặt cầu  $(S)$  có phương trình  $(x - 1)^2 + (y + 3)^2 + z^2 = 5$ .

a) Xác định tâm và bán kính của  $(S)$ .

b) Hỏi gốc toạ độ  $O(0; 0; 0)$  nằm trong, nằm ngoài hay thuộc mặt cầu  $(S)$ ?

**Giải**

a) Ta viết lại phương trình của mặt cầu  $(S)$  dưới dạng:  $(x - 1)^2 + [y - (-3)]^2 + (z - 0)^2 = (\sqrt{5})^2$ .

Vậy mặt cầu  $(S)$  có tâm  $I(1; -3; 0)$  và bán kính  $R = \sqrt{5}$ .

b) Ta có  $OI^2 = (0 - 1)^2 + (0 + 3)^2 + (0 - 0)^2 = 10 > 5 = R^2$ . Do đó, gốc toạ độ  $O(0; 0; 0)$  nằm ngoài mặt cầu  $(S)$ .

» **Luyện tập 1.** Trong không gian  $Oxyz$ , cho mặt cầu  $(S)$  có phương trình

$$(x + 2)^2 + y^2 + \left(z + \frac{1}{2}\right)^2 = \frac{9}{4}.$$

a) Xác định tâm và bán kính của  $(S)$ .

b) Hỏi điểm  $M(2; 0; 1)$  nằm trong, nằm ngoài hay thuộc mặt cầu  $(S)$ ?

» **Ví dụ 2.** Trong không gian  $Oxyz$ , viết phương trình mặt cầu  $(S)$  trong các trường hợp sau:

a) Tâm  $I\left(\frac{3}{2}; 0; -3\right)$ , bán kính  $R = \frac{9}{4}$ .

b) Đường kính  $AB$ , với  $A(1; 2; 1)$  và  $B(3; 1; 5)$ .

**Giải**

a) Mặt cầu  $(S)$  có tâm  $I\left(\frac{3}{2}; 0; -3\right)$  và có bán kính  $R = \frac{9}{4}$  nên có phương trình:

$$\left(x - \frac{3}{2}\right)^2 + (y - 0)^2 + (z + 3)^2 = \left(\frac{9}{4}\right)^2 \text{ hay } (S): \left(x - \frac{3}{2}\right)^2 + y^2 + (z + 3)^2 = \frac{81}{16}.$$

b) Đoạn thẳng  $AB$  có trung điểm là  $J\left(2; \frac{3}{2}; 3\right)$ .

Mặt cầu  $(S)$  có tâm  $J$  và bán kính  $R = \frac{1}{2}AB = \frac{1}{2}\sqrt{(3 - 1)^2 + (1 - 2)^2 + (5 - 1)^2} = \frac{\sqrt{21}}{2}$ .

Do đó  $(S): (x - 2)^2 + \left(y - \frac{3}{2}\right)^2 + (z - 3)^2 = \frac{21}{4}$ .

» **Luyện tập 2.** Trong không gian  $Oxyz$ , viết phương trình mặt cầu  $(S)$  trong các trường hợp sau:

a) Tâm là gốc toạ độ, bán kính  $R = 1$ .

b) Đường kính  $AB$ , với  $A(1; -1; 2)$ ,  $B(2; -3; -1)$ .

» **Ví dụ 3.** Trong không gian  $Oxyz$ , cho  $(S)$  là tập hợp các điểm  $M(x; y; z)$  có toạ độ thoả mãn phương trình:

$$x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0.$$

Chứng minh rằng  $(S)$  là một mặt cầu. Xác định tâm và tính bán kính của mặt cầu đó.

**Giải**

Ta viết lại phương trình đã cho dưới dạng:

$$(S): (x^2 - 2x + 1) + (y^2 + 4y + 4) + (z^2 - 6z + 9) = 16$$

hay

$$(S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 4^2.$$

Vậy  $(S)$  là mặt cầu có tâm  $I(1; -2; 3)$  và bán kính  $R = 4$ .

» **Luyện tập 3.** Trong không gian  $Oxyz$ , cho  $(S)$  là tập hợp các điểm  $M(x; y; z)$  có toạ độ thoả mãn phương trình:

$$(S): x^2 + y^2 + z^2 - 4x + 6y - 12 = 0.$$

Chứng minh rằng  $(S)$  là một mặt cầu. Xác định tâm và tính bán kính của mặt cầu đó.

**Nhận xét.** Với  $a, b, c, d$  là các hằng số, phương trình  $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$  có thể viết lại thành  $(x - a)^2 + (y - b)^2 + (z - c)^2 = a^2 + b^2 + c^2 - d$  và là phương trình của một mặt cầu  $(S)$  khi và chỉ khi  $a^2 + b^2 + c^2 - d > 0$ . Khi đó,  $(S)$  có tâm  $I(a; b; c)$  và bán kính  $R = \sqrt{a^2 + b^2 + c^2 - d}$ .

» **Ví dụ 4.** Trong không gian  $Oxyz$ , phương trình nào trong các phương trình sau là phương trình của một mặt cầu? Xác định tâm và tính bán kính của mặt cầu đó.

a)  $x^2 + y^2 + z^2 - 2x + 3y - 8z + 100 = 0$ .

b)  $x^2 + y^2 + z^2 - 4x + 5y - 2z - \frac{3}{4} = 0$ .

c)  $x^2 + y^2 + z^2 - 2xy + 6y - 9z + 10 = 0$ .

**Giải**

a) Phương trình đã cho tương ứng với  $a = 1, b = -\frac{3}{2}, c = 4, d = 100$ . Trong trường hợp này,  $a^2 + b^2 + c^2 - d = 1 + \frac{9}{4} + 16 - 100 < 0$ . Do đó phương trình đã cho không phải là phương trình của một mặt cầu.

b) Phương trình đã cho tương ứng với  $a = 2, b = -\frac{5}{2}, c = 1, d = -\frac{3}{4}$ . Trong trường hợp này,  $a^2 + b^2 + c^2 - d = 4 + \frac{25}{4} + 1 + \frac{3}{4} = 12 > 0$ . Do đó phương trình đã cho là phương trình của mặt cầu có tâm  $I\left(2; -\frac{5}{2}; 1\right)$  và bán kính  $R = \sqrt{12} = 2\sqrt{3}$ .

c) Phương trình đã cho không phải là phương trình của một mặt cầu vì xuất hiện  $-2xy$  trong phương trình.

» **Luyện tập 4.** Trong không gian  $Oxyz$ , cho mặt cầu  $(S)$  có phương trình:

$$x^2 + y^2 + z^2 + 4x - 5y + 6z + \frac{25}{4} = 0.$$

Xác định tâm, tính bán kính của  $(S)$ .

### 2. MỘT SỐ ỨNG DỤNG CỦA PHƯƠNG TRÌNH MẶT CẦU TRONG THỰC TIỄN

Trong mô hình toán học, bề mặt Trái Đất là mặt cầu với bán kính 6371 km (theo: *science.nasa.gov/earth/facts/*). Mỗi kinh tuyến là một nửa đường tròn có đường kính là trục của Trái Đất (đoạn thẳng nối cực Bắc  $N$  và cực Nam  $S$ ). Kinh tuyến gốc là kinh tuyến đi qua Đài Thiên văn Greenwich ở London. Mặt phẳng chứa kinh tuyến gốc chia Trái Đất làm hai nửa là bán cầu Đông và bán cầu Tây, nước ta nằm ở bán cầu Đông. Kinh độ của một điểm  $P$  trên bề mặt Trái Đất là số đo của góc nhị diện có hai mặt tương ứng chứa kinh tuyến gốc và kinh tuyến đi qua  $P$  (cạnh của góc nhị diện này là đường thẳng chứa trục Trái Đất). Kinh độ nhận giá trị trong đoạn từ  $0^\circ$  đến  $180^\circ$ . Vĩ độ của điểm  $P$  là số đo của góc giữa mặt phẳng chứa đường xích đạo và đường thẳng đi qua  $P$  và tâm  $O$  của Trái Đất. Vĩ độ nhận giá trị trong đoạn từ  $0^\circ$  đến  $90^\circ$ . Mỗi điểm trên bề mặt Trái Đất thuộc một trong hai bán cầu Bắc hoặc Nam và thuộc một trong hai bán cầu Đông hoặc Tây. Vì vậy, đi kèm với vĩ độ, còn có chữ  $E$  hoặc  $W$  nếu vị trí đó tương ứng thuộc bán cầu Đông hay bán cầu Tây và có chữ  $N$ ,  $S$  nếu vị trí đó tương ứng ở bán cầu Bắc hay bán cầu Nam (Hình 5.42). Chẳng hạn, hồ Hoàn Kiếm (Hà Nội) ở vị trí:  $21^\circ 01' 51'' N$ ,  $105^\circ 51' 09'' E$  (theo: *maps.google.com*). Vị trí trên mặt đất hoàn toàn xác định khi biết vĩ độ và kinh độ (bao gồm cả các kí hiệu  $N$ ,  $S$ ,  $E$ ,  $W$ ).

Hình 5.42

Trong bài học này, ta xét Trái Đất trong không gian  $Oxyz$ , với  $O$  là tâm Trái Đất, tia  $Ox$  chứa giao điểm của kinh tuyến gốc và xích đạo, tia  $Oz$  chứa điểm cực Bắc  $N$ , tia  $Oy$  giao xích đạo tại điểm thuộc bán cầu Đông, 1 đơn vị dài trong không gian  $Oxyz$  tương ứng với 6 371 km trên thực tế. Như vậy, trong không gian  $Oxyz$ , bề mặt Trái Đất có phương trình:  $x^2 + y^2 + z^2 = 1$ .

Nếu biết vĩ độ và kinh độ của một vị trí trên mặt đất thì toạ độ của nó trong không gian cũng dễ dàng được xác định và ngược lại. Chẳng hạn, vị trí  $P$  có vĩ độ, kinh độ tương ứng là  $\alpha^\circ N$ ,  $\beta^\circ E$  ( $0 < \alpha < 90$ ,  $0 < \beta < 180$ ) có toạ độ  $P(\cos \alpha^\circ \cos \beta^\circ; \cos \alpha^\circ \sin \beta^\circ; \sin \alpha^\circ)$  (H.5.43), vị trí  $Q$  có vĩ độ, kinh độ tương ứng là  $\alpha^\circ N$ ,  $\beta^\circ W$  ( $0 < \alpha < 90$ ,  $0 < \beta < 180$ ) thì có toạ độ  $Q(\cos \alpha^\circ \cos \beta^\circ; -\cos \alpha^\circ \sin \beta^\circ; \sin \alpha^\circ)$  (H.5.44).

Hình 5.43

Hình 5.44

Ứng dụng Google Maps cho phép xác định khoảng cách giữa hai vị trí trên bề mặt Trái Đất khi biết vĩ độ và kinh độ của chúng. Khoảng cách giữa hai vị trí  $P$  và  $Q$  trên bề mặt Trái Đất là độ dài cung nhỏ  $PQ$  của đường tròn có tâm  $O$  và đi qua hai điểm  $P, Q$ . Cung tròn nói trên là đường đi ngắn nhất trên bề mặt Trái Đất từ  $P$  đến  $Q$ . Trong ví dụ sau đây, ta sẽ tính khoảng cách giữa hai vị trí đã được nêu ra trong mở đầu bài học.

Quy ước: Trong phần này, kết quả phép tính được làm tròn đến chữ số thập phân thứ tư sau dấu phẩy.

- » **Ví dụ 5.** Biết rằng nếu vị trí  $M$  có vĩ độ và kinh độ tương ứng là  $\alpha^\circ N, \beta^\circ E$  ( $0 < \alpha < 90, 0 < \beta < 90$ ) thì có tọa độ  $M(\cos \alpha^\circ \cos \beta^\circ; \cos \alpha^\circ \sin \beta^\circ; \sin \alpha^\circ)$ . Tính khoảng cách trên mặt đất từ vị trí  $P: 10^\circ N, 15^\circ E$  đến vị trí  $Q: 80^\circ N, 70^\circ E$ .

**Giải**

Ta có

$$P(\cos 10^\circ \cos 15^\circ; \cos 10^\circ \sin 15^\circ; \sin 10^\circ), Q(\cos 80^\circ \cos 70^\circ; \cos 80^\circ \sin 70^\circ; \sin 80^\circ).$$

Suy ra

$$\vec{OP} = (\cos 10^\circ \cos 15^\circ; \cos 10^\circ \sin 15^\circ; \sin 10^\circ), \vec{OQ} = (\cos 80^\circ \cos 70^\circ; \cos 80^\circ \sin 70^\circ; \sin 80^\circ).$$

Do đó

$$\vec{OP} \cdot \vec{OQ} = \cos 10^\circ \cos 15^\circ \cos 80^\circ \cos 70^\circ + \cos 10^\circ \sin 15^\circ \cos 80^\circ \sin 70^\circ + \sin 10^\circ \sin 80^\circ \\ \approx 0,2691.$$

Vì  $P, Q$  thuộc mặt đất nên  $|\vec{OP}| = |\vec{OQ}| = 1$ .

$$\text{Do đó } \cos \widehat{POQ} = \frac{\vec{OP} \cdot \vec{OQ}}{|\vec{OP}| \cdot |\vec{OQ}|} \approx 0,2691. \text{ Suy ra } \widehat{POQ} \approx 74,3893^\circ.$$

Mặt khác, đường tròn tâm  $O$ , đi qua  $P, Q$  có bán kính 1 và chu vi là  $2\pi \approx 6,2832$ , nên cung nhỏ  $\widehat{PQ}$  của đường tròn đó có độ dài xấp xỉ bằng  $\frac{74,3893}{360} \cdot 6,2832 \approx 1,2983$ .

Do 1 đơn vị dài trong không gian  $Oxyz$  tương ứng với 6 371 km trên thực tế, nên khoảng cách trên mặt đất giữa hai vị trí  $P, Q$  xấp xỉ bằng  $1,2983 \cdot 6371 = 8271,4693$  (km).

- » **Luyện tập 5.** Tính khoảng cách trên mặt đất từ vị trí  $A$  là giao giữa kinh tuyến gốc với xích đạo đến vị trí  $B: 45^\circ N, 30^\circ E$ .

- » **Trải nghiệm.** Trên Google Maps, thực hiện phép đo khoảng cách từ vị trí  $0^\circ N, 0^\circ E$  đến vị trí  $45^\circ N, 30^\circ E$  và so sánh với kết quả tính được ở Luyện tập 5.

# CHƯƠNG VI. XÁC SUẤT CÓ ĐIỀU KIỆN

## Bài 18. Xác suất có điều kiện

#### THUẬT NGỮ

- Xác suất có điều kiện
- Công thức nhân xác suất
- Bảng dữ liệu thống kê  $2 \times 2$

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết khái niệm về xác suất có điều kiện.
- Nhận biết mối liên hệ giữa xác suất có điều kiện và xác suất.
- Vận dụng công thức nhân xác suất cho hai biến cố bất kì.
- Giải thích ý nghĩa của xác suất có điều kiện trong một số tình huống thực tế.

Ô cửa bí mật (Let's Make a Deal) là một trò chơi trên truyền hình nổi tiếng ở Mỹ, đã được mua bản quyền và phát sóng ở nhiều nước trên thế giới. Nội dung trò chơi như sau:

- Người chơi được mời lên sân khấu và đứng trước ba cánh cửa đóng kín. Sau một cánh cửa có chiếc ô tô, sau mỗi cánh cửa còn lại là một con lừa. Người chơi được yêu cầu chọn ngẫu nhiên một cánh cửa, nhưng không được mở ra.
- Tiếp đó người quản trò tuyên bố sẽ mở ngẫu nhiên một trong hai cánh cửa người chơi không chọn mà sau cửa đó là con lừa. Người quản trò hỏi người chơi muốn giữ nguyên sự lựa chọn ban đầu của mình hay muốn chuyển sang cửa chưa mở còn lại.

Các kiến thức trong bài học này sẽ giúp ta cho người chơi lời khuyên.

### 1. XÁC SUẤT CÓ ĐIỀU KIỆN

Trong thực tế, ta thường cập nhật xác suất của một biến cố khi biết thêm một thông tin nào đó. Chẳng hạn:

- Tính xác suất để ngày mai mưa nếu hôm nay không mưa;
- Tính xác suất để bạn An là học sinh giỏi môn Toán nếu biết rằng An là một học sinh giỏi môn Tin;
- Tính xác suất để một người thọ 80 tuổi nếu người đó đã sống đến 60 tuổi. (Các công ty bảo hiểm rất quan tâm đến xác suất này).

##### » **HĐ1. Hình thành khái niệm xác suất có điều kiện**

Trong một hộp kín có 7 chiếc bút bi xanh và 5 chiếc bút bi đen, các chiếc bút có cùng kích thước và khối lượng. Bạn Sơn lấy ngẫu nhiên một chiếc bút bi trong hộp, không trả lại. Sau đó Tùng lấy ngẫu nhiên một trong 11 chiếc bút còn lại. Tính xác suất để Tùng lấy được bút bi xanh nếu biết rằng Sơn đã lấy được bút bi đen.

Ta có định nghĩa sau:

Cho hai biến cố  $A$  và  $B$ . Xác suất của biến cố  $A$ , tính trong điều kiện biết rằng biến cố  $B$  đã xảy ra, được gọi là xác suất của  $A$  với điều kiện  $B$  và kí hiệu là  $P(A|B)$ .

Xác suất có điều kiện có thể được tính theo công thức sau:

Cho hai biến cố  $A$  và  $B$  bất kì, với  $P(B) > 0$ . Khi đó

$$P(A|B) = \frac{P(AB)}{P(B)}.$$

» **Ví dụ 1.** Một hộp có 20 viên bi trắng và 10 viên bi đen, các viên bi có cùng kích thước và khối lượng. Bạn Bình lấy ngẫu nhiên một viên bi trong hộp, không trả lại. Sau đó bạn An lấy ngẫu nhiên một viên bi trong hộp đó.

Gọi  $A$  là biến cố: “An lấy được viên bi trắng”;  $B$  là biến cố: “Bình lấy được viên bi trắng”.

Tính  $P(A|B)$  bằng định nghĩa và bằng công thức tính  $P(A|B)$  ở trên.

**Giải**

**Cách 1: Bằng định nghĩa**

Nếu  $B$  xảy ra tức là Bình lấy được viên bi trắng. Khi đó, trong hộp còn lại 29 viên bi với 19 viên bi trắng và 10 viên bi đen. Vậy  $P(A|B) = \frac{19}{29}$ .

**Cách 2: Bằng công thức**

Bình có 30 cách chọn, An có 29 cách chọn một viên bi trong hộp. Do đó  $n(\Omega) = 30 \cdot 29$ .

Bình có 20 cách chọn một viên bi trắng, An có 29 cách chọn từ 29 viên bi còn lại.

Do đó  $n(B) = 20 \cdot 29$  và  $P(B) = \frac{n(B)}{n(\Omega)}$ .

Bình có 20 cách chọn một viên bi trắng, An có 19 cách chọn một viên bi trắng trong 19 viên bi trắng còn lại.

Do đó  $n(AB) = 20 \cdot 19$  và  $P(AB) = \frac{n(AB)}{n(\Omega)}$ .

Vậy  $P(A|B) = \frac{P(AB)}{P(B)} = \frac{n(AB)}{n(B)} = \frac{20 \cdot 19}{20 \cdot 29} = \frac{19}{29}$ .

» **Luyện tập 1.** Trở lại Ví dụ 1. Tính  $P(A|\bar{B})$  bằng định nghĩa và bằng công thức.

###### » **Ví dụ 2**

- a) Từ công thức tính  $P(A|B)$  ở trên, chứng minh rằng nếu  $A$  và  $B$  là hai biến cố độc lập với  $P(A) > 0, P(B) > 0$  thì  $P(A|B) = P(A)$  và  $P(B|A) = P(B)$ .
- b) Từ định nghĩa xác suất có điều kiện và định nghĩa về tính độc lập của hai biến cố, hãy chứng tỏ rằng nếu  $A$  và  $B$  là hai biến cố độc lập thì  $P(A|B) = P(A)$  và  $P(B|A) = P(B)$ .

**Giải**

- a) Nếu  $A$  và  $B$  là hai biến cố độc lập thì  $P(AB) = P(A) \cdot P(B)$ .

Vậy với  $P(A) > 0, P(B) > 0$  ta có:

$$P(A|B) = \frac{P(AB)}{P(B)} = \frac{P(A) \cdot P(B)}{P(B)} = P(A);$$

$$P(B|A) = \frac{P(BA)}{P(A)} = \frac{P(B) \cdot P(A)}{P(A)} = P(B).$$

- b) Theo định nghĩa,  $P(A|B)$  là xác suất của  $A$ , tính trong điều kiện biết rằng biến cố  $B$  đã xảy ra. Vì  $A, B$  độc lập nên việc xảy ra  $B$  không ảnh hưởng tới xác suất xuất hiện của  $A$ . Do đó:

$$P(A|B) = P(A).$$

Tương tự  $P(B|A)$  là xác suất của  $B$ , tính trong điều kiện biết rằng biến cố  $A$  đã xảy ra. Vì  $A, B$  độc lập nên việc xảy ra  $A$  không ảnh hưởng tới xác suất xuất hiện của  $B$ . Do đó:

$$P(B|A) = P(B).$$

» **Luyện tập 2.** Chứng tỏ rằng nếu  $A$  và  $B$  là hai biến cố độc lập thì:

$$P(\bar{A}|B) = P(\bar{A}) \text{ và } P(A|\bar{B}) = P(A).$$

Sử dụng tính chất đã học ở lớp 11: Nếu cặp biến cố  $A$  và  $B$  độc lập thì các cặp biến cố  $\bar{A}$  và  $B$ ;  $A$  và  $\bar{B}$  cũng độc lập.

» **Ví dụ 3.** (Bảng dữ liệu thống kê  $2 \times 2$ ) Một viện nghiên cứu về an toàn giao thông muốn tìm hiểu về mối quan hệ giữa việc thắt dây an toàn khi lái xe và nguy cơ tử vong của người lái xe khi xảy ra tai nạn giao thông. Giả sử viện đã xem xét 577 006 vụ tai nạn giao thông ô tô và việc thắt dây an toàn của người lái xe khi xảy ra tai nạn giao thông. Kết quả cho thấy:

- Trong số những người lái xe có thắt dây an toàn, có 510 người tử vong và 412 368 người sống sót;
- Trong số những người lái xe không thắt dây an toàn, có 1 601 người tử vong và 162 527 người sống sót.

Kết quả trên được trình bày dưới dạng bảng gồm 2 dòng và 2 cột như dưới đây, được gọi là **bảng dữ liệu thống kê  $2 \times 2$** :

| Kết quả \ Thắt dây an toàn | Tử vong | Sống sót |
|----------------------------|---------|----------|
| Không                      | 1 601   | 162 527  |
| Có                         | 510     | 412 368  |

Chọn ngẫu nhiên một người lái xe trong số 577 006 người bị tai nạn giao thông.

- a) Tính xác suất để người lái xe đó tử vong khi xảy ra tai nạn giao thông trong trường hợp không thắt dây an toàn.
- b) Tính xác suất để người lái xe đó tử vong khi xảy ra tai nạn giao thông trong trường hợp có thắt dây an toàn.
- c) So sánh hai xác suất ở câu a và câu b rồi rút ra kết luận.

###### **Giải**

- a) Không gian mẫu  $\Omega$  là tập hợp gồm 577 006 người lái xe xảy ra tai nạn giao thông

$$\Rightarrow n(\Omega) = 577\,006.$$

Gọi  $A$  là biến cố: "Người lái xe đó tử vong khi xảy ra tai nạn giao thông";

$B$  là biến cố: "Người lái xe đó không thắt dây an toàn khi xảy ra tai nạn giao thông".

Khi đó  $AB$  là biến cố: "Người lái xe đó tử vong và không thắt dây an toàn khi xảy ra tai nạn giao thông".

Ta cần tính  $P(A|B)$ .

Ta có  $162\,527 + 1601 = 164\,128$  người không thắt dây an toàn  $\Rightarrow n(B) = 164\,128$ .

$$\text{V} \text{ậ}y P(B) = \frac{n(B)}{n(\Omega)} = \frac{164\,128}{577\,006}.$$

Trong số những người không thắt dây an toàn, có 1 601 người tử vong khi xảy ra tai nạn giao thông  $\Rightarrow n(AB) = 1\,601$ . V \text{ậ}y  $P(AB) = \frac{n(AB)}{n(\Omega)} = \frac{1\,601}{577\,006}$ .

$$\text{Do } \text{đ} \text{o} P(A|B) = \frac{P(AB)}{P(B)} = \frac{1\,601}{164\,128} \approx 9,755 \cdot 10^{-3} = 0,009755.$$

- b) Ta cần tính  $P(A|\bar{B})$ .

$\bar{B}$  là biến cố: "Người lái xe đó có thắt dây an toàn khi xảy ra tai nạn giao thông".

$A\bar{B}$  là biến cố: "Người lái xe đó tử vong và có thắt dây an toàn khi xảy ra tai nạn giao thông".

Ta có  $412\,368 + 510 = 412\,878$  người lái xe có thắt dây an toàn  $\Rightarrow n(\bar{B}) = 412\,878$ .

Trong số những người có thắt dây an toàn, có 510 người tử vong khi xảy ra tai nạn giao thông  $\Rightarrow n(A\bar{B}) = 510$ .

Tương tự như trên, ta có:

$$P(A|\bar{B}) = \frac{P(A\bar{B})}{P(\bar{B})} = \frac{n(A\bar{B})}{n(\bar{B})} = \frac{510}{412\,878} \approx 1,235 \cdot 10^{-3} = 0,001235.$$

- c) Ta có:

$$\frac{P(A|B)}{P(A|\bar{B})} \approx \frac{9,755 \cdot 10^{-3}}{1,235 \cdot 10^{-3}} \approx 7,9 \Rightarrow P(A|B) \approx 7,9 \cdot P(A|\bar{B}).$$

Như vậy, xác suất để một người lái xe không thắt dây an toàn bị tử vong khi xảy ra tai nạn giao thông cao gấp khoảng 7,9 lần xác suất để một người lái xe thắt dây an toàn bị tử vong khi xảy ra tai nạn giao thông. Tức là, không thắt dây an toàn làm tăng nguy cơ bị tử vong khi xảy ra tai nạn giao thông của người lái xe lên gấp khoảng 7,9 lần.

» **Luyện tập 3.** Một công ty dược phẩm muốn so sánh tác dụng điều trị bệnh X của hai loại thuốc M và N. Công ty đã tiến hành thử nghiệm với 4 000 bệnh nhân mắc bệnh X trong đó 2 400 bệnh nhân dùng thuốc M, 1 600 bệnh nhân còn lại dùng thuốc N. Kết quả được cho trong bảng dữ liệu thống kê  $2 \times 2$  như sau:

| Uống thuốc \ Kết quả | M     | N     |
|----------------------|-------|-------|
| Khỏi bệnh            | 1 600 | 1 200 |
| Không khỏi bệnh      | 800   | 400   |

Chọn ngẫu nhiên một bệnh nhân trong số 4 000 bệnh nhân thử nghiệm sau khi uống thuốc. Tính xác suất để bệnh nhân đó

- uống thuốc M, biết rằng bệnh nhân đó khỏi bệnh;
- uống thuốc N, biết rằng bệnh nhân đó không khỏi bệnh.

#### 2. CÔNG THỨC NHÂN XÁC SUẤT

##### » **HĐ2.** Hình thành công thức nhân xác suất

Chứng minh rằng, với hai biến cố A và B,  $P(B) > 0$ , ta có:

$$P(AB) = P(B) \cdot P(A|B).$$

**Chú ý.** Nếu  $P(B) = 0$  thì  $P(AB) = 0$  nên công thức tính  $P(AB)$  ở trên đúng với mọi biến cố A, B.

Vậy với hai biến cố A và B bất kì, ta có:

$$P(AB) = P(B) \cdot P(A|B).$$

Công thức trên được gọi là **công thức nhân xác suất**.

**Nhận xét.** Vì  $AB = BA$  nên với hai biến cố A và B bất kì, ta cũng có:

$$P(AB) = P(A) \cdot P(B|A).$$

Nếu A và B là hai biến cố độc lập thì

$$P(AB) = P(A) \cdot P(B).$$

» **Ví dụ 4.** Trong một hộp kín có 7 chiếc bút bi xanh và 5 chiếc bút bi đen, các chiếc bút có cùng kích thước và khối lượng. Bạn Sơn lấy ngẫu nhiên một chiếc bút bi từ trong hộp, không trả lại. Sau đó bạn Tùng lấy ngẫu nhiên một trong 11 chiếc bút còn lại. Tính xác suất để Sơn lấy được bút bi đen và Tùng lấy được bút bi xanh.

**Giải**

Gọi A là biến cố: "Bạn Sơn lấy được bút bi đen";

B là biến cố: "Bạn Tùng lấy được bút bi xanh".

Ta cần tính  $P(AB)$ .

$$\text{Vì } n(A) = 5 \text{ nên } P(A) = \frac{5}{12}.$$

Nếu A xảy ra tức là bạn Sơn lấy được bút bi đen thì trong hộp có 11 bút bi với 7 bút bi xanh.

Vậy  $P(B|A) = \frac{7}{11}$ .

Theo công thức nhân xác suất:  $P(AB) = P(A) \cdot P(B|A) = \frac{5}{12} \cdot \frac{7}{11} = \frac{35}{132}$ .

Một phương pháp mô tả trực quan lời giải trên là dùng sơ đồ hình cây.

Trên nhánh OD và OX tương ứng ghi xác suất lấy được bút đen và bút xanh.

Trên nhánh DD, DX tương ứng ghi xác suất lấy được bút đen, bút xanh với điều kiện đã lấy được bút đen.

Trên nhánh XD, XX tương ứng ghi xác suất lấy được bút đen, bút xanh với điều kiện đã lấy được bút xanh.

Vậy xác suất cần tính là:  $\frac{5}{12} \cdot \frac{7}{11} = \frac{35}{132}$ .

##### » **Luyện tập 4.** Trở lại Ví dụ 4. Tính xác suất để:

- a) Sơn lấy được bút bi xanh và Tùng lấy được bút bi đen;
- b) Hai chiếc bút lấy ra có cùng màu.

##### » **Vận dụng.** Trở lại trò chơi “Ô cửa bí mật” trong tình huống mở đầu. Giả sử người chơi chọn cửa sổ 1 và người quản trò mở cửa sổ 3.

Kí hiệu  $E_1; E_2; E_3$  tương ứng là các biến cố: “Sau ô cửa sổ 1 có ô tô”; “Sau ô cửa sổ 2 có ô tô”; “Sau ô cửa sổ 3 có ô tô” và  $H$  là biến cố: “Người quản trò mở ô cửa sổ 3 thấy con lừa”.

Sau khi người quản trò mở cánh cửa sổ 3 thấy con lừa, tức là khi  $H$  xảy ra. Để quyết định thay đổi lựa chọn hay không, người chơi cần so sánh hai xác suất có điều kiện:  $P(E_1|H)$  và  $P(E_2|H)$ .

a) Chứng minh rằng:

- $P(E_1) = P(E_2) = P(E_3) = \frac{1}{3}$ ;
- $P(H|E_1) = \frac{1}{2}$  và  $P(H|E_2) = 1$ .

b) Sử dụng công thức tính xác suất có điều kiện và công thức nhân xác suất, chứng minh rằng:

$$\bullet P(E_1 | H) = \frac{P(E_1) \cdot P(H | E_1)}{P(H)};$$

$$\bullet P(E_2 | H) = \frac{P(E_2) \cdot P(H | E_2)}{P(H)}.$$

c) Từ các kết quả trên hãy suy ra:

$$P(E_2 | H) = 2P(E_1 | H).$$

Từ đó hãy đưa ra lời khuyên cho người chơi: Nên giữ nguyên sự lựa chọn ban đầu hay chuyển sang cửa chưa mở còn lại?

*Hướng dẫn:* Nếu  $E_1$  xảy ra, tức là sau cửa số 1 có ô tô. Khi đó, sau cửa số 2 và 3 là con lừa. Người quản trò chọn ngẫu nhiên một trong hai cửa số 2 và 3 để mở ra. Do đó, việc chọn cửa số 2 hay cửa số 3 có khả năng như nhau. Vậy  $P(H | E_1) = \frac{1}{2}$ .

Nếu  $E_2$  xảy ra, tức là cửa số 2 có ô tô. Khi đó, người quản trò chắc chắn phải mở cửa số 3. Do đó  $P(H | E_2) = 1$ .

## Bài 19. Công thức xác suất toàn phần và công thức Bayes

#### **THUẬT NGỮ**

- Công thức xác suất toàn phần
- Sơ đồ hình cây
- Công thức Bayes

#### **KIẾN THỨC, KĨ NĂNG**

- Mô tả và biết vận dụng công thức xác suất toàn phần vào các tình huống có nội dung thực tiễn.
- Nắm được và biết vận dụng công thức Bayes vào các tình huống có nội dung thực tiễn.

#### **1. CÔNG THỨC XÁC SUẤT TOÀN PHẦN**

Số khán giả đến xem buổi biểu diễn ca nhạc ngoài trời phụ thuộc vào thời tiết. Giả sử, nếu trời không mưa thì xác suất để bán hết vé là 0,9; còn nếu trời mưa thì xác suất để bán hết vé chỉ là 0,4. Dự báo thời tiết cho thấy xác suất để trời mưa vào buổi biểu diễn là 0,75. Nhà tổ chức sự kiện quan tâm đến xác suất để bán được hết vé là bao nhiêu.

Công thức xác suất trong Mục 1 sẽ trả lời cho ta câu hỏi đó.

| Hiện tại                  | Theo giờ | Ngày mai | 3 ngày tới | 5 ngày tới   | 7 ngày tới |
|---------------------------|----------|----------|------------|--------------|------------|
| Thời tiết Hà Nội ngày mai |          |          |            |              |            |
| 01:00                     | 25°/25°  | Mưa nhẹ  | ☔ 34 %     | ☔ 18.47 km/h | ▼          |
| 04:00                     | 24°/24°  | Mây cụm  | ☔ 6 %      | ☔ 11.45 km/h | ▼          |
| 07:00                     | 24°/25°  | Mây cụm  | ☔ 22 %     | ☔ 10.51 km/h | ▼          |
| 10:00                     | 26°/26°  | Mưa nhẹ  | ☔ 64 %     | ☔ 11.16 km/h | ▼          |
| 13:00                     | 26°/26°  | Mưa nhẹ  | ☔ 78 %     | ☔ 9.4 km/h   | ▼          |
| 16:00                     | 27°/28°  | Mưa nhẹ  | ☔ 31 %     | ☔ 10.19 km/h | ▼          |
| 19:00                     | 25°/26°  | Mây cụm  | ☔ 1 %      | ☔ 5.83 km/h  | ▼          |
| 22:00                     | 23°/23°  | Mưa nhẹ  | ☔ 33 %     | ☔ 8.6 km/h   | ▼          |

Hình 6.1. Minh họa về dự báo thời tiết  
(Ảnh: <https://thoitiет.edu.vn/>)

##### **HĐ1. Hình thành công thức xác suất toàn phần**

Gọi A là biến cố “Trời mưa” và B là biến cố “Bán hết vé” trong tình huống mô đầu.

a) Tính  $P(A)$ ,  $P(\overline{A})$ ,  $P(B|A)$ ,  $P(B|\overline{A})$ .

b) Trong hai xác suất  $P(A)$  và  $P(B)$ , nhà tổ chức sự kiện quan tâm đến xác suất nào nhất?

Dựa trên các dữ kiện đã biết, có thể tính được  $P(B)$  hay không? Công thức sau đây giúp ta trả lời cho câu hỏi này.

Cho hai biến cố A và B. Khi đó, ta có công thức sau:

$$P(B) = P(A) \cdot P(B|A) + P(\overline{A}) \cdot P(B|\overline{A}).$$

Công thức trên được gọi là **công thức xác suất toàn phần**.

» **Ví dụ 1.** Ông An hằng ngày đi làm bằng xe máy hoặc xe buýt. Nếu hôm nay ông đi làm bằng xe buýt thì xác suất để hôm sau ông đi làm bằng xe máy là 0,4. Nếu hôm nay ông đi làm bằng xe máy thì xác suất để hôm sau ông đi làm bằng xe buýt là 0,7. Xét một tuần mà thứ Hai ông An đi làm bằng xe buýt. Tính xác suất để thứ Tư trong tuần đó, ông An đi làm bằng xe máy.

**Giải**

Gọi  $A$  là biến cố: “Thứ Ba, ông An đi làm bằng xe máy”;  $B$  là biến cố: “Thứ Tư, ông An đi làm bằng xe máy”. Ta cần tính  $P(B)$ . Theo công thức xác suất toàn phần, ta có:

$$P(B) = P(A) \cdot P(B | A) + P(\bar{A}) \cdot P(B | \bar{A}).$$

- Tính  $P(A)$ : Vì thứ Hai, ông An đi làm bằng xe buýt nên xác suất để thứ Ba (hôm sau), ông đi làm bằng xe máy là 0,4. Vậy  $P(A) = 0,4$ .
- Tính  $P(\bar{A})$ : Ta có  $P(\bar{A}) = 1 - 0,4 = 0,6$ .
- Tính  $P(B | A)$ : Đây là xác suất để thứ Tư, ông An đi làm bằng xe máy nếu thứ Ba, ông An đi làm bằng xe máy.
- Theo giả thiết, nếu hôm nay ông đi làm bằng xe máy thì xác suất để hôm sau ông đi làm bằng xe buýt là 0,7 và đi làm bằng xe máy là  $1 - 0,7 = 0,3$ . Do đó, nếu thứ Ba, ông An đi làm bằng xe máy thì xác suất để thứ Tư, ông đi làm bằng xe máy là 0,3. Vậy  $P(B | A) = 0,3$ .
- Tính  $P(B | \bar{A})$ : Đây là xác suất để thứ Tư, ông An đi làm bằng xe máy nếu thứ Ba ông An đi làm bằng xe buýt. Theo giả thiết, nếu hôm nay ông đi làm bằng xe buýt thì xác suất để hôm sau ông đi làm bằng xe máy là 0,4. Do đó nếu thứ Ba, ông An đi làm bằng xe buýt thì xác suất để thứ Tư, ông đi làm bằng xe máy là 0,4. Suy ra  $P(B | \bar{A}) = 0,4$ . Vậy:

$$P(B) = P(A) \cdot P(B | A) + P(\bar{A}) \cdot P(B | \bar{A}) = 0,4 \cdot 0,3 + 0,6 \cdot 0,4 = 0,36.$$

» **Luyện tập 1.** Trở lại tình huống mở đầu Mục 1. Tính xác suất để nhà tổ chức sự kiện bán hết vé.

**Chú ý.** Một phương pháp mô tả trực quan công thức xác suất toàn phần là dùng sơ đồ hình cây.

Trở lại Ví dụ 1. Kí hiệu  $A$  là biến cố: “Thứ Ba, ông An đi làm bằng xe máy”;  $B$  là biến cố: “Thứ Tư, ông An đi làm bằng xe máy”.

Ta vẽ sơ đồ hình cây như sau:

Hình 6.2. Sơ đồ hình cây mô tả xác suất của biến cố

Trên nhánh cây  $OA$  và  $O\bar{A}$  tương ứng ghi  $P(A)$  và  $P(\bar{A})$ ;

Trên nhánh cây  $AB$  và  $A\bar{B}$  tương ứng ghi  $P(B|A)$  và  $P(\bar{B}|A)$ ;

Trên nhánh cây  $\bar{A}B$  và  $\bar{A}\bar{B}$  tương ứng ghi  $P(B|\bar{A})$  và  $P(\bar{B}|\bar{A})$ .

Có hai nhánh cây đi tới  $B$  là  $OAB$  và  $O\bar{A}B$ . Vậy:

$$P(B) = 0,4 \cdot 0,3 + 0,6 \cdot 0,4 = 0,36.$$

» **Luyện tập 2.** Trở lại Ví dụ 1. Sử dụng sơ đồ hình cây, hãy mô tả cách tính xác suất để thứ Tư, ông An đi làm bằng xe buýt.

» **Vận dụng.** Hình dạng hạt của đậu Hà Lan có hai kiểu hình: hạt trơn và hạt nhăn, có hai gene ứng với hai kiểu hình này là gene trội  $B$  và gene lặn  $b$ .

Khi cho lai hai cây đậu Hà Lan, cây con lấy ngẫu nhiên một cách độc lập một gene từ cây bố và một gene từ cây mẹ để hình thành một cặp gene. Giả sử cây bố và cây mẹ được chọn ngẫu nhiên từ một quần thể các cây đậu Hà Lan, ở đó tỉ lệ cây mang kiểu gene  $bb$ ,  $Bb$  tương ứng là 40% và 60%. Tính xác suất để cây con có kiểu gene  $bb$ .

*Hướng dẫn:*

Gọi  $A$  là biến cố: "Cây bố có kiểu gene  $bb$ ";

$M$  là biến cố: "Cây con lấy gene  $b$  từ cây bố";

$N$  là biến cố: "Cây con lấy gene  $b$  từ cây mẹ";

$E$  là biến cố: "Cây con có kiểu gene  $bb$ ".

Theo giả thiết,  $M$  và  $N$  độc lập nên  $P(E) = P(M) \cdot P(N)$ .

Tính  $P(M)$ : Ta áp dụng công thức xác suất toàn phần:

$$P(M) = P(A) \cdot P(M|A) + P(\bar{A}) \cdot P(M|\bar{A}). \quad (*)$$

Ta có  $P(A) = 0,4$ ;  $P(\bar{A}) = 0,6$ .

$P(M|A)$  là xác suất để cây con lấy gene  $b$  từ cây bố với điều kiện cây bố có kiểu gene  $bb$ .

Do đó  $P(M|A) = 1$ .

$P(M|\bar{A})$  là xác suất để cây con lấy gene  $b$  từ cây bố với điều kiện cây bố có kiểu gene  $Bb$ .

Do đó  $P(M|\bar{A}) = \frac{1}{2}$ .

Thay vào (\*) ta được:  $P(M) = 0,4 + 0,3 = 0,7$ .

Tương tự tính được  $P(N) = 0,7$ .

Vậy  $P(E) = P(M) \cdot P(N) = 0,7 \cdot 0,7 = 0,49$ .

Từ kết quả trên suy ra trong một quần thể các cây đậu Hà Lan, mà ở đó tỉ lệ cây bố và cây mẹ mang kiểu gene  $bb$ ,  $Bb$  tương ứng là 40% và 60%, thì tỉ lệ cây con có kiểu gene  $bb$  là khoảng 49%.

» **Luyện tập 3.** Với giả thiết như vận dụng trên.

a) Hãy ước lượng tỉ lệ cây con có kiểu gene  $BB$ .

b) Sử dụng kết quả của vận dụng trên và câu a, hãy ước lượng tỉ lệ cây con có kiểu gene  $Bb$ .

#### 2. CÔNG THỨC BAYES

Trong Y học, để chẩn đoán bệnh X nào đó, người ta thường dùng một xét nghiệm. Xét nghiệm dương tính, tức là xét nghiệm đó kết luận một người mắc bệnh X. Xét nghiệm âm tính, tức là xét nghiệm đó kết luận một người không mắc bệnh X. Vì không có một xét nghiệm nào tuyệt đối đúng nên trên thực tế có thể xảy ra hai sai lầm sau:

- Xét nghiệm dương tính nhưng thực tế người xét nghiệm không mắc bệnh. Ta gọi đây là dương tính giả.
- Xét nghiệm âm tính nhưng thực tế người xét nghiệm lại mắc bệnh. Ta gọi đây là âm tính giả.

Ông M đi xét nghiệm bệnh hiểm nghèo X. Biết rằng, nếu một người mắc bệnh X thì với xác suất 0,95 xét nghiệm cho dương tính; nếu một người không bị bệnh X thì với xác suất 0,01 xét nghiệm cho dương tính.

Xét nghiệm của ông M cho kết quả dương tính. Ông M hoảng hốt khi nghĩ rằng mình có xác suất 0,95 mắc bệnh hiểm nghèo X. Mục 2 giúp chúng ta hiểu đúng xác suất đó.

Ảnh: <https://thuocdentoc.vn/>

##### » HØ2. Phân biệt $P(A | B)$ và $P(B | A)$

Trong tình huống mở đầu Mục 2, gọi A là biến cố: “Ông M mắc bệnh hiểm nghèo X”; B là biến cố: “Xét nghiệm cho kết quả dương tính”.

a) Nêu các nội dung còn thiếu tương ứng với “(?)” để hoàn thành các câu sau đây:

- $P(A | B)$  là xác suất để (?) với điều kiện (?);
- $P(B | A)$  là xác suất để (?) với điều kiện (?).

b) 0,95 là  $P(A | B)$  hay  $P(B | A)$ ? Có phải ông M có xác suất 0,95 mắc bệnh hiểm nghèo X không?

Công thức sau đây cho ta tính  $P(A | B)$  khi biết  $P(B | A)$  và  $P(A)$ .

Cho A và B là hai biến cố, với  $P(B) > 0$ .

Khi đó, ta có công thức sau:

$$P(A | B) = \frac{P(A) \cdot P(B | A)}{P(A) \cdot P(B | A) + P(\bar{A}) \cdot P(B | \bar{A})}$$

Công thức trên có tên là **công thức Bayes**.

Công thức Bayes đóng vai trò quan trọng trong Lý thuyết Xác suất.

Thomas Bayes  
(1701 – 1761)

**Chú ý.** Theo công thức xác suất toàn phần, ta có:

$$P(B) = P(A) \cdot P(B | A) + P(\bar{A}) \cdot P(B | \bar{A})$$

Do đó, công thức Bayes còn có thể viết dưới dạng:

$$P(A | B) = \frac{P(A) \cdot P(B | A)}{P(B)}$$

**Ý nghĩa của công thức Bayes:** Một nhà nghiên cứu quan tâm đến xác suất xảy ra của biến cố A. Theo tính toán ban đầu A có xác suất là  $P(A) = p$ . Sau đó, nhà nghiên cứu có được thông tin rằng: “Biến cố B đã xảy ra”. Với thông tin mới này, nhà nghiên cứu sẽ cập nhật lại hiểu biết của mình về khả năng xảy ra biến cố A, bằng cách tính  $P(A | B)$ , xác suất của A khi biết B đã xảy ra. Công thức Bayes cho ta tính  $P(A | B)$ .

» **Ví dụ 2.** Trong một kì thi tốt nghiệp trung học phổ thông, một tỉnh X có 80% học sinh lựa chọn tổ hợp A00 (gồm các môn Toán, Vật lí, Hoá học). Biết rằng, nếu một học sinh chọn tổ hợp A00 thì xác suất để học sinh đó đỗ đại học là 0,6; còn nếu một học sinh không chọn tổ hợp A00 thì xác suất để học sinh đó đỗ đại học là 0,7. Chọn ngẫu nhiên một học sinh của tỉnh X đã tốt nghiệp trung học phổ thông trong kì thi trên. Biết rằng học sinh này đã đỗ đại học. Tính xác suất để học sinh đó chọn tổ hợp A00.

**Giải**

Gọi A là biến cố: “Học sinh đó chọn tổ hợp A00”; B là biến cố: “Học sinh đó đỗ đại học”.

Ta cần tính  $P(A | B)$ . Theo công thức Bayes, ta cần biết:  $P(A)$ ,  $P(\overline{A})$ ,  $P(B | A)$  và  $P(B | \overline{A})$ .

Ta có:  $P(A) = 0,8$ ;  $P(\overline{A}) = 1 - P(A) = 1 - 0,8 = 0,2$ .

$P(B | A)$  là xác suất để một học sinh đỗ đại học với điều kiện học sinh đó chọn tổ hợp A00  $\Rightarrow P(B | A) = 0,6$ .

$P(B | \overline{A})$  là xác suất để một học sinh đỗ đại học với điều kiện học sinh đó không chọn tổ hợp A00  $\Rightarrow P(B | \overline{A}) = 0,7$ .

Thay vào công thức Bayes ta được:

$$P(A | B) = \frac{P(A) \cdot P(B | A)}{P(A) \cdot P(B | A) + P(\overline{A}) \cdot P(B | \overline{A})} = \frac{0,8 \cdot 0,6}{0,8 \cdot 0,6 + 0,2 \cdot 0,7} \approx 0,7742.$$

» **Luyện tập 4.** Trong một kho rượu có 30% là rượu loại I. Chọn ngẫu nhiên một chai rượu đưa cho ông Tùng, một người sành rượu, để nếm thử. Biết rằng, một chai rượu loại I có xác suất 0,9 để ông Tùng xác nhận là loại I; một chai rượu không phải loại I có xác suất 0,95 để ông Tùng xác nhận đây không phải là loại I. Sau khi nếm, ông Tùng xác nhận đây là rượu loại I. Tính xác suất để chai rượu đúng là rượu loại I.

» **Ví dụ 3.** Trở lại tình huống mở đầu Mục 2. Tính xác suất để ông M mắc bệnh hiểm nghèo X nếu kết quả xét nghiệm cho kết quả dương tính.

**Giải**

Gọi A là biến cố: “Ông M mắc bệnh hiểm nghèo X”; B là biến cố: “Xét nghiệm cho kết quả dương tính”.

Ta cần tính  $P(A | B)$ .

Theo công thức Bayes để tính  $P(A | B)$ , ta cần biết:  $P(A)$ ,  $P(\overline{A})$ ,  $P(B | A)$  và  $P(B | \overline{A})$ .

Gọi p là tỉ lệ dân số mắc bệnh hiểm nghèo X.

Khi đó  $P(A) = p$ . Suy ra  $P(\overline{A}) = 1 - p$ .

$P(B | A)$  là xác suất để ông M có xét nghiệm là dương tính nếu ông M mắc bệnh hiểm nghèo X  $\Rightarrow P(B | A) = 0,95$ .

$P(B | \overline{A})$  là xác suất để ông M có xét nghiệm là dương tính nếu ông M không mắc bệnh hiểm nghèo X  $\Rightarrow P(B | \overline{A}) = 0,01$ .

Thay vào công thức Bayes ta có:

$$P(A | B) = \frac{P(A) \cdot P(B | A)}{P(A) \cdot P(B | A) + P(\overline{A}) \cdot P(B | \overline{A})} = \frac{p \cdot 0,95}{p \cdot 0,95 + (1 - p) \cdot 0,01}.$$

» **Luyện tập 5.** Trở lại tình huống mở đầu Mục 2. Thống kê cho thấy tỉ lệ dân số mắc bệnh hiểm nghèo X là 0,2%.

- a) Trước khi tiến hành xét nghiệm, xác suất mắc bệnh hiểm nghèo X của ông M là bao nhiêu?
- b) Sau khi xét nghiệm cho kết quả dương tính, xác suất mắc bệnh hiểm nghèo X của ông M là bao nhiêu?

» **Ví dụ 4.** Một thống kê cho thấy tỉ lệ dân số mắc bệnh hiểm nghèo Y là 0,5%. Bà N đi xét nghiệm bệnh hiểm nghèo Y và nhận được kết quả là âm tính. Biết rằng, nếu mắc bệnh hiểm nghèo Y thì với xác suất 0,94 xét nghiệm là dương tính; nếu không bị bệnh hiểm nghèo Y thì với xác suất 0,97 xét nghiệm là âm tính.

- a) Trước khi tiến hành xét nghiệm xác suất không mắc bệnh hiểm nghèo Y của bà N là bao nhiêu?
- b) Sau khi xét nghiệm cho kết quả âm tính, xác suất không mắc bệnh hiểm nghèo Y của bà N là bao nhiêu?

**Giải**

Gọi A là biến cố: “Bà N bị bệnh hiểm nghèo Y”; B là biến cố: “Xét nghiệm cho kết quả dương tính”.

- a) Trước khi tiến hành xét nghiệm, xác suất không mắc bệnh hiểm nghèo Y của bà N là

$$P(\bar{A}) = 1 - P(A) = 1 - 0,005 = 0,995.$$

- b) Ta cần tính  $P(\bar{A} | \bar{B})$ .

Theo công thức Bayes ta có

$$P(\bar{A} | \bar{B}) = \frac{P(\bar{A}) \cdot P(\bar{B} | \bar{A})}{P(\bar{A}) \cdot P(\bar{B} | \bar{A}) + P(A) \cdot P(\bar{B} | A)}.$$

$P(\bar{B} | \bar{A})$  là xác suất để bà N có xét nghiệm là âm tính nếu bà N không bị bệnh Y.

Theo bài ra ta có:

$$P(\bar{B} | \bar{A}) = 0,97;$$

$P(\bar{B} | A)$  là xác suất để bà N có xét nghiệm là âm tính nếu bà N bị bệnh Y;

$$P(\bar{B} | A) = 1 - 0,94 = 0,06.$$

Thay vào công thức Bayes ta có

$$P(\bar{A} | \bar{B}) = \frac{0,995 \cdot 0,97}{0,995 \cdot 0,97 + 0,005 \cdot 0,06} \approx 0,9997.$$

Như vậy, với xét nghiệm cho kết quả âm tính, xác suất không mắc bệnh Y của bà N tăng lên thành 99,97% (trước xét nghiệm là 99,5%).
