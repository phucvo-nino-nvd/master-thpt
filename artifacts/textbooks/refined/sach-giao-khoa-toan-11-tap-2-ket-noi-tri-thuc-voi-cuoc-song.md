# CHƯƠNG VI. HÀM SỐ MŨ VÀ HÀM SỐ LÔGARIT

## Bài 18. Luỹ thừa với số mũ thực

#### THUẬT NGỮ

- Cơ số
- Căn bậc  $n$
- Luỹ thừa với số mũ nguyên
- Luỹ thừa với số mũ hữu tỉ
- Luỹ thừa với số mũ thực
- Số mũ

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết khái niệm luỹ thừa với số mũ nguyên của một số thực khác 0; luỹ thừa với số mũ hữu tỉ và luỹ thừa với số mũ thực của một số thực dương.
- Giải thích các tính chất của luỹ thừa với số mũ nguyên, luỹ thừa với số mũ hữu tỉ và luỹ thừa với số mũ thực.
- Sử dụng tính chất của phép tính luỹ thừa trong tính toán các biểu thức số và rút gọn các biểu thức chứa biến.
- Tính giá trị biểu thức số có chứa phép tính luỹ thừa bằng cách sử dụng máy tính cầm tay.
- Giải quyết một số vấn đề có liên quan đến môn học khác hoặc thực tiễn gắn với phép tính luỹ thừa.

Ngân hàng thường tính lãi suất cho khách hàng theo thể thức *lãi kép theo định kì*, tức là nếu đến kì hạn người gửi không rút lãi ra thì tiền lãi được tính vào vốn của kì kế tiếp. Nếu một người gửi số tiền  $P$  với lãi suất  $r$  mỗi kì thì sau  $N$  kì, số tiền người đó thu được (cả vốn lẫn lãi) được tính theo công thức *lãi kép* sau:

$$A = P(1+r)^N.$$

Bác Minh gửi tiết kiệm số tiền 100 triệu đồng kì hạn 12 tháng với lãi suất 6% một năm. Giả sử lãi suất không thay đổi. Tính số tiền (cả vốn lẫn lãi) bác Minh thu được sau 3 năm.

### 1. LUỸ THỪA VỚI SỐ MŨ NGUYÊN

##### » **HĐ1.** Nhận biết luỹ thừa với số mũ nguyên

Tính:  $(1,5)^2$ ;  $\left(-\frac{2}{3}\right)^3$ ;  $(\sqrt{2})^4$ .

- Cho  $n$  là một số nguyên dương. Ta định nghĩa:  
Với  $a$  là số thực tuỳ ý:  
$$a^n = \underbrace{a \cdot a \cdots a}_{n \text{ thừa số}}$$
  
Với  $a$  là số thực khác 0:  
$$a^0 = 1; \quad a^{-n} = \frac{1}{a^n}$$
- Trong biểu thức  $a^m$ ,  $a$  gọi là **cơ số**,  $m$  gọi là **số mũ**.

$0^0$  và  $0^{-n}$  ( $n \in \mathbb{N}^*$ ) không có nghĩa.

Luỹ thừa với số mũ nguyên có các tính chất tương tự như luỹ thừa với số mũ nguyên dương.

Với  $a \neq 0, b \neq 0$  và  $m, n$  là các số nguyên, ta có:

|                                                 |                              |
|-------------------------------------------------|------------------------------|
| $a^m \cdot a^n = a^{m+n};$                      | $\frac{a^m}{a^n} = a^{m-n};$ |
| $(a^m)^n = a^{mn};$                             | $(ab)^m = a^m b^m;$          |
| $\left(\frac{a}{b}\right)^m = \frac{a^m}{b^m}.$ |                              |

###### **Chú ý**

- Nếu  $a > 1$  thì  $a^m > a^n$  khi và chỉ khi  $m > n$ .
- Nếu  $0 < a < 1$  thì  $a^m > a^n$  khi và chỉ khi  $m < n$ .

##### » **Ví dụ 1.** Tính giá trị của biểu thức:

$$A = \left(\frac{1}{2}\right)^{-8} \cdot 8^{-2} + (0,2)^{-4} \cdot 25^{-2}.$$

Giải

$$A = 2^8 \cdot \frac{1}{8^2} + \frac{1}{0,2^4} \cdot \frac{1}{25^2} = 2^8 \cdot \frac{1}{2^6} + \frac{1}{0,2^4 \cdot 5^4} = 2^2 + \frac{1}{(0,2 \cdot 5)^4} = 4 + 1 = 5.$$

##### » **Luyện tập 1.** Một số dương $x$ được gọi là viết dưới dạng *kí hiệu khoa học* nếu $x = a \cdot 10^m$ , ở đó $1 \leq a < 10$ và $m$ là một số nguyên. Hãy viết các số liệu sau dưới dạng kí hiệu khoa học:

- a) Khối lượng của Trái Đất khoảng 5 980 000 000 000 000 000 000 000 kg;
- b) Khối lượng của hạt proton khoảng 0,000 000 000 000 000 000 000 000 001 67262 kg.

(Theo SGK Vật lí 12, Nhà Xuất bản Giáo dục Việt Nam, 2020)

### 2. LUYỆN TẬP VỚI SỐ MŨ HỮU TỈ

#### HĐ2. Nhận biết khái niệm căn bậc $n$

- a) Tìm tất cả các số thực  $x$  sao cho  $x^2 = 4$ .  
 b) Tìm tất cả các số thực  $x$  sao cho  $x^3 = -8$ .

Cho số thực  $a$  và số nguyên dương  $n$ . Số  $b$  được gọi là **căn bậc  $n$**  của số  $a$  nếu  $b^n = a$ .

**Nhận xét.** Khi  $n$  là số lẻ, mỗi số thực  $a$  chỉ có một căn bậc  $n$  và kí hiệu là  $\sqrt[n]{a}$ . Căn bậc 1 của số  $a$  chính là  $a$ .

Khi  $n$  là số chẵn, mỗi số thực dương có đúng hai căn bậc  $n$  là hai số đối nhau, giá trị dương kí hiệu là  $\sqrt[n]{a}$  (gọi là **căn số học bậc  $n$**  của  $a$ ), giá trị âm kí hiệu là  $-\sqrt[n]{a}$ .

$$\sqrt[n]{0} = 0 \quad (n \in \mathbb{N}^*).$$

**?** Số âm có căn bậc chẵn không? Vì sao?

**Ví dụ 2.** Tính: a)  $\sqrt[3]{-64}$ ;

b)  $\sqrt[4]{\frac{1}{16}}$ .

**Giải**

a)  $\sqrt[3]{-64} = \sqrt[3]{(-4)^3} = -4$ .

b)  $\sqrt[4]{\frac{1}{16}} = \sqrt[4]{\left(\frac{1}{2}\right)^4} = \frac{1}{2}$ .

**Luyện tập 2.** Tính: a)  $\sqrt[3]{-125}$ ;

b)  $\sqrt[4]{\frac{1}{81}}$ .

##### HĐ3. Nhận biết tính chất của căn bậc $n$

a) Tính và so sánh:  $\sqrt[3]{-8} \cdot \sqrt[3]{27}$  và  $\sqrt[3]{(-8) \cdot 27}$ .

b) Tính và so sánh:  $\frac{\sqrt[3]{-8}}{\sqrt[3]{27}}$  và  $\sqrt[3]{\frac{-8}{27}}$ .

Giả sử  $n, k$  là các số nguyên dương,  $m$  là số nguyên. Khi đó:

$$\sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{ab};$$

$$\frac{\sqrt[n]{a}}{\sqrt[n]{b}} = \sqrt[n]{\frac{a}{b}};$$

$$(\sqrt[n]{a})^m = \sqrt[n]{a^m};$$

$$\sqrt[n]{a^n} = \begin{cases} a & \text{khi } n \text{ lẻ} \\ |a| & \text{khi } n \text{ chẵn;} \end{cases}$$

$$\sqrt[n]{\sqrt[k]{a}} = \sqrt[nk]{a}.$$

(Giả thiết các biểu thức ở trên đều có nghĩa).

» **Ví dụ 3.** Tính: a)  $\sqrt[5]{4} \cdot \sqrt[5]{-8}$ ; b)  $\sqrt[3]{-3\sqrt{3}}$ .

**Giải**

a)  $\sqrt[5]{4} \cdot \sqrt[5]{-8} = \sqrt[5]{4 \cdot (-8)} = \sqrt[5]{-32} = \sqrt[5]{(-2)^5} = -2$ .

b)  $\sqrt[3]{-3\sqrt{3}} = \sqrt[3]{-(\sqrt{3})^3} = \sqrt[3]{(-\sqrt{3})^3} = -\sqrt{3}$ .

» **Luyện tập 3.** Tính: a)  $\sqrt[3]{5} : \sqrt[3]{625}$ ; b)  $\sqrt[5]{-25\sqrt{5}}$ .

» **HĐ4. Nhận biết luỹ thừa với số mũ hữu tỉ**

Cho  $a$  là một số thực dương.

a) Với  $n$  là số nguyên dương, hãy thử định nghĩa  $a^{\frac{1}{n}}$  sao cho  $(a^{\frac{1}{n}})^n = a$ .

b) Từ kết quả của câu a, hãy thử định nghĩa  $a^{\frac{m}{n}}$ , với  $m$  là số nguyên và  $n$  là số nguyên dương, sao cho  $a^{\frac{m}{n}} = (a^{\frac{1}{n}})^m$ .

Lưu ý:  $(\sqrt[n]{a})^n = a$ .

Cho số thực  $a$  dương và số hữu tỉ  $r = \frac{m}{n}$ , trong đó  $m$  là một số nguyên và  $n$  là số nguyên dương. Luỹ thừa của  $a$  với số mũ  $r$ , kí hiệu là  $a^r$ , xác định bởi  $a^r = a^{\frac{m}{n}} = \sqrt[n]{a^m}$ .

❓ Vì sao trong định nghĩa luỹ thừa với số mũ hữu tỉ lại cần điều kiện cơ số  $a > 0$ ?

**Chú ý.** Luỹ thừa với số mũ hữu tỉ (của một số thực dương) có đầy đủ các tính chất như luỹ thừa với số mũ nguyên đã nêu trong Mục 1.

» **Ví dụ 4.** Tính: a)  $16^{\frac{3}{2}}$ ; b)  $8^{-\frac{2}{3}}$ .

**Giải**

a)  $16^{\frac{3}{2}} = \sqrt{16^3} = \sqrt{(4^2)^3} = \sqrt{(4^3)^2} = 4^3 = 64$ .

b)  $8^{-\frac{2}{3}} = \sqrt[3]{8^{-2}} = \sqrt[3]{(2^3)^{-2}} = \sqrt[3]{(2^{-2})^3} = 2^{-2} = \frac{1}{4}$ .

» **Luyện tập 4.** Rút gọn biểu thức:  $A = \frac{x^{\frac{3}{2}}y + xy^{\frac{3}{2}}}{\sqrt{x} + \sqrt{y}}$  ( $x, y > 0$ ).

### 3. LUỸ THỪA VỚI SỐ MŨ THỰC

#### a) Khái niệm luỹ thừa với số mũ thực

» **HĐ5. Nhận biết luỹ thừa với số mũ thực**

Ta biết rằng  $\sqrt{2}$  là một số vô tỉ và  $\sqrt{2} = 1,4142135624\dots$

Gọi  $(r_n)$  là dãy số hữu tỉ dùng để xấp xỉ số  $\sqrt{2}$ , với  $r_1 = 1$ ;  $r_2 = 1,4$ ;  $r_3 = 1,41$ ;  $r_4 = 1,4142$ ;...

$\lim_{n \rightarrow +\infty} r_n = \sqrt{2}$ .

a) Dùng máy tính cầm tay, hãy tính:  $3^{\sqrt{1}}$ ;  $3^{\sqrt{2}}$ ;  $3^{\sqrt{3}}$ ;  $3^{\sqrt{4}}$  và  $3^{\sqrt{5}}$ .

b) Có nhận xét gì về sai số tuyệt đối giữa  $3^{\sqrt{2}}$  và  $3^{\sqrt{3}}$ , tức là  $|3^{\sqrt{2}} - 3^{\sqrt{3}}|$ , khi  $n$  càng lớn?

Cho  $a$  là số thực dương và  $\alpha$  là một số vô tỉ. Xét dãy số hữu tỉ  $(r_n)$  mà  $\lim_{n \rightarrow +\infty} r_n = \alpha$ . Khi đó, dãy số  $(a^{r_n})$  có giới hạn xác định và không phụ thuộc vào dãy số hữu tỉ  $(r_n)$  đã chọn. Giới hạn đó gọi là **luỹ thừa của  $a$  với số mũ  $\alpha$** , kí hiệu là  $a^\alpha$ .

$$a^\alpha = \lim_{n \rightarrow +\infty} a^{r_n}.$$

**Chú ý.** Luỹ thừa với số mũ thực (của một số dương) có đầy đủ các tính chất như luỹ thừa với số mũ nguyên đã nêu trong Mục 1.

» **Ví dụ 5.** Rút gọn biểu thức:  $A = \frac{a^{\sqrt{5}-1} \cdot a^{3-\sqrt{5}}}{(a^{\sqrt{3}+1})^{\sqrt{3}-1}} \quad (a > 0).$

Giải

$$A = \frac{a^{\sqrt{5}-1} \cdot a^{3-\sqrt{5}}}{(a^{\sqrt{3}+1})^{\sqrt{3}-1}} = \frac{a^{\sqrt{5}-1+3-\sqrt{5}}}{a^{(\sqrt{3}+1)(\sqrt{3}-1)}} = \frac{a^2}{a^{3-1}} = \frac{a^2}{a^2} = 1.$$

» **Ví dụ 6.** Không sử dụng máy tính, hãy so sánh các số  $8^{\sqrt{3}}$  và  $4^{2\sqrt{3}}$ .

Giải

Ta có:  $8^{\sqrt{3}} = (2^3)^{\sqrt{3}} = 2^{3\sqrt{3}}$  và  $4^{2\sqrt{3}} = (2^2)^{2\sqrt{3}} = 2^{4\sqrt{3}}$ .

Vì  $3\sqrt{3} < 4\sqrt{3}$  và  $2 > 1$  nên  $2^{3\sqrt{3}} < 2^{4\sqrt{3}}$ . Vậy  $8^{\sqrt{3}} < 4^{2\sqrt{3}}$ .

Ta đưa về so sánh hai luỹ thừa cùng cơ số.

» **Luyện tập 5.** Rút gọn biểu thức:  $A = \frac{(a^{\sqrt{2}-1})^{1+\sqrt{2}}}{a^{\sqrt{5}-1} \cdot a^{3-\sqrt{5}}} \quad (a > 0).$

» **Vận dụng.** Giải bài toán trong tình huống mở đầu.

#### b) Tính luỹ thừa với số mũ thực bằng máy tính cầm tay

Có thể sử dụng máy tính cầm tay để tính căn bậc  $n$  và luỹ thừa với số mũ thực.

| Tính<br>(làm tròn kết quả<br>đến chữ số thập phân<br>thứ tư) | Bấm phím | Màn hình hiện | Kết quả                        |
|--------------------------------------------------------------|----------|---------------|--------------------------------|
| $\sqrt{20,15}$                                               |          | 4.488875137   | $\sqrt{20,15} \approx 4,4889$  |
| $\sqrt[5]{320}$                                              |          | 3.169786385   | $\sqrt[5]{320} \approx 3,1698$ |
| $15^{3,2}$                                                   |          | 5800.855256   | $15^{3,2} \approx 5\,800,8553$ |

## Bài 19. Lôgarit

#### **THUẬT NGỮ**

- Lôgarit
- Lôgarit thập phân
- Lôgarit tự nhiên
- Cơ số của lôgarit
- Số  $e$

#### **KIẾN THỨC, KĨ NĂNG**

- Nhận biết khái niệm lôgarit cơ số  $a$  của một số thực dương.
- Giải thích các tính chất của phép tính lôgarit nhờ sử dụng định nghĩa hoặc các tính chất đã biết trước đó.
- Sử dụng tính chất của phép tính lôgarit trong tính toán các biểu thức số và rút gọn các biểu thức chứa biến.
- Tính giá trị (đúng hoặc gần đúng) của lôgarit bằng cách sử dụng máy tính cầm tay.
- Giải quyết một số vấn đề có liên quan đến môn học khác hoặc thực tiễn gắn với phép tính lôgarit.

Bác An gửi tiết kiệm ngân hàng 100 triệu đồng kì hạn 12 tháng, với lãi suất không đổi là 6% một năm. Khi đó sau  $n$  năm gửi thì tổng số tiền bác An thu được (cả vốn lẫn lãi) cho bởi công thức sau:

$$A = 100 \cdot (1 + 0,06)^n \text{ (triệu đồng).}$$

Hỏi sau ít nhất bao nhiêu năm, tổng số tiền bác An thu được là không dưới 150 triệu đồng?

### **1. KHÁI NIỆM LÔGARIT**

##### **HĐ1. Nhận biết khái niệm lôgarit**

Tìm  $x$ , biết: a)  $2^x = 8$ ; b)  $2^x = \frac{1}{4}$ ; c)  $2^x = \sqrt{2}$ .

Cho  $a$  là một số thực dương khác 1 và  $M$  là một số thực dương. Số thực  $\alpha$  để  $a^\alpha = M$  được gọi là **lôgarit cơ số  $a$  của  $M$**  và kí hiệu là  $\log_a M$ .

$$\alpha = \log_a M \Leftrightarrow a^\alpha = M.$$

**Chú ý.** Không có lôgarit của số âm và số 0. Cơ số của lôgarit phải dương và khác 1.

Từ định nghĩa lôgarit, ta có các tính chất sau:

Với  $0 < a \neq 1$ ,  $M > 0$  và  $\alpha$  là số thực tuỳ ý, ta có:

$$\log_a 1 = 0; \log_a a = 1;$$

$$a^{\log_a M} = M; \log_a a^\alpha = \alpha.$$

**Ví dụ 1.** Tính: a)  $\log_2 \frac{1}{8}$ ;

b)  $\log_{\sqrt{3}} 9$ .

Giải

a)  $\log_2 \frac{1}{8} = \log_2 2^{-3} = -3$ .

b)  $\log_{\sqrt{3}} 9 = \log_{\sqrt{3}} (\sqrt{3})^4 = 4$ .

» **Luyện tập 1.** Tính: a)  $\log_3 3\sqrt{3}$ ;

b)  $\log_{\frac{1}{2}} 32$ .

#### 2. TÍNH CHẤT CỦA LÔGARIT

#### a) Quy tắc tính lôgarit

» **HĐ2.** Nhận biết quy tắc tính lôgarit

Cho  $M = 2^5$ ,  $N = 2^3$ . Tính và so sánh:

a)  $\log_2 (MN)$  và  $\log_2 M + \log_2 N$ ;

b)  $\log_2 \left( \frac{M}{N} \right)$  và  $\log_2 M - \log_2 N$ .

Giả sử  $a$  là số thực dương khác 1,  $M$  và  $N$  là các số thực dương,  $\alpha$  là số thực tùy ý. Khi đó:

$$\log_a (MN) = \log_a M + \log_a N;$$

$$\log_a \left( \frac{M}{N} \right) = \log_a M - \log_a N;$$

$$\log_a M^\alpha = \alpha \log_a M.$$

» **Ví dụ 2.** Tính giá trị của các biểu thức sau:

a)  $\log_4 2 + \log_4 32$ ;

b)  $\log_2 80 - \log_2 5$ .

**Giải**

a)  $\log_4 2 + \log_4 32 = \log_4 (2 \cdot 32) = \log_4 64 = \log_4 4^3 = 3\log_4 4 = 3$ .

b)  $\log_2 80 - \log_2 5 = \log_2 \frac{80}{5} = \log_2 16 = \log_2 2^4 = 4\log_2 2 = 4$ .

» **Luyện tập 2.** Rút gọn biểu thức:

$$A = \log_2 (x^3 - x) - \log_2 (x + 1) - \log_2 (x - 1) \quad (x > 1).$$

#### b) Đổi cơ số của lôgarit

Trong nhiều vấn đề lí thuyết và ứng dụng, chúng ta cần đổi từ lôgarit theo một cơ số này sang lôgarit theo một cơ số khác.

» **HĐ3.** Xây dựng công thức đổi cơ số của lôgarit

Giả sử đã cho  $\log_a M$  và ta muốn tính  $\log_b M$ . Để tìm mối liên hệ giữa  $\log_a M$  và  $\log_b M$ , hãy thực hiện các yêu cầu sau:

a) Đặt  $y = \log_a M$ , tính  $M$  theo  $y$ ;

b) Lấy lôgarit theo cơ số  $b$  cả hai vế của kết quả nhận được trong câu a, từ đó suy ra công thức mới để tính  $y$ .

Với các cơ số lôgarit  $a$  và  $b$  bất kì ( $0 < a \neq 1$ ,  $0 < b \neq 1$ ) và  $M$  là số thực dương tuỳ ý, ta luôn có:

$$\log_a M = \frac{\log_b M}{\log_b a}.$$

» **Ví dụ 3.** Không dùng máy tính cầm tay, hãy tính  $\log_4 8$ .

**Giải**

Ta có:  $\log_4 8 = \frac{\log_2 8}{\log_2 4} = \frac{\log_2 2^3}{\log_2 2^2} = \frac{3}{2}.$

» **Ví dụ 4.** Chứng minh rằng:

a) Nếu  $a$  và  $b$  là hai số dương khác 1 thì  $\log_a b = \frac{1}{\log_b a};$

b) Nếu  $a$  là số dương khác 1,  $M$  là số dương và  $\alpha \neq 0$ , thì  $\log_{a^\alpha} M = \frac{1}{\alpha} \log_a M.$

**Giải**

a) Theo công thức đổi cơ số, ta có:  $\log_a b = \frac{\log_b b}{\log_b a} = \frac{1}{\log_b a}.$

b) Theo công thức đổi cơ số, ta có:  $\log_{a^\alpha} M = \frac{\log_a M}{\log_{a^\alpha} a} = \frac{1}{\alpha} \log_a M.$

» **Luyện tập 3.** Không dùng máy tính cầm tay, hãy tính  $\log_9 \frac{1}{27}.$

### 3. LÔGARIT THẬP PHÂN VÀ LÔGARIT TỰ NHIÊN

#### a) Lôgarit thập phân

Trong thực hành, ta hay dùng hệ đếm thập phân (hệ đếm cơ số 10); lôgarit cơ số 10 đóng vai trò quan trọng trong tính toán.

Lôgarit cơ số 10 của một số dương  $M$  gọi là **lôgarit thập phân** của  $M$ , kí hiệu là  $\log M$  hoặc  $\lg M$  (đọc là lôc của  $M$ ).

» **Ví dụ 5.** Độ pH của một dung dịch hoá học được tính theo công thức:

$$pH = -\log [H^+],$$

trong đó  $[H^+]$  là nồng độ (tính theo mol/lit) của các ion hydrogen. Giá trị pH nằm trong khoảng từ 0 đến 14. Nếu  $pH < 7$  thì dung dịch có tính acid, nếu  $pH > 7$  thì dung dịch có tính base, còn nếu  $pH = 7$  thì dung dịch là trung tính.

a) Tính độ pH của dung dịch có nồng độ ion hydrogen bằng 0,01 mol/lit.

b) Xác định nồng độ ion hydrogen của một dung dịch có độ pH = 7,4.

**Giải**

a) Khi  $[H^+] = 0,01$ , ta có:  $pH = -\log 0,01 = -\log 10^{-2} = 2.$

b) Nồng độ ion hydrogen trong dung dịch đó là  $[H^+] = 10^{-7,4}.$

#### b) Số e và lôgarit tự nhiên

##### Bài toán lãi kép liên tục và số e

Ta đã biết: Nếu đem gửi ngân hàng một số vốn ban đầu là  $P$  theo thể thức lãi kép với lãi suất hằng năm không đổi là  $r$  và chia mỗi năm thành  $m$  kì tính lãi thì sau  $t$  năm (tức là sau  $tm$  kì) số tiền thu được (cả vốn lẫn lãi) là

$$A_m = P \left( 1 + \frac{r}{m} \right)^{tm}.$$

Nếu kì tính lãi được chia càng ngày càng nhỏ, tức là tính lãi hằng ngày, hằng giờ, hằng phút, hằng giây,... thì dẫn đến việc tính giới hạn của dãy số  $A_m$  khi  $m \rightarrow +\infty$ . Ta có:

$$A_m = P \left( 1 + \frac{r}{m} \right)^{tm} = P \left[ \left( 1 + \frac{1}{\frac{m}{r}} \right)^{\frac{m}{r}} \right]^{tr}.$$

Để tính giới hạn  $\lim_{m \rightarrow +\infty} A_m$ , ta cần xét giới hạn  $\lim_{m \rightarrow +\infty} \left( 1 + \frac{1}{\frac{m}{r}} \right)^{\frac{m}{r}}$ .

Một cách tổng quát, ta xét giới hạn  $\lim_{x \rightarrow +\infty} \left( 1 + \frac{1}{x} \right)^x$ .

Người ta chứng minh được giới hạn trên tồn tại, nó là một số vô tỉ có giá trị bằng 2,718281828... và kí hiệu là  $e$ . Vậy

$$e = \lim_{x \rightarrow +\infty} \left( 1 + \frac{1}{x} \right)^x \approx 2,7183.$$

Từ các kết quả trên suy ra  $\lim_{m \rightarrow +\infty} A_m = Pe^{tr}$ .

Thể thức tính lãi khi  $m \rightarrow +\infty$  theo cách trên gọi là thể thức **lãi kép liên tục**.

Như vậy, với số vốn ban đầu là  $P$ , theo thể thức lãi kép liên tục, lãi suất hằng năm không đổi là  $r$  thì sau  $t$  năm, số tiền thu được cả vốn lẫn lãi sẽ là

$$A = Pe^{tr}.$$

Công thức trên gọi là **công thức lãi kép liên tục**.

##### Lôgarit tự nhiên

Ta có định nghĩa sau:

Lôgarit cơ số  $e$  của một số dương  $M$  gọi là **lôgarit tự nhiên** của  $M$ , kí hiệu là  $\ln M$  (đọc là lôgarit Nêpe của  $M$ ).

» **Ví dụ 6.** Biết thời gian cần thiết (tính theo năm) để tăng gấp đôi số tiền đầu tư theo thể thức lãi kép liên tục với lãi suất không đổi  $r$  mỗi năm được cho bởi công thức sau:

$$t = \frac{\ln 2}{r}.$$

Tính thời gian cần thiết để tăng gấp đôi một khoản đầu tư khi lãi suất là 6% mỗi năm (làm tròn kết quả đến chữ số thập phân thứ nhất).

###### Giải

Ta có:  $r = 6\% = 0,06$ . Do đó thời gian cần thiết để tăng gấp đôi khoản đầu tư là

$$t = \frac{\ln 2}{r} = \frac{\ln 2}{0,06} \approx 11,6 \text{ (năm)}.$$

#### c) Tính lôgarit bằng máy tính cầm tay

Có thể dùng máy tính cầm tay để tính lôgarit của một số dương.

| Tính<br>(làm tròn kết quả đến<br>chữ số thập phân thứ tư) | Bấm phím | Màn hình hiện | Kết quả                       |
|-----------------------------------------------------------|----------|---------------|-------------------------------|
| $\log 6,52$                                               |          | 0.8142475957  | $\log 6,52 \approx 0,8142$    |
| $\ln 6,52$                                                |          | 1.874874376   | $\ln 6,52 \approx 1,8749$     |
| $\log_{14} 17$                                            |          | 1.073570215   | $\log_{14} 17 \approx 1,0736$ |

##### » Ví dụ 7. Giải bài toán trong tình huống mở đầu.

###### Giải

Ta có:  $A = 100 \cdot (1 + 0,06)^n = 100 \cdot 1,06^n$ .

Với  $A = 150$ , ta có:  $100 \cdot 1,06^n = 150$  hay  $1,06^n = 1,5$ , tức là  $n = \log_{1,06} 1,5 \approx 6,96$ .

Vì gửi tiết kiệm kì hạn 12 tháng (tức là 1 năm) nên  $n$  phải là số nguyên. Do đó ta chọn  $n = 7$ .

Vậy sau ít nhất 7 năm thì bác An nhận được số tiền ít nhất là 150 triệu đồng.

##### » Vận dụng. Cô Hương gửi tiết kiệm 100 triệu đồng với lãi suất 6% một năm.

a) Tính số tiền cô Hương thu được (cả vốn lẫn lãi) sau 1 năm,

nếu lãi suất được tính theo một trong các thể thức sau:

- Lãi kép kì hạn 12 tháng;
- Lãi kép kì hạn 1 tháng;
- Lãi kép liên tục.

b) Tính thời gian cần thiết để cô Hương thu được số tiền (cả vốn lẫn lãi) là 150 triệu đồng nếu gửi theo thể thức lãi kép liên tục (làm tròn kết quả đến chữ số thập phân thứ nhất).

– Công thức lãi kép tính số tiền thu được sau  $N$  kì gửi là  $A = 100 \cdot \left(1 + \frac{0,06}{n}\right)^N$ , trong đó  $n$  là số kì tính lãi trong 1 năm.

– Công thức lãi kép liên tục tính số tiền thu được sau  $t$  năm gửi là  $A = 100 \cdot e^{0,06t}$ .

## Bài 20. Hàm số mũ và hàm số lôgarit

#### THUẬT NGỮ

- Hàm số mũ
- Hàm số lôgarit

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết hàm số mũ và hàm số lôgarit. Nêu một số ví dụ thực tế về hàm số mũ, hàm số lôgarit.
- Nhận dạng đồ thị của các hàm số mũ, hàm số lôgarit.
- Giải thích các tính chất của hàm số mũ, hàm số lôgarit thông qua đồ thị của chúng.
- Giải quyết một số vấn đề có liên quan đến môn học khác hoặc thực tiễn gắn với hàm số mũ và hàm số lôgarit.

Sự tăng trưởng dân số được ước tính theo công thức tăng trưởng mũ sau:

$$A = Pe^{rt}$$

trong đó  $P$  là dân số của năm lấy làm mốc,  $A$  là dân số sau  $t$  năm,  $r$  là tỉ lệ tăng dân số hằng năm. Biết rằng vào năm 2020, dân số Việt Nam là khoảng 97,34 triệu người và tỉ lệ tăng dân số là 0,91% (theo *danso.org*). Nếu tỉ lệ tăng dân số này giữ nguyên, hãy ước tính dân số Việt Nam vào năm 2050.

### 1. HÀM SỐ MŨ

##### HO1. Nhận biết hàm số mũ

- a) Tính  $y = 2^x$  khi  $x$  lần lượt nhận các giá trị  $-1$ ;  $0$ ;  $1$ . Với mỗi giá trị của  $x$  có bao nhiêu giá trị của  $y = 2^x$  tương ứng?
- b) Với những giá trị nào của  $x$ , biểu thức  $y = 2^x$  có nghĩa?

Cho  $a$  là số thực dương khác 1.

Hàm số  $y = a^x$  được gọi là **hàm số mũ cơ số  $a$** .

**?** Trong các hàm số sau, những hàm số nào là hàm số mũ? Khi đó hãy chỉ ra cơ số.

- a)  $y = (\sqrt{2})^x$ ;      b)  $y = 2^{-x}$ ;      c)  $y = 8^{\frac{x}{3}}$ ;      d)  $y = x^{-2}$ .

##### HO2. Nhận dạng đồ thị và tính chất của hàm số mũ

Cho hàm số mũ  $y = 2^x$ .

- a) Hoàn thành bảng giá trị sau:

|           |    |    |    |   |   |   |   |
|-----------|----|----|----|---|---|---|---|
| $x$       | -3 | -2 | -1 | 0 | 1 | 2 | 3 |
| $y = 2^x$ | ?  | ?  | ?  | ? | ? | ? | ? |

b) Trong mặt phẳng toạ độ  $Oxy$ , biểu diễn các điểm  $(x; y)$  trong bảng giá trị ở câu a. Bằng cách làm tương tự, lấy nhiều điểm  $(x; 2^x)$  với  $x \in \mathbb{R}$  và nối lại ta được đồ thị của hàm số  $y = 2^x$ .

c) Từ đồ thị đã vẽ ở câu b, hãy kết luận về tập giá trị và tính chất biến thiên của hàm số  $y = 2^x$ .

Hàm số mũ  $y = a^x$ :

- Có tập xác định là  $\mathbb{R}$  và tập giá trị là  $(0; +\infty)$ ;
- Đồng biến trên  $\mathbb{R}$  khi  $a > 1$  và nghịch biến trên  $\mathbb{R}$  khi  $0 < a < 1$ ;
- Liên tục trên  $\mathbb{R}$ ;
- Có đồ thị đi qua các điểm  $(0; 1)$ ,  $(1; a)$  và luôn nằm phía trên trục hoành.

Hình 6.1. Dạng đồ thị của hàm số  $y = a^x$

» **Ví dụ 1.** Vẽ đồ thị hàm số  $y = \left(\frac{1}{2}\right)^x$ .

**Giải**

Lập bảng giá trị của hàm số tại một số điểm như sau:

|                                  |    |    |    |   |               |               |               |
|----------------------------------|----|----|----|---|---------------|---------------|---------------|
| $x$                              | -3 | -2 | -1 | 0 | 1             | 2             | 3             |
| $y = \left(\frac{1}{2}\right)^x$ | 8  | 4  | 2  | 1 | $\frac{1}{2}$ | $\frac{1}{4}$ | $\frac{1}{8}$ |

Hàm số  $y = \left(\frac{1}{2}\right)^x$  còn được viết dưới dạng  $y = 2^{-x}$ .

Từ đó, ta vẽ được đồ thị của hàm số  $y = \left(\frac{1}{2}\right)^x$  như Hình 6.2.

Hình 6.2

» **Luyện tập.** Vẽ đồ thị của hàm số  $y = \left(\frac{3}{2}\right)^x$ .

### 2. HÀM SỐ LÔGARIT

##### » H03. Nhận biết hàm số lôgarit

- a) Tính  $y = \log_2 x$  khi  $x$  lần lượt nhận các giá trị 1; 2; 4. Với mỗi giá trị của  $x > 0$  có bao nhiêu giá trị của  $y = \log_2 x$  tương ứng?
- b) Với những giá trị nào của  $x$ , biểu thức  $y = \log_2 x$  có nghĩa?

Cho  $a$  là số thực dương khác 1.

Hàm số  $y = \log_a x$  được gọi là **hàm số lôgarit cơ số  $a$** .

**?** Trong các hàm số sau, những hàm số nào là hàm số lôgarit? Khi đó hãy chỉ ra cơ số.

- a)  $y = \log_{\sqrt{3}} x$ ;      b)  $y = \log_{2^{-1}} x$ ;      c)  $y = \log_x 2$ ;      d)  $y = \log_{\frac{1}{x}} 5$ .

##### » H04. Nhận dạng đồ thị và tính chất của hàm số lôgarit

Cho hàm số lôgarit  $y = \log_2 x$ .

- a) Hoàn thành bảng giá trị sau:

|                |          |          |          |   |   |       |       |
|----------------|----------|----------|----------|---|---|-------|-------|
| $x$            | $2^{-3}$ | $2^{-2}$ | $2^{-1}$ | 1 | 2 | $2^2$ | $2^3$ |
| $y = \log_2 x$ | ?        | ?        | ?        | ? | ? | ?     | ?     |

- b) Trong mặt phẳng toạ độ  $Oxy$ , biểu diễn các điểm  $(x; y)$  trong bảng giá trị ở câu a. Bằng cách làm tương tự, lấy nhiều điểm  $(x; \log_2 x)$  và nối lại ta được đồ thị của hàm số  $y = \log_2 x$ .
- c) Từ đồ thị đã vẽ ở câu b, hãy kết luận về tập giá trị và tính chất biến thiên của hàm số  $y = \log_2 x$ .

Hàm số lôgarit  $y = \log_a x$ :

- Có tập xác định là  $(0; +\infty)$  và tập giá trị là  $\mathbb{R}$ ;
- Đồng biến trên  $(0; +\infty)$  khi  $a > 1$  và nghịch biến trên  $(0; +\infty)$  khi  $0 < a < 1$ ;
- Liên tục trên  $(0; +\infty)$ ;
- Có đồ thị đi qua các điểm  $(1; 0)$ ,  $(a; 1)$  và luôn nằm bên phải trục tung.

Hình 6.3. Dạng đồ thị của hàm số  $y = \log_a x$

» **Ví dụ 2.** Vẽ đồ thị của hàm số  $y = \log_{\frac{1}{2}} x$ .

**Giải**

Lập bảng giá trị của hàm số tại một số điểm như sau:

|                            |                                     |                                     |                                     |   |               |                                            |                                            |
|----------------------------|-------------------------------------|-------------------------------------|-------------------------------------|---|---------------|--------------------------------------------|--------------------------------------------|
| $x$                        | $\left(\frac{1}{2}\right)^{-3} = 8$ | $\left(\frac{1}{2}\right)^{-2} = 4$ | $\left(\frac{1}{2}\right)^{-1} = 2$ | 1 | $\frac{1}{2}$ | $\left(\frac{1}{2}\right)^2 = \frac{1}{4}$ | $\left(\frac{1}{2}\right)^3 = \frac{1}{8}$ |
| $y = \log_{\frac{1}{2}} x$ | -3                                  | -2                                  | -1                                  | 0 | 1             | 2                                          | 3                                          |

Từ đó, ta vẽ được đồ thị của hàm số  $y = \log_{\frac{1}{2}} x$  như Hình 6.4.

Hình 6.4

» **Vận dụng.** Giải bài toán trong tình huống mở đầu (kết quả tính theo đơn vị triệu người và làm tròn đến chữ số thập phân thứ hai).

## Bài 21. Phương trình, bất phương trình mũ và lôgarit

#### **THUẬT NGỮ**

- Phương trình mũ
- Phương trình lôgarit
- Bất phương trình mũ
- Bất phương trình lôgarit

#### **KIẾN THỨC, KĨ NĂNG**

- Giải phương trình, bất phương trình mũ và lôgarit ở dạng đơn giản.
- Giải quyết một số vấn đề liên môn hoặc có liên quan đến thực tiễn gắn với phương trình, bất phương trình mũ và lôgarit.

Giả sử giá trị còn lại (tính theo triệu đồng) của một chiếc xe ô tô sau  $t$  năm sử dụng được mô hình hoá bằng công thức:

$$V(t) = 780 \cdot (0,905)^t.$$

Hỏi nếu theo mô hình này, sau bao nhiêu năm sử dụng thì giá trị của chiếc xe đó còn lại không quá 300 triệu đồng? (Làm tròn kết quả đến hàng đơn vị).

### **1. PHƯƠNG TRÌNH MŨ**

##### **HĐ1. Nhận biết nghiệm của phương trình mũ**

Xét phương trình:  $2^{x+1} = \frac{1}{4}$ .

- a) Khi viết  $\frac{1}{4}$  thành luỹ thừa của 2 thì phương trình trên trở thành phương trình nào?  
 b) So sánh số mũ của 2 ở hai vế của phương trình nhận được ở câu a để tìm  $x$ .

**Phương trình mũ cơ bản** có dạng  $a^x = b$  (với  $0 < a \neq 1$ ).

- Nếu  $b > 0$  thì phương trình có nghiệm duy nhất  $x = \log_a b$ .
- Nếu  $b \leq 0$  thì phương trình vô nghiệm.

Minh hoạ bằng đồ thị:

Hình 6.5

**Chú ý.** Phương pháp giải phương trình mũ bằng cách đưa về cùng cơ số:

Nếu  $0 < a \neq 1$  thì  $a^u = a^v \Leftrightarrow u = v$ .

» **Ví dụ 1.** Giải phương trình:  $3^{x+1} = \frac{1}{3^{1-2x}}$ .

**Giải**

Đưa về phải về cơ số 3, ta có  $\frac{1}{3^{1-2x}} = 3^{2x-1}$ .

Từ đó phương trình trở thành  $3^{x+1} = 3^{2x-1} \Leftrightarrow x+1 = 2x-1 \Leftrightarrow x=2$ .

Vậy phương trình đã cho có nghiệm duy nhất  $x=2$ .

» **Ví dụ 2.** Giải phương trình:  $10^{x-1} = 2022$ .

**Giải**

Lấy lôgarit thập phân hai về của phương trình ta được  $x-1 = \log 2022$  hay  $x = 1 + \log 2022$ .

Vậy phương trình đã cho có nghiệm duy nhất  $x = 1 + \log 2022$ .

» **Luyện tập 1.** Giải các phương trình sau:

a)  $2^{3x-1} = \frac{1}{2^{x+1}}$ ;      b)  $2e^{2x} = 5$ .

#### 2. PHƯƠNG TRÌNH LÔGARIT

» **HĐ2.** Nhận biết nghiệm của phương trình lôgarit

Xét phương trình:  $2\log_2 x = -3$ .

a) Từ phương trình trên, hãy tính  $\log_2 x$ .

b) Từ kết quả ở câu a và sử dụng định nghĩa lôgarit, hãy tìm  $x$ .

**Phương trình lôgarit** cơ bản có dạng  $\log_a x = b$  ( $0 < a \neq 1$ ).

Phương trình lôgarit cơ bản  $\log_a x = b$  có nghiệm duy nhất  $x = a^b$ .

Minh hoạ bằng đồ thị:

Hình 6.6

**Chú ý.** Phương pháp giải phương trình lôgarit bằng cách đưa về cùng cơ số:

Nếu  $u, v > 0$  và  $0 < a \neq 1$  thì  $\log_a u = \log_a v \Leftrightarrow u = v$ .

» **Ví dụ 3.** Giải phương trình:  $4 + 3\log(2x) = 16$ .

**Giải**

Điều kiện:  $2x > 0$  hay  $x > 0$ .

Phương trình trở thành  $\log(2x) = 4$ . Từ đó  $2x = 10^4$  hay  $x = 5\,000$  (thoả mãn điều kiện).

Vậy phương trình đã cho có nghiệm là  $x = 5\,000$ .

» **Ví dụ 4.** Giải phương trình:  $\log_3(x+1) = \log_3(x^2-1)$ .

**Giải**

Điều kiện:  $x+1 > 0$  và  $x^2-1 > 0$ , tức là  $x > 1$ .

Phương trình trở thành  $x+1 = x^2-1$  hay  $x^2-x-2=0$ .

Từ đó tìm được  $x = -1$  và  $x = 2$ , nhưng chỉ có nghiệm  $x = 2$  thoả mãn điều kiện.

Vậy phương trình đã cho có nghiệm duy nhất  $x = 2$ .

» **Luyện tập 2.** Giải các phương trình sau:

a)  $4 - \log(3-x) = 3$ ;

b)  $\log_2(x+2) + \log_2(x-1) = 1$ .

#### 3. BẮT PHƯƠNG TRÌNH MŨ

» **HĐ3.** Nhận biết nghiệm của bắt phương trình mũ

Cho đồ thị của các hàm số  $y = 2^x$  và  $y = 4$  như Hình 6.7. Tìm khoảng giá trị của  $x$  mà đồ thị hàm số  $y = 2^x$  nằm phía trên đường thẳng  $y = 4$  và từ đó suy ra tập nghiệm của bắt phương trình  $2^x > 4$ .

Hình 6.7

- **Bắt phương trình mũ cơ bản** có dạng  $a^x > b$  (hoặc  $a^x \geq b$ ,  $a^x < b$ ,  $a^x \leq b$ ) với  $a > 0$ ,  $a \neq 1$ .
- Xét bắt phương trình dạng  $a^x > b$ :
  - Nếu  $b \leq 0$  thì tập nghiệm của bắt phương trình là  $\mathbb{R}$ .
  - Nếu  $b > 0$  thì bắt phương trình tương đương với  $a^x > a^{\log_a b}$ .  
Với  $a > 1$ , nghiệm của bắt phương trình là  $x > \log_a b$ .  
Với  $0 < a < 1$ , nghiệm của bắt phương trình là  $x < \log_a b$ .

**Chú ý**

a) Các bắt phương trình mũ cơ bản còn lại được giải tương tự.

b) Nếu  $a > 1$  thì  $a^u > a^v \Leftrightarrow u > v$ .

Nếu  $0 < a < 1$  thì  $a^u > a^v \Leftrightarrow u < v$ .

» **Ví dụ 5.** Giải bất phương trình:  $16^x > \frac{1}{8}$ .

**Giải**

$$\text{Ta có: } 16^x > \frac{1}{8} \Leftrightarrow 2^{4x} > 2^{-3} \Leftrightarrow 4x > -3 \Leftrightarrow x > -\frac{3}{4}.$$

» **Ví dụ 6.** Giải bài toán trong tình huống mở đầu.

**Giải**

Ta cần tìm  $t$  sao cho

$$V(t) \leq 300 \Leftrightarrow 780 \cdot (0,905)^t \leq 300 \Leftrightarrow (0,905)^t \leq \frac{5}{13} \Leftrightarrow t \geq \log_{0,905} \frac{5}{13} \approx 9,6.$$

Vậy sau khoảng 10 năm sử dụng, giá trị của chiếc xe đó còn lại không quá 300 triệu đồng.

» **Luyện tập 3.** Giải các bất phương trình sau:

a)  $0,1^{2x-1} \leq 0,1^{2-x}$ ;

b)  $3 \cdot 2^{x+1} \leq 1$ .

#### 4. BẤT PHƯƠNG TRÌNH LÔGARIT

» **HĐ4.** Nhận biết nghiệm của bất phương trình lôgarit

Cho đồ thị của các hàm số  $y = \log_2 x$  và  $y = 2$  như Hình 6.8. Tìm khoảng giá trị của  $x$  mà đồ thị hàm số  $y = \log_2 x$  nằm phía trên đường thẳng  $y = 2$  và từ đó suy ra tập nghiệm của bất phương trình  $\log_2 x > 2$ .

Hình 6.8

- **Bất phương trình lôgarit cơ bản** có dạng  $\log_a x > b$  (hoặc  $\log_a x \geq b$ ,  $\log_a x < b$ ,  $\log_a x \leq b$ ) với  $a > 0$ ,  $a \neq 1$ .
- Xét bất phương trình dạng  $\log_a x > b$ :
  - Nếu  $a > 1$  thì nghiệm của bất phương trình là  $x > a^b$ .
  - Nếu  $0 < a < 1$  thì nghiệm của bất phương trình là  $0 < x < a^b$ .

**Chú ý**

a) Các bất phương trình lôgarit cơ bản còn lại được giải tương tự.

b) Nếu  $a > 1$  thì  $\log_a u > \log_a v \Leftrightarrow u > v > 0$ .

Nếu  $0 < a < 1$  thì  $\log_a u > \log_a v \Leftrightarrow 0 < u < v$ .

» **Ví dụ 7.** Giải bất phương trình:  $\log_{0,3}(x+1) \leq \log_{0,3}(2x-1)$ .

**Giải**

Điều kiện:  $x > \frac{1}{2}$ .

Vì cơ số  $0,3 < 1$  nên bất phương trình trở thành  $x+1 \geq 2x-1$ , từ đó tìm được  $x \leq 2$ .

Kết hợp với điều kiện, ta được nghiệm của bất phương trình đã cho là  $\frac{1}{2} < x \leq 2$ .

» **Luyện tập 4.** Giải các bất phương trình sau:

a)  $\log_{\frac{1}{7}}(x+1) > \log_7(2-x)$ ;      b)  $2\log(2x+1) > 3$ .

» **Vận dụng.** Áp suất khí quyển  $p$  (tính bằng kilopascal, viết tắt là kPa) ở độ cao  $h$  (so với mực nước biển, tính bằng km) được tính theo công thức sau:

$$\ln\left(\frac{p}{100}\right) = -\frac{h}{7}.$$

(Theo *britannica.com*)

a) Tính áp suất khí quyển ở độ cao 4 km.

b) Ở độ cao trên 10 km thì áp suất khí quyển sẽ như thế nào?

# CHƯƠNG IX. ĐẠO HÀM

## Bài 31. Định nghĩa và ý nghĩa của đạo hàm

#### THUẬT NGỮ

- Đạo hàm tại một điểm
- Đạo hàm trên một khoảng
- Hệ số góc của tiếp tuyến
- Vận tốc tức thời
- Tốc độ biến đổi tức thời

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết một số bài toán dẫn đến khái niệm đạo hàm.
- Nhận biết định nghĩa đạo hàm. Tính đạo hàm của một số hàm đơn giản bằng định nghĩa.
- Nhận biết ý nghĩa hình học của đạo hàm. Thiết lập phương trình tiếp tuyến của đồ thị hàm số tại một điểm thuộc đồ thị.
- Vận dụng định nghĩa đạo hàm vào giải quyết một số bài toán thực tiễn.

Nếu một quả bóng được thả rơi tự do từ đài quan sát trên sân thượng của toà nhà Landmark 81 (Thành phố Hồ Chí Minh) cao 461,3 m xuống mặt đất. Có tính được vận tốc của quả bóng khi nó chạm đất hay không? (Bỏ qua sức cản không khí).

Hình 9.1. Toà nhà Landmark 81

#### 1. MỘT SỐ BÀI TOÁN DẪN ĐẾN KHÁI NIỆM ĐẠO HÀM

##### a) Vận tốc tức thời của một vật chuyển động thẳng

» **HĐ1.** Một vật di chuyển trên một đường thẳng (H.9.2). quãng đường  $s$  của chuyển động là một hàm số của thời gian  $t$ ,  $s = s(t)$  (được gọi là *phương trình của chuyển động*).

a) Tính vận tốc trung bình của vật trong khoảng thời gian từ  $t_0$  đến  $t$ .

b) Giới hạn  $\lim_{t \rightarrow t_0} \frac{s(t) - s(t_0)}{t - t_0}$  cho ta biết điều gì?

Vị trí của vật tại thời điểm  $t_0$       Vị trí của vật tại thời điểm  $t$

Hình 9.2

##### b) Cường độ tức thời

» **HĐ2.** Điện lượng  $Q$  truyền trong dây dẫn là một hàm số của thời gian  $t$ , có dạng  $Q = Q(t)$ .

a) Tính cường độ trung bình của dòng điện trong khoảng thời gian từ  $t_0$  đến  $t$ .

b) Giới hạn  $\lim_{t \rightarrow t_0} \frac{Q(t) - Q(t_0)}{t - t_0}$  cho ta biết điều gì?

**Nhận xét.** Nhiều bài toán trong Vật lí, Hoá học, Sinh học,... đưa đến việc tìm giới hạn dạng

$$\lim_{x \rightarrow x_0} \frac{f(x) - f(x_0)}{x - x_0},$$

ở đó  $y = f(x)$  là một hàm số đã cho.

Giới hạn trên dẫn đến một khái niệm quan trọng trong Toán học, đó là khái niệm **đạo hàm**.

#### 2. ĐẠO HÀM CỦA HÀM SỐ TẠI MỘT ĐIỂM

Cho hàm số  $y = f(x)$  xác định trên khoảng  $(a; b)$  và điểm  $x_0 \in (a; b)$ .

Nếu tồn tại giới hạn hữu hạn

$$\lim_{x \rightarrow x_0} \frac{f(x) - f(x_0)}{x - x_0}$$

thì giới hạn đó được gọi là **đạo hàm của hàm số**  $y = f(x)$  tại điểm  $x_0$ , kí hiệu bởi  $f'(x_0)$  (hoặc  $y'(x_0)$ ), tức là

$$f'(x_0) = \lim_{x \rightarrow x_0} \frac{f(x) - f(x_0)}{x - x_0}.$$

**Chú ý.** Để tính đạo hàm của hàm số  $y = f(x)$  tại điểm  $x_0 \in (a; b)$ , ta thực hiện theo các bước sau:

1. Tính  $f(x) - f(x_0)$ .

2. Lập và rút gọn tỉ số  $\frac{f(x) - f(x_0)}{x - x_0}$  với  $x \in (a; b)$ ,  $x \neq x_0$ .

3. Tìm giới hạn  $\lim_{x \rightarrow x_0} \frac{f(x) - f(x_0)}{x - x_0}$ .

» **Ví dụ 1.** Tính đạo hàm của hàm số  $y = f(x) = x^2 + 2x$  tại điểm  $x_0 = 1$ .

**Giải**

Ta có:  $f(x) - f(1) = x^2 + 2x - 3 = x^2 - 1 + 2x - 2 = (x - 1)(x + 3)$ .

Với  $x \neq 1$ ,  $\frac{f(x) - f(1)}{x - 1} = \frac{(x - 1)(x + 3)}{x - 1} = x + 3$ .

Tính giới hạn:  $\lim_{x \rightarrow 1} \frac{f(x) - f(1)}{x - 1} = \lim_{x \rightarrow 1} (x + 3) = 4$ .

Vậy  $f'(1) = 4$ .

Trong thực hành, ta thường trình bày ngắn gọn như sau:

$$\begin{aligned} f'(1) &= \lim_{x \rightarrow 1} \frac{f(x) - f(1)}{x - 1} = \lim_{x \rightarrow 1} \frac{(x^2 + 2x) - 3}{x - 1} \\ &= \lim_{x \rightarrow 1} \frac{(x - 1)(x + 3)}{x - 1} = \lim_{x \rightarrow 1} (x + 3) = 4. \end{aligned}$$

**Chú ý.** Đặt  $h = x - x_0$ , khi đó đạo hàm của hàm số đã cho tại điểm  $x_0 = 1$  có thể tính như sau:

$$\begin{aligned} f'(1) &= \lim_{h \rightarrow 0} \frac{f(1+h) - f(1)}{h} = \lim_{h \rightarrow 0} \frac{[(1+h)^2 + 2(1+h)] - (1^2 + 2)}{h} \\ &= \lim_{h \rightarrow 0} \frac{(h^2 + 4h + 3) - 3}{h} = \lim_{h \rightarrow 0} (h + 4) = 4. \end{aligned}$$

$$f'(x_0) = \lim_{h \rightarrow 0} \frac{f(x_0 + h) - f(x_0)}{h}.$$

» **Luyện tập 1.** Tính đạo hàm của hàm số  $y = -x^2 + 2x + 1$  tại điểm  $x_0 = -1$ .

#### 3. ĐẠO HÀM CỦA HÀM SỐ TRÊN MỘT KHOẢNG

» **H03.** Tính đạo hàm  $f'(x_0)$  tại điểm  $x_0$  bất kì trong các trường hợp sau:

- a)  $f(x) = c$  ( $c$  là hằng số);      b)  $f(x) = x$ .

Hàm số  $y = f(x)$  được gọi là có **đạo hàm trên khoảng**  $(a; b)$  nếu nó có đạo hàm  $f'(x)$  tại mọi điểm  $x$  thuộc khoảng đó, kí hiệu là  $y' = f'(x)$ .

» **Ví dụ 2.** Tìm đạo hàm của hàm số  $y = cx^2$ , với  $c$  là hằng số.

**Giải**

Với  $x_0$  bất kì, ta có:

$$\begin{aligned} f'(x_0) &= \lim_{x \rightarrow x_0} \frac{cx^2 - cx_0^2}{x - x_0} = \lim_{x \rightarrow x_0} \frac{c(x - x_0)(x + x_0)}{x - x_0} \\ &= \lim_{x \rightarrow x_0} c(x + x_0) = c(x_0 + x_0) = 2cx_0. \end{aligned}$$

Vậy hàm số  $y = cx^2$  (với  $c$  là hằng số) có đạo hàm là hàm số  $y' = 2cx$ .

$$\begin{aligned} (c)' &= 0; \quad (x)' = 1; \\ (cx^2)' &= 2cx. \end{aligned}$$

**Chú ý.** Nếu phương trình chuyển động của vật là  $s = f(t)$  thì  $v(t) = f'(t)$  là vận tốc tức thời của vật tại thời điểm  $t$ .

» **Ví dụ 3.** Giải bài toán trong tình huống mở đầu (bỏ qua sức cản của không khí và làm tròn kết quả đến chữ số thập phân thứ nhất).

**Giải**

Phương trình chuyển động rơi tự do của quả bóng là  $s = f(t) = \frac{1}{2}gt^2$  ( $g$  là gia tốc rơi tự do, lấy  $g = 9,8 \text{ m/s}^2$ ). Do vậy, vận tốc của quả bóng tại thời điểm  $t$  là  $v(t) = f'(t) = gt = 9,8t$ .

Mặt khác, vì chiều cao của toà tháp là 461,3 m nên quả bóng sẽ chạm đất tại thời điểm  $t_1$ , với  $f(t_1) = 461,3$ . Từ đó, ta có:

$$4,9t_1^2 = 461,3 \Leftrightarrow t_1 = \sqrt{\frac{461,3}{4,9}} \text{ (giây)}.$$

Vậy vận tốc của quả bóng khi nó chạm đất là

$$v(t_1) = 9,8t_1 = 9,8 \cdot \sqrt{\frac{461,3}{4,9}} \approx 95,1 \text{ (m/s)}.$$

» **Luyện tập 2.** Tìm đạo hàm của các hàm số sau:

a)  $y = x^2 + 1$ ;

b)  $y = kx + c$  (với  $k, c$  là các hằng số).

#### 4. Ý NGHĨA HÌNH HỌC CỦA ĐẠO HÀM

##### a) Tiếp tuyến của đồ thị hàm số

» **HĐ4.** Nhận biết tiếp tuyến của đồ thị hàm số

Cho hàm số  $y = f(x)$  có đồ thị  $(C)$  và điểm  $P(x_0; f(x_0)) \in (C)$ .

Xét điểm  $Q(x; f(x))$  thay đổi trên  $(C)$  với  $x \neq x_0$ .

a) Đường thẳng đi qua hai điểm  $P, Q$  được gọi là một cát tuyến của đồ thị  $(C)$  (H.9.3). Tìm hệ số góc  $k_{PQ}$  của cát tuyến  $PQ$ .

b) Khi  $x \rightarrow x_0$  thì vị trí của điểm  $Q(x; f(x))$  trên đồ thị  $(C)$  thay đổi như thế nào?

c) Nếu điểm  $Q$  di chuyển trên  $(C)$  tới điểm  $P$  mà  $k_{PQ}$  có giới hạn hữu hạn  $k$  thì có nhận xét gì về vị trí giới hạn của cát tuyến  $QP$ ?

Hình 9.3

Hệ số góc của đường thẳng đi qua hai điểm  $(x_1; y_1)$  và  $(x_2; y_2)$ , với  $x_1 \neq x_2$ , là

$$k = \frac{y_2 - y_1}{x_2 - x_1}.$$

**Tiếp tuyến của đồ thị** hàm số  $y = f(x)$  tại điểm  $P(x_0; f(x_0))$  là đường thẳng đi qua  $P$  với hệ số góc  $k = \lim_{x \rightarrow x_0} \frac{f(x) - f(x_0)}{x - x_0}$  nếu giới hạn này tồn tại và hữu hạn, nghĩa là  $k = f'(x_0)$ . Điểm  $P$  gọi là **tiếp điểm**.

**Nhận xét.** Hệ số góc của tiếp tuyến của đồ thị hàm số  $y = f(x)$  tại điểm  $P(x_0; f(x_0))$  là đạo hàm  $f'(x_0)$ .

» **Ví dụ 4.** Tìm hệ số góc của tiếp tuyến của parabol  $y = x^2$  tại điểm có hoành độ  $x_0 = -1$ .

**Giải**

Ta có  $(x^2)' = 2x$  nên  $y'(-1) = 2 \cdot (-1) = -2$ . Vậy hệ số góc của tiếp tuyến của parabol  $y = x^2$  tại điểm có hoành độ  $x_0 = -1$  là  $k = -2$ .

» **Luyện tập 3.** Tìm hệ số góc của tiếp tuyến của parabol  $y = x^2$  tại điểm có hoành độ  $x_0 = \frac{1}{2}$ .

##### b) Phương trình tiếp tuyến

» **HĐ5.** Cho hàm số  $y = x^2$  có đồ thị là đường parabol  $(P)$ .

a) Tìm hệ số góc của tiếp tuyến của  $(P)$  tại điểm có hoành độ  $x_0 = 1$ .

b) Viết phương trình tiếp tuyến đó.

Từ ý nghĩa hình học của đạo hàm, ta rút ra kết luận sau:

Nếu hàm số  $y = f(x)$  có đạo hàm tại điểm  $x_0$  thì phương trình tiếp tuyến của đồ thị hàm số tại điểm  $P(x_0; y_0)$  là  $y - y_0 = f'(x_0)(x - x_0)$ , trong đó  $y_0 = f(x_0)$ .

» **Ví dụ 5.** Viết phương trình tiếp tuyến của parabol  $(P): y = 3x^2$  tại điểm có hoành độ  $x_0 = 1$ .

**Giải**

Từ Ví dụ 2, ta có  $y' = 6x$ . Do đó, hệ số góc của tiếp tuyến là  $k = f'(1) = 6$ . Ngoài ra, ta có  $f(1) = 3$  nên phương trình tiếp tuyến cần tìm là  $y - 3 = 6(x - 1)$  hay  $y = 6x - 3$ .

» **Luyện tập 4.** Viết phương trình tiếp tuyến của parabol  $(P): y = -2x^2$  tại điểm có hoành độ  $x_0 = -1$ .

» **Vận dụng.** Người ta xây dựng một cây cầu vượt giao thông hình parabol nối hai điểm có khoảng cách là 400 m (H.9.4). Độ dốc của mặt cầu không vượt quá  $10^\circ$  (độ dốc tại một điểm được xác định bởi góc giữa phương tiếp xúc với mặt cầu và phương ngang như Hình 9.5). Tính chiều cao giới hạn từ đỉnh cầu đến mặt đường (làm tròn kết quả đến chữ số thập phân thứ nhất).

Hình 9.4. Cầu vượt thép tại nút giao Nguyễn Văn Cừ quận Long Biên, Hà Nội

Hình 9.5

**Hướng dẫn.** Chọn hệ trục toạ độ sao cho đỉnh cầu là gốc toạ độ và mặt cắt của cây cầu có hình dạng parabol  $y = -ax^2$  (với  $a$  là hằng số dương). Hệ số góc xác định độ dốc của mặt cầu là  $k = y' = -2ax$ ,  $-200 \leq x \leq 200$ .

Do đó,  $|k| = 2a|x| \leq 400a$ . Vì độ dốc của mặt cầu không quá  $10^\circ$  nên ta có:  $400a \leq \tan 10^\circ$ .

Từ đó tính được chiều cao giới hạn từ đỉnh cầu đến mặt đường.

## Bài 32. Các quy tắc tính đạo hàm

#### **THUẬT NGỮ**

- Đạo hàm của tổng, hiệu
- Đạo hàm của tích, thương
- Đạo hàm của hàm số hợp
- Đạo hàm của các hàm số sơ cấp cơ bản

#### **KIẾN THỨC, KĨ NĂNG**

- Tính đạo hàm của một số hàm số sơ cấp cơ bản.
- Sử dụng các công thức tính đạo hàm của tổng, hiệu, tích, thương các hàm số và đạo hàm của hàm số hợp.
- Vận dụng các quy tắc đạo hàm để giải quyết một số bài toán thực tiễn.

Một vật được phóng theo phương thẳng đứng lên trên từ mặt đất với vận tốc ban đầu  $v_0 = 20$  m/s. Trong Vật lí, ta biết rằng khi bỏ qua sức cản của không khí, độ cao  $h$  so với mặt đất (tính bằng mét) của vật tại thời điểm  $t$  (giây) sau khi ném được cho bởi công thức sau:

$$h = v_0 t - \frac{1}{2} g t^2,$$

trong đó  $v_0$  là vận tốc ban đầu của vật,  $g = 9,8$  m/s<sup>2</sup> là gia tốc rơi tự do. Hãy tính vận tốc của vật khi nó đạt độ cao cực đại và khi nó chạm đất.

Hình 9.7

#### **1. ĐẠO HÀM CỦA MỘT SỐ HÀM SỐ THƯỜNG GẶP**

##### **a) Đạo hàm của hàm số $y = x^n$ ( $n \in \mathbb{N}^*$ )**

$(x)' = 1; (x^2)' = 2x.$

» **HĐ1.** Nhận biết đạo hàm của hàm số  $y = x^n$

- Tính đạo hàm của hàm số  $y = x^2$  tại điểm  $x$  bất kì.
- Dự đoán công thức đạo hàm của hàm số  $y = x^n$  ( $n \in \mathbb{N}^*$ ).

Hàm số  $y = x^n$  ( $n \in \mathbb{N}^*$ ) có đạo hàm trên  $\mathbb{R}$  và  $(x^n)' = nx^{n-1}$ .

##### **b) Đạo hàm của hàm số $y = \sqrt{x}$**

» **HĐ2.** Dùng định nghĩa, tính đạo hàm của hàm số  $y = \sqrt{x}$  tại điểm  $x > 0$ .

Hàm số  $y = \sqrt{x}$  có đạo hàm trên khoảng  $(0; +\infty)$  và  $(\sqrt{x})' = \frac{1}{2\sqrt{x}}$ .

» **Ví dụ 1.** Tính đạo hàm của hàm số  $y = \sqrt{x}$  tại các điểm  $x = 4$  và  $x = \frac{1}{4}$ .

**Giải**

Với mọi  $x \in (0; +\infty)$ , ta có  $y' = \frac{1}{2\sqrt{x}}$ . Do đó  $y'(4) = \frac{1}{2\sqrt{4}} = \frac{1}{4}$  và  $y'\left(\frac{1}{4}\right) = \frac{1}{2\sqrt{\frac{1}{4}}} = 1$ .

#### 2. ĐẠO HÀM CỦA TỔNG, HIỆU, TÍCH, THƯƠNG

##### » H03. Nhận biết quy tắc đạo hàm của tổng

- a) Dùng định nghĩa, tính đạo hàm của hàm số  $y = x^3 + x^2$  tại điểm  $x$  bất kì.  
b) So sánh:  $(x^3 + x^2)'$  và  $(x^3)' + (x^2)'$ .

Giả sử các hàm số  $u = u(x)$ ,  $v = v(x)$  có đạo hàm trên khoảng  $(a; b)$ . Khi đó

$$\begin{aligned}(u + v)' &= u' + v'; & (u - v)' &= u' - v'; \\ (uv)' &= u'v + uv'; & \left(\frac{u}{v}\right)' &= \frac{u'v - uv'}{v^2} \quad (v = v(x) \neq 0).\end{aligned}$$

###### Chú ý

- Quy tắc đạo hàm của tổng, hiệu có thể áp dụng cho tổng, hiệu của hai hay nhiều hàm số.
- Với  $k$  là một hằng số, ta có:  $(ku)' = ku'$ .
- Đạo hàm của hàm số nghịch đảo:  $\left(\frac{1}{v}\right)' = -\frac{v'}{v^2}$  ( $v = v(x) \neq 0$ ).

##### » Ví dụ 2. Tính đạo hàm của các hàm số sau:

a)  $y = \frac{1}{3}x^3 - x^2 + 2x + 1$ ;

b)  $y = \frac{2x+1}{x-1}$ .

Giải

a) Ta có:  $y' = \frac{1}{3}(x^3)' - (x^2)' + 2(x)' + 1'$   
$$= \frac{1}{3} \cdot 3x^2 - 2x + 2$$
$$= x^2 - 2x + 2.$$

b) Với mọi  $x \neq 1$ , ta có:

$$\begin{aligned}y' &= \frac{(2x+1)'(x-1) - (2x+1)(x-1)'}{(x-1)^2} \\ &= \frac{2(x-1) - (2x+1)}{(x-1)^2} = -\frac{3}{(x-1)^2}.\end{aligned}$$

##### » Ví dụ 3. Giải bài toán trong tình huống mở đầu.

Giải

Phương trình chuyển động của vật là  $h = v_0 t - \frac{1}{2}gt^2$ .

Vận tốc của vật tại thời điểm  $t$  được cho bởi  $v(t) = h' = v_0 - gt$ .

Vật đạt độ cao cực đại tại thời điểm  $t_1 = \frac{v_0}{g}$ , tại đó vận tốc bằng  $v(t_1) = v_0 - gt_1 = 0$ .

Vật chạm đất tại thời điểm  $t_2$  mà  $h(t_2) = 0$  nên ta có:

$$v_0 t_2 - \frac{1}{2}gt_2^2 = 0 \Leftrightarrow t_2 = 0 \text{ (loại)} \text{ và } t_2 = \frac{2v_0}{g}.$$

Khi chạm đất, vận tốc của vật là  $v(t_2) = v_0 - gt_2 = -v_0 = -20$  (m/s).

Dấu âm của  $v(t_2)$  thể hiện độ cao của vật giảm với vận tốc 20 m/s (tức là chiều chuyển động của vật ngược với chiều dương đã chọn).

» **Luyện tập 1.** Tính đạo hàm của các hàm số sau:

a)  $y = \frac{\sqrt{x}}{x+1}$ ;

b)  $y = (\sqrt{x} + 1)(x^2 + 2)$ .

#### 3. ĐẠO HÀM CỦA HÀM SỐ HỢP

##### a) Khái niệm hàm số hợp

Diện tích của một chiếc đĩa kim loại hình tròn bán kính  $r$  được cho bởi  $S = \pi r^2$ . Bán kính  $r$  thay đổi theo nhiệt độ  $t$  của chiếc đĩa, tức là  $r = r(t)$ . Khi đó, diện tích của chiếc đĩa phụ thuộc nhiệt độ  $S = S(t) = \pi(r(t))^2$ . Ta nói  $S(t)$  là **hàm số hợp** của hàm  $S = \pi r^2$  với  $r = r(t)$ .

Giả sử  $u = g(x)$  là hàm số xác định trên khoảng  $(a; b)$ , có tập giá trị chứa trong khoảng  $(c; d)$  và  $y = f(u)$  là hàm số xác định trên khoảng  $(c; d)$ . Hàm số  $y = f(g(x))$  được gọi là **hàm số hợp** của hàm số  $y = f(u)$  với  $u = g(x)$ .

Hình 9.8

» **Ví dụ 4.** Biểu diễn hàm số  $y = (2x + 1)^{10}$  dưới dạng hàm số hợp.

**Giải**

Hàm số  $y = (2x + 1)^{10}$  là hàm số hợp của hàm số  $y = u^{10}$  với  $u = 2x + 1$ .

##### b) Đạo hàm của hàm số hợp

» **HĐ4.** Nhận biết quy tắc đạo hàm của hàm số hợp

Cho các hàm số  $y = u^2$  và  $u = x^2 + 1$ .

a) Viết công thức của hàm số hợp  $y = (u(x))^2$  theo biến  $x$ .

b) Tính và so sánh:  $y'(x)$  và  $y'(u) \cdot u'(x)$ .

Nếu hàm số  $u = g(x)$  có đạo hàm  $u'_x$  tại  $x$  và hàm số  $y = f(u)$  có đạo hàm  $y'_u$  tại  $u$  thì hàm số hợp  $y = f(g(x))$  có đạo hàm  $y'_x$  tại  $x$  là

$$y'_x = y'_u \cdot u'_x.$$

» **Ví dụ 5.** Tính đạo hàm của hàm số  $y = \sqrt{x^2 + 1}$ .

**Giải**

Đặt  $u = x^2 + 1$  thì  $y = \sqrt{u}$  và  $y'_u = \frac{1}{2\sqrt{u}}$ ,  $u'_x = 2x$ .

Theo công thức đạo hàm của hàm số hợp, ta có:  $y'_x = y'_u \cdot u'_x = \frac{2x}{2\sqrt{x^2+1}} = \frac{x}{\sqrt{x^2+1}}$ .  
Vậy đạo hàm của hàm số đã cho là  $y' = \frac{x}{\sqrt{x^2+1}}$ .

Trong thực hành, ta thường trình bày ngắn gọn như sau:

$$y' = (\sqrt{x^2+1})' = \frac{(x^2+1)'}{2\sqrt{x^2+1}} = \frac{2x}{2\sqrt{x^2+1}} = \frac{x}{\sqrt{x^2+1}}$$

» **Luyện tập 2.** Tính đạo hàm của các hàm số sau:

a)  $y = (2x-3)^{10}$ ;                      b)  $y = \sqrt{1-x^2}$ .

#### 4. ĐẠO HÀM CỦA HÀM SỐ LƯỢNG GIÁC

##### a) Đạo hàm của hàm số $y = \sin x$

» **HĐ5.** Xây dựng công thức tính đạo hàm của hàm số  $y = \sin x$

a) Với  $h \neq 0$ , biến đổi hiệu  $\sin(x+h) - \sin x$  thành tích.

b) Sử dụng đẳng thức giới hạn  $\lim_{h \rightarrow 0} \frac{\sin h}{h} = 1$  và kết quả của câu a, tính đạo hàm của hàm số  $y = \sin x$  tại điểm  $x$  bằng định nghĩa.

- Hàm số  $y = \sin x$  có đạo hàm trên  $\mathbb{R}$  và  $(\sin x)' = \cos x$ .
- Đối với hàm số hợp  $y = \sin u$ , với  $u = u(x)$ , ta có:  $(\sin u)' = u' \cdot \cos u$ .

» **Ví dụ 6.** Tính đạo hàm của hàm số  $y = \sin\left(2x + \frac{\pi}{8}\right)$ .

Giải

Ta có:  $y' = \left(2x + \frac{\pi}{8}\right)' \cdot \cos\left(2x + \frac{\pi}{8}\right) = 2 \cos\left(2x + \frac{\pi}{8}\right)$ .

» **Luyện tập 3.** Tính đạo hàm của hàm số  $y = \sin\left(\frac{\pi}{3} - 3x\right)$ .

##### b) Đạo hàm của hàm số $y = \cos x$

» **HĐ6.** Xây dựng công thức tính đạo hàm của hàm số  $y = \cos x$

Bằng cách viết  $y = \cos x = \sin\left(\frac{\pi}{2} - x\right)$ , tính đạo hàm của hàm số  $y = \cos x$ .

- Hàm số  $y = \cos x$  có đạo hàm trên  $\mathbb{R}$  và  $(\cos x)' = -\sin x$ .
- Đối với hàm số hợp  $y = \cos u$ , với  $u = u(x)$ , ta có:  $(\cos u)' = -u' \cdot \sin u$ .

» **Ví dụ 7.** Tính đạo hàm của hàm số  $y = \cos\left(4x - \frac{\pi}{3}\right)$ .

Giải

Ta có:  $y' = -\left(4x - \frac{\pi}{3}\right)' \cdot \sin\left(4x - \frac{\pi}{3}\right) = -4 \sin\left(4x - \frac{\pi}{3}\right)$ .

» **Luyện tập 4.** Tính đạo hàm của hàm số  $y = 2 \cos\left(\frac{\pi}{4} - 2x\right)$ .

##### c) Đạo hàm của các hàm số $y = \tan x$ và $y = \cot x$

» **HĐ7.** Xây dựng công thức tính đạo hàm của các hàm số  $y = \tan x$  và  $y = \cot x$

a) Bằng cách viết  $y = \tan x = \frac{\sin x}{\cos x}$  ( $x \neq \frac{\pi}{2} + k\pi, k \in \mathbb{Z}$ ), tính đạo hàm của hàm số  $y = \tan x$ .

b) Sử dụng đẳng thức  $\cot x = \tan\left(\frac{\pi}{2} - x\right)$  với  $x \neq k\pi$  ( $k \in \mathbb{Z}$ ), tính đạo hàm của hàm số  $y = \cot x$ .

- Hàm số  $y = \tan x$  có đạo hàm tại mọi  $x \neq \frac{\pi}{2} + k\pi$  ( $k \in \mathbb{Z}$ ) và  $(\tan x)' = \frac{1}{\cos^2 x}$ .
- Hàm số  $y = \cot x$  có đạo hàm tại mọi  $x \neq k\pi$  ( $k \in \mathbb{Z}$ ) và  $(\cot x)' = -\frac{1}{\sin^2 x}$ .
- Đối với các hàm số hợp  $y = \tan u$  và  $y = \cot u$ , với  $u = u(x)$ , ta có

$$(\tan u)' = \frac{u'}{\cos^2 u}; (\cot u)' = -\frac{u'}{\sin^2 u} \text{ (giả thiết } \tan u \text{ và } \cot u \text{ có nghĩa).}$$

» **Ví dụ 8.** Tính đạo hàm của hàm số  $y = \tan\left(2x + \frac{\pi}{4}\right)$ .

Giải

Ta có:  $y' = \frac{\left(2x + \frac{\pi}{4}\right)'}{\cos^2\left(2x + \frac{\pi}{4}\right)} = \frac{2}{\cos^2\left(2x + \frac{\pi}{4}\right)}$ .

» **Luyện tập 5.** Tính đạo hàm của hàm số  $y = 2 \tan^2 x + 3 \cot\left(\frac{\pi}{3} - 2x\right)$ .

» **Vận dụng 1.** Một vật chuyển động có phương trình  $s(t) = 4 \cos\left(2\pi t - \frac{\pi}{8}\right)$  (m), với  $t$  là thời gian tính bằng giây. Tính vận tốc của vật khi  $t = 5$  giây (làm tròn kết quả đến chữ số thập phân thứ nhất).

#### 5. ĐẠO HÀM CỦA HÀM SỐ MŨ VÀ HÀM SỐ LÔGARIT

##### a) Giới hạn liên quan đến hàm số mũ và hàm số lôgarit

» **HĐ8.** Giới hạn cơ bản của hàm số mũ và hàm số lôgarit

a) Sử dụng phép đổi biến  $t = \frac{1}{x}$ , tìm giới hạn  $\lim_{x \rightarrow 0} (1+x)^{\frac{1}{x}}$ .

b) Với  $y = (1+x)^{\frac{1}{x}}$ , tính  $\ln y$  và tìm giới hạn của  $\lim_{x \rightarrow 0} \ln y$ .

c) Đặt  $t = e^x - 1$ . Tính  $x$  theo  $t$  và tìm giới hạn  $\lim_{x \rightarrow 0} \frac{e^x - 1}{x}$ .

**Nhận xét.** Ta có các giới hạn sau:

$$\lim_{x \rightarrow 0} (1+x)^{\frac{1}{x}} = e;$$

$$\lim_{x \rightarrow 0} \frac{\ln(1+x)}{x} = 1;$$

$$\lim_{x \rightarrow 0} \frac{e^x - 1}{x} = 1.$$

- $\lim_{t \rightarrow +\infty} \left(1 + \frac{1}{t}\right)^t = e$ .
- $\lim_{t \rightarrow -\infty} \left(1 + \frac{1}{t}\right)^t = e$ .

##### b) Đạo hàm của hàm số mũ

##### » HĐ9. Xây dựng công thức tính đạo hàm của hàm số mũ

a) Sử dụng giới hạn  $\lim_{h \rightarrow 0} \frac{e^h - 1}{h} = 1$  và đẳng thức  $e^{x+h} - e^x = e^x(e^h - 1)$ , tính đạo hàm của hàm số  $y = e^x$  tại  $x$  bằng định nghĩa.

b) Sử dụng đẳng thức  $a^x = e^{x \ln a}$  ( $0 < a \neq 1$ ), hãy tính đạo hàm của hàm số  $y = a^x$ .

- Hàm số  $y = e^x$  có đạo hàm trên  $\mathbb{R}$  và  $(e^x)' = e^x$ .  
Đối với hàm số hợp  $y = e^u$ , với  $u = u(x)$ , ta có:  $(e^u)' = e^u \cdot u'$ .
- Hàm số  $y = a^x$  ( $0 < a \neq 1$ ) có đạo hàm trên  $\mathbb{R}$  và  $(a^x)' = a^x \ln a$ .  
Đối với hàm số hợp  $y = a^u$ , với  $u = u(x)$ , ta có:  $(a^u)' = a^u \cdot u' \cdot \ln a$ .

##### » Ví dụ 9. Tính đạo hàm của hàm số $y = 2^{x^2-x}$ .

Giải

Ta có:  $y' = 2^{x^2-x} \cdot (x^2 - x)' \cdot \ln 2 = 2^{x^2-x} (2x - 1) \ln 2$ .

###### » Luyện tập 6. Tính đạo hàm của các hàm số sau:

a)  $y = e^{x^2-x}$ ;

b)  $y = 3^{\sin x}$ .

##### c) Đạo hàm của hàm số lôgarit

##### » HĐ10. Xây dựng công thức tính đạo hàm của hàm số lôgarit

a) Sử dụng giới hạn  $\lim_{t \rightarrow 0} \frac{\ln(1+t)}{t} = 1$  và đẳng thức  $\ln(x+h) - \ln x = \ln\left(\frac{x+h}{x}\right) = \ln\left(1 + \frac{h}{x}\right)$ , tính đạo hàm của hàm số  $y = \ln x$  tại điểm  $x > 0$  bằng định nghĩa.

b) Sử dụng đẳng thức  $\log_a x = \frac{\ln x}{\ln a}$  ( $0 < a \neq 1$ ), hãy tính đạo hàm của hàm số  $y = \log_a x$ .

- Hàm số  $y = \ln x$  có đạo hàm trên khoảng  $(0; +\infty)$  và  $(\ln x)' = \frac{1}{x}$ .  
Đối với hàm số hợp  $y = \ln u$ , với  $u = u(x)$ , ta có:  $(\ln u)' = \frac{u'}{u}$ .
- Hàm số  $y = \log_a x$  có đạo hàm trên khoảng  $(0; +\infty)$  và  $(\log_a x)' = \frac{1}{x \ln a}$ .  
Đối với hàm số hợp  $y = \log_a u$ , với  $u = u(x)$ , ta có:  $(\log_a u)' = \frac{u'}{u \ln a}$ .

**Chú ý.** Với  $x < 0$ , ta có:  $\ln|x| = \ln(-x)$  và  $[\ln(-x)]' = \frac{(-x)'}{-x} = \frac{1}{x}$ . Từ đó ta có:

$$(\ln|x|)' = \frac{1}{x}, \quad \forall x \neq 0.$$

▶ **Ví dụ 10.** Tính đạo hàm của hàm số  $y = \ln(x^2 + 1)$ .

**Giải**

Vì  $x^2 + 1 > 0$  với mọi  $x$  nên hàm số xác định trên  $\mathbb{R}$ . Ta có:  $y' = \frac{(x^2 + 1)'}{x^2 + 1} = \frac{2x}{x^2 + 1}$ .

▶ **Luyện tập 7.** Tính đạo hàm của hàm số  $y = \log_2(2x - 1)$ .

▶ **Vận dụng 2.** Ta đã biết, độ pH của một dung dịch được xác định bởi  $pH = -\log[H^+]$ , ở đó  $[H^+]$  là nồng độ (mol/l) của ion hydrogen. Tính tốc độ thay đổi của pH đối với nồng độ  $[H^+]$ .

#### BẢNG ĐẠO HÀM

|                                                                                                                       |                                                                                                                                            |                                                                                                                                   |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| $(x^n)' = nx^{n-1}$<br>$\left(\frac{1}{x}\right)' = -\frac{1}{x^2}$<br>$(\sqrt{x})' = \frac{1}{2\sqrt{x}}$            | $(\sin x)' = \cos x$<br>$(\cos x)' = -\sin x$<br>$(\tan x)' = \frac{1}{\cos^2 x}$<br>$(\cot x)' = -\frac{1}{\sin^2 x}$                     | $(e^x)' = e^x$<br>$(a^x)' = a^x \ln a$<br>$(\ln x)' = \frac{1}{x}$<br>$(\log_a x)' = \frac{1}{x \ln a}$                           |
| $(u^n)' = nu^{n-1} \cdot u'$<br>$\left(\frac{1}{u}\right)' = -\frac{u'}{u^2}$<br>$(\sqrt{u})' = \frac{u'}{2\sqrt{u}}$ | $(\sin u)' = u' \cdot \cos u$<br>$(\cos u)' = -u' \cdot \sin u$<br>$(\tan u)' = \frac{u'}{\cos^2 u}$<br>$(\cot u)' = -\frac{u'}{\sin^2 u}$ | $(e^u)' = e^u \cdot u'$<br>$(a^u)' = a^u \cdot u' \cdot \ln a$<br>$(\ln u)' = \frac{u'}{u}$<br>$(\log_a u)' = \frac{u'}{u \ln a}$ |

## Bài 33. Đạo hàm cấp hai

#### THUẬT NGỮ

- Đạo hàm cấp hai
- Gia tốc tức thời

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết khái niệm đạo hàm cấp hai của một hàm số.
- Tính đạo hàm cấp hai của một số hàm số đơn giản.
- Vận dụng đạo hàm cấp hai để giải quyết một số bài toán thực tiễn.

Chuyển động của một vật gắn trên con lắc lò xo (khi bỏ qua ma sát và sức cản không khí) được cho bởi phương trình sau:

$$x(t) = 4 \cos \left( 2\pi t + \frac{\pi}{3} \right),$$

ở đó  $x$  tính bằng centimét và thời gian  $t$  tính bằng giây. Tìm gia tốc tức thời của vật tại thời điểm  $t = 5$  giây (làm tròn kết quả đến hàng đơn vị).

Hình 9.9

#### 1. KHÁI NIỆM ĐẠO HÀM CẤP HAI

» **HĐ1.** Nhận biết đạo hàm cấp hai của một hàm số

- Gọi  $g(x)$  là đạo hàm của hàm số  $y = \sin \left( 2x + \frac{\pi}{4} \right)$ . Tìm  $g(x)$ .
- Tính đạo hàm của hàm số  $y = g(x)$ .

Giả sử hàm số  $y = f(x)$  có đạo hàm tại mỗi điểm  $x \in (a; b)$ . Nếu hàm số  $y' = f'(x)$  lại có đạo hàm tại  $x$  thì ta gọi đạo hàm của  $y'$  là **đạo hàm cấp hai** của hàm số  $y = f(x)$  tại  $x$ , kí hiệu là  $y''$  hoặc  $f''(x)$ .

» **Ví dụ 1.** Tính đạo hàm cấp hai của hàm số  $y = x^2 + e^{2x-1}$ . Từ đó tính  $y''(0)$ .

**Giải**

Ta có:  $y' = 2x + (2x - 1)' \cdot e^{2x-1} = 2x + 2e^{2x-1};$   
 $y'' = 2 + 2(2x - 1)' \cdot e^{2x-1} = 2 + 4e^{2x-1}.$

Vậy đạo hàm cấp hai của hàm số đã cho là  $y'' = 2 + 4e^{2x-1}.$

Khi đó ta có:  $y''(0) = 2 + 4e^{-1}.$

» **Luyện tập 1.** Tính đạo hàm cấp hai của các hàm số sau:

- $y = xe^{2x};$
- $y = \ln(2x + 3).$

#### 2. Ý NGHĨA CƠ HỌC CỦA ĐẠO HÀM CẤP HAI

Xét một chuyển động có vận tốc tức thời  $v(t)$ . Cho số gia  $\Delta t$  tại  $t$  và  $\Delta v = v(t + \Delta t) - v(t)$ . Tỉ số  $\frac{\Delta v}{\Delta t}$  gọi là *gia tốc trung bình* trong khoảng thời gian  $\Delta t$ . Giới hạn của gia tốc trung bình (nếu có) khi  $\Delta t$  dần tới 0 được gọi là *gia tốc tức thời* của chuyển động tại thời điểm  $t$ , kí hiệu là  $a(t)$ . Như vậy

$$a(t) = \lim_{\Delta t \rightarrow 0} \frac{\Delta v}{\Delta t} = v'(t).$$

##### » HD2. Nhận biết ý nghĩa cơ học của đạo hàm cấp hai

Xét một chuyển động có phương trình  $s = 4 \cos 2\pi t$ .

- Tìm vận tốc tức thời của chuyển động tại thời điểm  $t$ .
- Tính gia tốc tức thời tại thời điểm  $t$ .

##### Ý nghĩa cơ học của đạo hàm cấp hai

Một chuyển động có phương trình  $s = f(t)$  thì đạo hàm cấp hai (nếu có) của hàm số  $f(t)$  là gia tốc tức thời của chuyển động. Ta có:

$$a(t) = f''(t).$$

##### » Ví dụ 2. Giải bài toán trong tình huống mở đầu.

**Giải**

Vận tốc của vật tại thời điểm  $t$  là

$$v(t) = x'(t) = -\left(2\pi t + \frac{\pi}{3}\right)' \cdot 4 \sin\left(2\pi t + \frac{\pi}{3}\right) = -8\pi \sin\left(2\pi t + \frac{\pi}{3}\right).$$

Gia tốc tức thời của vật tại thời điểm  $t$  là

$$a(t) = v'(t) = -8\pi \left(2\pi t + \frac{\pi}{3}\right)' \cdot \cos\left(2\pi t + \frac{\pi}{3}\right) = -16\pi^2 \cos\left(2\pi t + \frac{\pi}{3}\right).$$

Tại thời điểm  $t = 5$ , gia tốc của vật là

$$a(5) = -16\pi^2 \cos\left(10\pi + \frac{\pi}{3}\right) = -16\pi^2 \cos\frac{\pi}{3} \approx -79 \text{ (cm/s}^2\text{)}.$$

##### » Vận dụng. Một vật chuyển động thẳng có phương trình $s = 2t^2 + \frac{1}{2}t^4$ ( $s$ tính bằng mét, $t$ tính bằng giây). Tìm gia tốc của vật tại thời điểm $t = 4$ giây.

# CHƯƠNG VII. QUAN HỆ VUÔNG GÓC TRONG KHÔNG GIAN

## Bài 22. Hai đường thẳng vuông góc

#### THUẬT NGỮ

- Góc giữa hai đường thẳng
- Hai đường thẳng vuông góc

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết góc giữa hai đường thẳng.
- Nhận biết hai đường thẳng vuông góc.
- Chứng minh hai đường thẳng vuông góc trong một số tình huống đơn giản.
- Vận dụng kiến thức về quan hệ vuông góc giữa hai đường thẳng để mô tả một số hình ảnh thực tế.

Đối với các nút giao thông cùng mức hay khác mức, để có thể dễ dàng bố trí các nhánh rẽ và để người tham gia giao thông có góc nhìn đảm bảo an toàn, khi thiết kế người ta đều cố gắng để các tuyến đường tạo với nhau một góc đủ lớn và tốt nhất là góc vuông. Đối với nút giao thông cùng mức, tức là các đường giao nhau, thì góc giữa chúng là góc giữa hai đường thẳng mà ta đã biết. Còn đối với nút giao khác mức, tức là các đường chéo nhau, thì góc giữa chúng được hiểu như thế nào? Bài học này sẽ đề cập tới đối tượng toán học tương ứng.

Hình 7.1. Nút giao (khác mức) Trạm 2, Thủ Đức, Thành phố Hồ Chí Minh (Ảnh: vnexpress.net)

#### 1. GÓC GIỮA HAI ĐƯỜNG THẲNG

**HĐ1.** Trong không gian, cho hai đường thẳng chéo nhau  $m$  và  $n$ . Từ hai điểm phân biệt  $O, O'$  tuỳ ý lần lượt kẻ các cặp đường thẳng  $a, b$  và  $a', b'$  tương ứng song song với  $m, n$  (H.7.2).

- Mỗi cặp đường thẳng  $a, a'$  và  $b, b'$  có cùng thuộc một mặt phẳng hay không?
- Lấy các điểm  $A, B$  (khác  $O$ ) tương ứng thuộc  $a, b$ . Đường thẳng qua  $A$  song song với  $OO'$  cắt  $a'$  tại  $A'$ , đường thẳng qua  $B$  song song với  $OO'$  cắt  $b'$  tại  $B'$ . Giải thích vì sao  $OAA'O', OBB'O', ABB'A'$  là các hình bình hành.

Hình 7.2

- So sánh góc giữa hai đường thẳng  $a, b$  và góc giữa hai đường thẳng  $a', b'$ . (Gợi ý: Áp dụng định lí côsin cho các tam giác  $OAB, O'A'B'$ ).

**Góc giữa hai đường thẳng**  $m$  và  $n$  trong không gian, kí hiệu  $(m, n)$ , là góc giữa hai đường thẳng  $a$  và  $b$  cùng đi qua một điểm và tương ứng song song với  $m$  và  $n$ .

##### Chú ý

- Để xác định góc giữa hai đường thẳng chéo nhau  $a$  và  $b$ , ta có thể lấy một điểm  $O$  thuộc đường thẳng  $a$  và qua đó kẻ đường thẳng  $b'$  song song với  $b$ . Khi đó  $(a, b) = (a, b')$ .
- Với hai đường thẳng  $a, b$  bất kì:  $0^\circ \leq (a, b) \leq 90^\circ$ .

**?** Nếu  $a$  song song hoặc trùng với  $a'$  và  $b$  song song hoặc trùng với  $b'$  thì  $(a, b)$  và  $(a', b')$  có mối quan hệ gì?

**Ví dụ 1.** Cho hình hộp  $ABCD.A'B'C'D'$  có các mặt là các hình vuông. Tính các góc  $(AA', CD), (A'C', BD), (AC, DC')$ .

**Giải.** (H.7.3)

Vì  $CD \parallel AB$  nên  $(AA', CD) = (AA', AB) = 90^\circ$ . Tứ giác  $ACC'A'$  có các cặp cạnh đối bằng nhau nên nó là một hình bình hành. Do đó,  $A'C' \parallel AC$ . Vậy  $(A'C', BD) = (AC, BD) = 90^\circ$ .

Tương tự,  $DC' \parallel AB'$ . Vậy  $(AC, DC') = (AC, AB')$ . Tam giác  $AB'C$  có ba cạnh bằng nhau (vì là các đường chéo của các hình vuông có độ dài cạnh bằng nhau) nên nó là một tam giác đều. Từ đó,  $(AC, DC') = (AC, AB') = 60^\circ$ .

Hình 7.3

» **Vận dụng.** Kim tự tháp Cheops là kim tự tháp lớn nhất trong các kim tự tháp ở Ai Cập, được xây dựng vào thế kỉ thứ 26 trước Công nguyên và là một trong bảy kì quan của thế giới cổ đại. Kim tự tháp có dạng hình chóp với đáy là hình vuông có cạnh dài khoảng 230 m, các cạnh bên bằng nhau và dài khoảng 219 m (kích thước hiện nay). (Theo *britannica.com*).

Tính (gần đúng) góc tạo bởi cạnh bên  $SC$  và cạnh đáy  $AB$  của kim tự tháp (H.7.4).

Hình 7.4

#### 2. HAI ĐƯỜNG THẲNG VUÔNG GÓC

» **HĐ2.** Đối với hai cánh cửa trong Hình 7.5, tính góc giữa hai đường mép cửa  $BC$  và  $MN$ .

Hai đường thẳng  $a, b$  được gọi là **vuông góc với nhau**, kí hiệu  $a \perp b$ , nếu góc giữa chúng bằng  $90^\circ$ .

Hình 7.5

**?** Nếu đường thẳng  $a$  vuông góc với đường thẳng  $b$  thì  $a$  có vuông góc với các đường thẳng song song với  $b$  hay không?

» **Ví dụ 2.** Cho hình hộp  $ABCD.A'B'C'D'$  (H.7.6).

- Xác định vị trí tương đối của hai đường thẳng  $AC$  và  $B'D'$ .
- Chứng minh rằng  $AC$  và  $B'D'$  vuông góc với nhau khi và chỉ khi  $ABCD$  là một hình thoi.

**Giải**

- Hai đường thẳng  $AC$  và  $B'D'$  lần lượt thuộc hai mặt phẳng song song ( $ABCD$ ) và ( $A'B'C'D'$ ) nên chúng không có điểm chung, tức là chúng không thể trùng nhau hoặc cắt nhau.

Tứ giác  $BDD'B'$  có hai cạnh đối  $BB'$  và  $DD'$  song song và bằng nhau nên nó là một hình bình hành. Do đó  $B'D'$  song song với  $BD$ . Mặt khác,  $BD$  không song song với  $AC$  nên  $B'D'$  không song song với  $AC$ .

Từ những điều trên suy ra  $AC$  và  $B'D'$  chéo nhau.

Hình 7.6

b) Do  $B'D'$  song song với  $BD$  nên  $(AC, B'D') = (AC, BD)$ . Do đó,  $AC$  và  $B'D'$  vuông góc với nhau khi và chỉ khi  $AC$  và  $BD$  vuông góc với nhau. Do  $ABCD$  là hình bình hành nên  $AC$  vuông góc với  $BD$  khi và chỉ khi  $ABCD$  là hình thoi.

» **Luyện tập 1.** Cho tam giác  $MNP$  vuông tại  $N$  và một điểm  $A$  nằm ngoài mặt phẳng  $(MNP)$ . Lần lượt lấy các điểm  $B, C, D$  sao cho  $M, N, P$  tương ứng là trung điểm của  $AB, AC, CD$  (H.7.7). Chứng minh rằng  $AD$  và  $BC$  vuông góc với nhau và chéo nhau.

Hình 7.7

## Bài 23. Đường thẳng vuông góc với mặt phẳng

#### THUẬT NGŨ

- Đường thẳng vuông góc với mặt phẳng
- Mặt phẳng trung trực của đoạn thẳng

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết đường thẳng vuông góc với mặt phẳng.
- Điều kiện để đường thẳng vuông góc với mặt phẳng.
- Giải thích mối liên hệ giữa quan hệ song song và quan hệ vuông góc của đường thẳng và mặt phẳng.
- Vận dụng kiến thức về quan hệ vuông góc giữa đường thẳng và mặt phẳng vào thực tế.

Hình 7.9. Quảng trường mẫu nhiệm (Square of Miracles) ở Pisa, Toscana, Italy

Hầu hết các công trình kiến trúc đều được xây dựng theo phương thẳng đứng để có thể vững chãi, mặc dù vậy, cũng có những công trình có phương nghiêng. Nếu đứng tại Quảng trường mẫu nhiệm ở Pisa (H.7.9), bằng mắt thường, ta có thể cảm nhận rằng tháp ngoài cùng bên phải trong hình là nghiêng và các công trình còn lại đều thẳng đứng. Sau bài học, ta có thể diễn giải chính xác và bản chất hơn về điều này.

#### 1. ĐƯỜNG THẦNG VUÔNG GÓC VỚI MẶT PHẦNG

**HĐ1.** Đối với cánh cửa như trong Hình 7.10, khi đóng – mở cánh cửa, ta coi mép dưới BC của cánh cửa luôn sát sàn nhà (khe hở không đáng kể).

- Từ quan sát trên, hãy giải thích vì sao đường thẳng AB vuông góc với mọi đường thẳng đi qua B trên sàn nhà.
- Giải thích vì sao đường thẳng AB vuông góc với mọi đường thẳng trên sàn nhà.

Hình 7.10

Đường thẳng  $\Delta$  được gọi là **vuông góc** với mặt phẳng  $(P)$  nếu  $\Delta$  vuông góc với mọi đường thẳng nằm trong  $(P)$ .

**Chú ý.** Khi  $\Delta$  vuông góc với  $(P)$ , ta còn nói  $(P)$  vuông góc với  $\Delta$  hoặc  $\Delta$  và  $(P)$  vuông góc với nhau, kí hiệu  $\Delta \perp (P)$ .

**?** Nếu đường thẳng  $\Delta$  và mặt phẳng  $(P)$  vuông góc với nhau thì chúng có cắt nhau hay không?

Hình 7.11

**HĐ2.** Gấp tấm bìa cứng hình chữ nhật sao cho nếp gấp chia tấm bìa thành hai hình chữ nhật, sau đó đặt nó lên mặt bàn như Hình 7.11.

- Bằng cách trên, ta tạo được đường thẳng  $AB$  vuông góc với hai đường thẳng nào thuộc mặt bàn?
- Trên mặt bàn, qua điểm  $A$  kẻ một đường thẳng  $a$  tuỳ ý. Dùng ê ke, hãy kiểm tra trên mô hình xem  $AB$  có vuông góc với  $a$  hay không.

Người ta chứng minh được rằng:

Nếu một đường thẳng vuông góc với hai đường thẳng cắt nhau thuộc cùng một mặt phẳng thì nó vuông góc với mặt phẳng đó.

Hình 7.12

**?** Nếu một đường thẳng vuông góc với hai cạnh của một tam giác thì đường thẳng đó có vuông góc với cạnh còn lại hay không?

**Ví dụ 1.** Cho hình chóp  $S.ABC$  có đáy là tam giác  $ABC$  vuông tại  $B$  và cạnh  $SA$  vuông góc với các cạnh  $AB, AC$ . Chứng minh rằng  $BC \perp (SAB)$ .

**Giải.** (H.7.13)

Vì  $SA$  vuông góc với hai đường thẳng  $AB$  và  $AC$  nên

$SA \perp (ABC)$ . Suy ra  $SA \perp BC$ .

Tam giác  $ABC$  vuông tại  $B$  nên  $BC \perp BA$ .

Vì  $BC$  vuông góc với hai đường thẳng  $SA$  và  $BA$  nên

$BC \perp (SAB)$ .

Hình 7.13

**Luyện tập 1.** Cho hình chóp  $S.ABCD$  có đáy  $ABCD$  là hình bình hành tâm  $O$ ,  $SA = SC$  và  $SB = SD$  (H.7.14). Chứng minh rằng  $SO \perp (ABCD)$ .

Hình 7.14

» **Vận dụng.** Khi làm cột treo quần áo, ta có thể tạo hai thanh để thẳng đặt dưới sàn nhà và dựng cột treo vuông góc với hai thanh để đó (H.7.15). Hãy giải thích vì sao bằng cách đó ta có được cột treo vuông góc với sàn nhà.

Hình 7.15

#### 2. TÍNH CHẤT

» **HĐ3.** Cho điểm  $O$  và đường thẳng  $\Delta$  không đi qua  $O$ . Gọi  $d$  là đường thẳng đi qua  $O$  và song song với  $\Delta$ . Xét hai mặt phẳng phân biệt tùy ý  $(P)$  và  $(Q)$  cùng chứa  $d$ . Trong các mặt phẳng  $(P)$ ,  $(Q)$  tương ứng kẻ các đường thẳng  $a$ ,  $b$  cùng đi qua  $O$  và vuông góc với  $d$  (H.7.16). Giải thích vì sao  $mp(a, b)$  đi qua  $O$  và vuông góc với  $\Delta$ .

Hình 7.16

Có duy nhất một mặt phẳng đi qua một điểm cho trước và vuông góc với một đường thẳng cho trước.

**Nhận xét.** Nếu ba đường thẳng đôi một phân biệt  $a$ ,  $b$ ,  $c$  cùng đi qua một điểm  $O$  và cùng vuông góc với một đường thẳng  $\Delta$  thì ba đường thẳng đó cùng nằm trong mặt phẳng đi qua  $O$  và vuông góc với  $\Delta$  (H.7.17).

Hình 7.17

» **Ví dụ 2.** Chứng minh rằng điểm  $M$  cách đều hai điểm phân biệt  $A$ ,  $B$  cho trước khi và chỉ khi  $M$  thuộc mặt phẳng đi qua trung điểm của đoạn thẳng  $AB$  và vuông góc với đường thẳng  $AB$ .

**Giải.** (H.7.18)

Gọi  $(\alpha)$  là mặt phẳng đi qua trung điểm  $I$  của đoạn thẳng  $AB$  và vuông góc với đường thẳng  $AB$ . Ta có  $MA = MB$  khi và chỉ khi  $M$  trùng  $I$  hoặc tam giác  $MAB$  cân tại  $M$ . Mặt khác,  $\Delta MAB$  cân tại  $M$  khi và chỉ khi  $MI \perp AB$ , tức là  $M$  thuộc mặt phẳng  $(\alpha)$ . Do đó,  $MA = MB$  khi và chỉ khi  $M$  thuộc  $(\alpha)$ .

Hình 7.18

**Chú ý.** Mặt phẳng đi qua trung điểm của đoạn thẳng  $AB$  và vuông góc với đường thẳng  $AB$  được gọi là **mặt phẳng trung trực** của đoạn thẳng  $AB$ . Mặt phẳng trung trực của đoạn thẳng  $AB$  là tập hợp các điểm cách đều hai điểm  $A$ ,  $B$ .

**HĐ4.** Cho mặt phẳng  $(P)$  và điểm  $O$ . Trong mặt phẳng  $(P)$ , lấy hai đường thẳng cắt nhau  $a, b$  tuỳ ý. Gọi  $(\alpha), (\beta)$  là các mặt phẳng qua  $O$  và tương ứng vuông góc với  $a, b$  (H.7.19).

a) Giải thích vì sao hai mặt phẳng  $(\alpha), (\beta)$  cắt nhau theo một đường thẳng đi qua  $O$ .

b) Nêu nhận xét về mối quan hệ giữa  $\Delta$  và  $(P)$ .

Hình 7.19

Có duy nhất một đường thẳng đi qua một điểm cho trước và vuông góc với một mặt phẳng cho trước.

**Luyện tập 2.** Cho ba điểm phân biệt  $A, B, C$  sao cho các đường thẳng  $AB$  và  $AC$  cùng vuông góc với một mặt phẳng  $(P)$ . Chứng minh rằng ba điểm  $A, B, C$  thẳng hàng.

**Ví dụ 3.** Cho điểm  $A$  nằm ngoài mặt phẳng  $(P)$ . Giải thích vì sao có duy nhất điểm  $H$  thuộc  $(P)$  sao cho đường thẳng  $AH$  vuông góc với  $(P)$ .

**Giải**

Gọi  $a$  là đường thẳng đi qua  $A$  và vuông góc với mặt phẳng  $(P)$ . Lấy điểm  $H$  thuộc  $(P)$ . Khi đó, đường thẳng  $AH$  vuông góc với  $(P)$  khi và chỉ khi  $AH$  trùng với  $a$ , tức là  $H$  là giao điểm của  $a$  và  $(P)$ . Vậy có duy nhất điểm  $H$  thuộc  $(P)$  để  $AH$  vuông góc với  $(P)$ , đó là giao điểm của  $a$  với  $(P)$ .

#### 3. LIÊN HỆ GIỮA QUAN HỆ SONG SONG VÀ QUAN HỆ VUÔNG GÓC CỦA ĐƯỜNG THẲNG VÀ MẶT PHẲNG

Nội dung của mục này nhằm củng cố kiến thức và kĩ năng đã học ở hai mục trên. Ngoài ra, từ đó có thể rút ra các tính chất về mối liên hệ giữa quan hệ song song và quan hệ vuông góc của đường thẳng và mặt phẳng.

**HĐ5.** Cho đường thẳng  $a$  vuông góc với mặt phẳng  $(P)$  và song song với đường thẳng  $b$ . Lấy một đường thẳng  $m$  bất kì thuộc mặt phẳng  $(P)$ . Tính  $(b, m)$  và từ đó rút ra mối quan hệ giữa  $b$  và  $(P)$ .

Hình 7.20

**HĐ6.** Cho hai đường thẳng phân biệt  $a$  và  $b$  cùng vuông góc với mặt phẳng  $(P)$ . Xét  $O$  là một điểm thuộc  $a$  nhưng không thuộc  $b$ . Gọi  $c$  là đường thẳng qua  $O$  và song song với  $b$ .

a) Hỏi  $c$  có vuông góc với  $(P)$  hay không? Nêu nhận xét về vị trí tương đối giữa  $a$  và  $c$ .

b) Nêu nhận xét về vị trí tương đối giữa hai đường thẳng  $a$  và  $b$ .

Hình 7.21

- Nếu đường thẳng  $a$  vuông góc với mặt phẳng  $(P)$  thì các đường thẳng song song với  $a$  cũng vuông góc với  $(P)$ .
- Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau.

» **Ví dụ 4.** Cho tứ diện  $OABC$  có các cạnh  $OA, OB, OC$  tương ứng vuông góc với nhau. Gọi  $M, N$  tương ứng là trọng tâm của các tam giác  $ABC, OBC$ . Chứng minh rằng đường thẳng  $MN$  vuông góc với mặt phẳng  $(OBC)$ .

**Giải.** (H.7.22)

Vì  $AO$  vuông góc với các đường thẳng  $OB, OC$  nên  $AO \perp (OBC)$ . Kẻ các đường trung tuyến  $AD, OD$  tương ứng của các tam giác  $ABC, OBC$ .

Ta có  $\frac{MA}{MD} = 2 = \frac{NO}{ND}$ . Do đó,  $MN$  song song với  $AO$ .

Mặt khác,  $AO \perp (OBC)$  nên  $MN \perp (OBC)$ .

Hình 7.22

» **HĐ7.** Cho hai mặt phẳng  $(P)$  và  $(Q)$  song song với nhau và đường thẳng  $\Delta$  vuông góc với  $(P)$ . Gọi  $b$  là một đường thẳng bất kì thuộc  $(Q)$ . Lấy một đường thẳng  $a$  thuộc  $(P)$  sao cho  $a$  song song với  $b$  (H.7.23). So sánh  $(\Delta, b)$  và  $(\Delta, a)$ . Từ đó rút ra mối quan hệ giữa  $\Delta$  và  $(Q)$ .

Hình 7.23

» **HĐ8.** Cho hai mặt phẳng phân biệt  $(P)$  và  $(Q)$  cùng vuông góc với đường thẳng  $\Delta$ . Xét  $O$  là một điểm thuộc mặt phẳng  $(P)$  nhưng không thuộc mặt phẳng  $(Q)$ . Gọi  $(R)$  là mặt phẳng đi qua  $O$  và song song với  $(Q)$  (H.7.24).

a) Hỏi  $(R)$  có vuông góc với  $\Delta$  hay không? Nêu nhận xét về vị trí tương đối giữa  $(P)$  và  $(R)$ .

b) Nêu vị trí tương đối giữa  $(P)$  và  $(Q)$ .

Hình 7.24

- Nếu đường thẳng  $\Delta$  vuông góc với mặt phẳng  $(P)$  thì  $\Delta$  cũng vuông góc với các mặt phẳng song song với  $(P)$ .
- Hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau.

» **Ví dụ 5.** Cho hình chóp  $S.ABC$ . Các điểm  $M, N, P$  tương ứng là trung điểm của  $SA, SB, SC$ . Đường thẳng qua  $S$  vuông góc với mặt phẳng  $(ABC)$  và cắt mặt phẳng đó tại  $H$ . Chứng minh rằng  $SH \perp (MNP)$ .

**Giải.** (H.7.25)

Do  $MN \parallel AB, MP \parallel AC$  nên  $(MNP) \parallel (ABC)$ .

Mặt khác,  $SH \perp (ABC)$ . Do đó  $SH \perp (MNP)$ .

Hình 7.25

» **Luyện tập 2.** Một chiếc bàn có các chân cùng vuông góc với mặt phẳng chứa mặt bàn và mặt phẳng chứa mặt sàn. Hỏi hai mặt phẳng đó có song song với nhau hay không? Vì sao?

» **HĐ9.** Cho đường thẳng  $a$  song song với mặt phẳng  $(P)$  và đường thẳng  $\Delta$  vuông góc với mặt phẳng  $(P)$ . Tính  $(\Delta, a)$ .

**HĐ10.** Cho đường thẳng  $a$  và mặt phẳng  $(P)$  cùng vuông góc với một đường thẳng  $\Delta$ .

a) Qua một điểm  $O$  thuộc  $(P)$ , kẻ đường thẳng  $a'$  song song với  $a$ . Nêu vị trí tương đối giữa  $a'$  và  $(P)$ .

b) Nêu vị trí tương đối giữa  $a$  và  $(P)$ .

- Nếu đường thẳng  $\Delta$  vuông góc với mặt phẳng  $(P)$  thì  $\Delta$  vuông góc với mọi đường thẳng song song với  $(P)$ .
- Nếu đường thẳng  $a$  và mặt phẳng  $(P)$  cùng vuông góc với một đường thẳng  $\Delta$  thì  $a$  nằm trong  $(P)$  hoặc song song với  $(P)$ .

**Ví dụ 6.** Cho hình chóp  $S.ABCD$  có đáy  $ABCD$  là một hình vuông,  $SA \perp (ABCD)$ . Gọi  $M, N$  tương ứng là trung điểm của  $SB, BC$ . Chứng minh rằng  $BD \perp MN$ .

**Giải.** (H.7.26)

Do  $SA \perp (ABCD)$  nên  $BD \perp SA$ . Mặt khác,  $BD \perp AC$  nên  $BD \perp (SAC)$ . Ta lại có  $MN \parallel SC$  nên  $MN \parallel (SAC)$ . Do đó  $BD \perp MN$ .

**Luyện tập 4.** Cho hình chóp  $S.ABCD$  có đáy  $ABCD$  là một hình vuông,  $SA \perp (ABCD)$ . Kẻ  $AH$  vuông góc với  $SC$  ( $H$  thuộc  $SC$ ),  $BM$  vuông góc với  $SC$  ( $M$  thuộc  $SC$ ). Chứng minh rằng  $SC \perp (MBD)$  và  $AH \parallel (MBD)$ .

Hình 7.26

## Bài 24. Phép chiếu vuông góc.<br>Góc giữa đường thẳng và mặt phẳng

#### THUẬT NGỮ

- Phép chiếu vuông góc
- Hình chiếu vuông góc
- Định lí ba đường vuông góc

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết phép chiếu vuông góc.
- Xác định hình chiếu vuông góc của một điểm, một đường thẳng, một tam giác.
- Giải thích định lí ba đường vuông góc.
- Nhận biết và tính góc giữa đường thẳng và mặt phẳng trong một số trường hợp đơn giản.
- Vận dụng kiến thức về góc giữa đường thẳng và mặt phẳng để mô tả một số hình ảnh thực tế.

Vào khoảng thời gian giữa mùa hè, ở phía bắc của vòng Bắc Cực (như một số vùng phía bắc của Na Uy, Phần Lan, Nga,...), Mặt Trời có thể được nhìn thấy trong suốt 24 giờ của ngày. Hình học giải thích hiện tượng này như thế nào?

Hình 7.32. Mặt Trời lúc nửa đêm tại Nordkapp, Na Uy.

#### 1. PHÉP CHIẾU VUÔNG GÓC

» **HĐ1.** Trên sân phẳng có một cây cột thẳng vuông góc với mặt sân.

- Dưới ánh sáng mặt trời, bóng của cây cột trên sân có thể được nhìn như là hình chiếu của cây cột qua một phép chiếu song song hay không?
- Khi tia sáng mặt trời vuông góc với mặt sân, liệu ta có thể quan sát được bóng của cây cột trên sân hay không?

Hình 7.33

Phép chiếu song song lên mặt phẳng  $(P)$  theo phương  $\Delta$  vuông góc với  $(P)$  được gọi là phép chiếu vuông góc lên mặt phẳng  $(P)$ .

###### Chú ý

- Vì phép chiếu vuông góc lên một mặt phẳng là một trường hợp đặc biệt của phép chiếu song song nên nó có mọi tính chất của phép chiếu song song.
- Phép chiếu vuông góc lên mặt phẳng  $(P)$  còn được gọi đơn giản là phép chiếu lên mặt phẳng  $(P)$ . Hình chiếu vuông góc  $\mathcal{H}'$  của hình  $\mathcal{H}$  trên mặt phẳng  $(P)$  còn được gọi là hình chiếu của  $\mathcal{H}$  trên mặt phẳng  $(P)$ .

- a) Nếu  $A$  là một điểm không thuộc mặt phẳng  $(P)$  và  $A'$  là hình chiếu của  $A$  trên  $(P)$  thì đường thẳng  $AA'$  có quan hệ gì với mặt phẳng  $(P)$ ?
- b) Nếu đường thẳng  $a$  vuông góc với mặt phẳng  $(P)$  thì hình chiếu của  $a$  trên  $(P)$  là gì?

**HĐ2.** Cho đường thẳng  $a$  và mặt phẳng  $(P)$  không vuông góc với nhau. Xét  $b$  là một đường thẳng nằm trong  $(P)$ . Trên  $a$ , lấy hai điểm  $M, N$  tuỳ ý. Gọi  $M', N'$  tương ứng là hình chiếu của  $M, N$  trên mặt phẳng  $(P)$  (H.7.34).

- a) Hình chiếu của  $a$  trên mặt phẳng  $(P)$  là đường thẳng nào?
- b) Nếu  $b$  vuông góc với  $M'N'$  thì  $b$  có vuông góc với  $a$  hay không?
- c) Nếu  $b$  vuông góc với  $a$  thì  $b$  có vuông góc với  $M'N'$  hay không?

Hình 7.34

Định lí ba đường vuông góc:

Cho đường thẳng  $a$  và mặt phẳng  $(P)$  không vuông góc với nhau. Khi đó, một đường thẳng  $b$  nằm trong mặt phẳng  $(P)$  vuông góc với đường thẳng  $a$  khi và chỉ khi  $b$  vuông góc với hình chiếu vuông góc  $a'$  của  $a$  trên  $(P)$ .

Định lí ba đường vuông góc cho phép chuyển việc kiểm tra tính vuông góc giữa  $a$  và  $b$  (có thể chéo nhau) sang kiểm tra tính vuông góc giữa  $b$  và  $a'$  (cùng thuộc mặt phẳng  $(P)$ ).

**Ví dụ 1.** Trên một sân phẳng nằm ngang, tại các điểm  $A, B, C, D$ , người ta dựng các cột thẳng đứng  $AM, BN, CP, DQ$  và nối các sợi dây thẳng giữa  $M$  và  $P, N$  và  $Q$  như Hình 7.35.

- a) Hãy chỉ ra hình chiếu của các dây  $MP$  và  $NQ$  trên sân.
- b) Chứng minh rằng nếu  $BD \perp AC$  thì  $BD \perp MP$ .
- c) Chứng minh rằng nếu  $ABCD$  là một hình bình hành thì các trung điểm  $E, F$  tương ứng của các đoạn thẳng  $MP$  và  $NQ$  có cùng hình chiếu trên sân.

Hình 7.35

###### Giải

- a) Do các cột có phương thẳng đứng và sân thuộc mặt phẳng nằm ngang nên các cột vuông góc với sân. Vậy  $A, B, C, D$  tương ứng là hình chiếu của  $M, N, P, Q$  trên sân. Do đó  $AC, BD$  tương ứng là hình chiếu của  $MP, NQ$  trên sân.
- b) Nếu  $BD \perp AC$ , mà  $AC$  là hình chiếu của  $MP$  trên sân và  $BD$  thuộc sân nên theo định lý ba đường vuông góc ta có  $BD \perp MP$ .
- c) Nếu  $ABCD$  là một hình bình hành thì các đoạn thẳng  $AC, BD$  có chung trung điểm  $O$ . Do  $EO$  là đường trung bình của hình thang  $ACPM$  nên  $EO \parallel MA$ . Mặt khác,  $MA$  vuông góc với sân nên  $EO$  cũng vuông góc với sân. Vậy  $O$  là hình chiếu của  $E$  trên sân. Tương tự,  $O$  cũng là hình chiếu của  $F$  trên sân. Vậy  $E$  và  $F$  có cùng hình chiếu trên sân.

» **Luyện tập 1.** Cho hình chóp  $S.ABC$  có  $SA = SB = SC$ . Gọi  $O$  là hình chiếu của  $S$  trên mặt phẳng  $(ABC)$  (H.7.36).

- a) Chứng minh rằng  $O$  là tâm đường tròn ngoại tiếp tam giác  $ABC$ .
- b) Xác định hình chiếu của đường thẳng  $SA$  trên mặt phẳng  $(ABC)$ .
- c) Chứng minh rằng nếu  $AO \perp BC$  thì  $SA \perp BC$ .
- d) Xác định hình chiếu của các tam giác  $SBC, SCA, SAB$  trên mặt phẳng  $(ABC)$ .

Hình 7.36

#### 2. GÓC GIỮA ĐƯỜNG THẳng VÀ MẶT PHẪNG

» **HĐ3.** Một máy bay giữ vận tốc không đổi, với độ lớn 240 km/h trong suốt 2 phút đầu kể từ khi cất cánh. Hỏi thông tin trên có đủ để ta xác định độ cao của máy bay so với mặt đất phẳng, tại thời điểm 1 phút kể từ khi máy bay cất cánh không?

Hình 7.37

Nếu đường thẳng  $a$  vuông góc với mặt phẳng  $(P)$  thì ta nói rằng **góc giữa đường thẳng  $a$  và mặt phẳng  $(P)$  bằng  $90^\circ$ .**

Nếu đường thẳng  $a$  không vuông góc với mặt phẳng  $(P)$  thì góc giữa  $a$  và hình chiếu  $a'$  của nó trên  $(P)$  được gọi là góc giữa đường thẳng  $a$  và mặt phẳng  $(P)$ .

Hình 7.38

**Chú ý.** Nếu  $\alpha$  là góc giữa đường thẳng  $a$  và mặt phẳng  $(P)$  thì  $0 \leq \alpha \leq 90^\circ$ .

**Nhận xét.** Cho điểm  $A$  có hình chiếu  $H$  trên mặt phẳng  $(P)$ . Lấy điểm  $O$  thuộc mặt phẳng  $(P)$ ,  $O$  không trùng  $H$ . Khi đó góc giữa đường thẳng  $AO$  và mặt phẳng  $(P)$  bằng góc  $AOH$  (H.7.39).

Hình 7.39

» **Ví dụ 2.** Cho hình chóp  $S.ABC$  có  $SA \perp (ABC)$ ,  $SA = a$ ,  $CA = CB = a\sqrt{7}$ ,  $AB = 2a$ .

- Gọi  $\alpha$  là góc giữa  $SB$  và  $(ABC)$ . Tính  $\tan \alpha$ .
- Tính góc giữa  $SC$  và  $(SAB)$ .

**Giải.** (H.7.40)

- Do  $SA \perp (ABC)$  nên  $\alpha = \widehat{SBA}$ . Tam giác  $SAB$  vuông tại  $A$  nên

$$\tan \alpha = \tan \widehat{SBA} = \frac{SA}{AB} = \frac{a}{2a} = \frac{1}{2}.$$

- Gọi  $M$  là trung điểm của  $AB$ . Tam giác  $ABC$  cân tại  $C$  nên  $CM \perp AB$ .

Mặt khác, từ  $SA \perp (ABC)$  ta có  $CM \perp SA$ . Do đó  $CM \perp (SAB)$ .

Vậy góc giữa  $SC$  và  $(SAB)$  bằng  $\widehat{CSM}$ .

Tam giác  $SAC$  vuông tại  $A$  nên  $SC = \sqrt{SA^2 + AC^2} = \sqrt{a^2 + 7a^2} = a\sqrt{8}$ .

Ta có  $AM = \frac{1}{2}AB = a$ . Do đó, tam giác  $SAM$  vuông cân tại  $A$  và  $SM = a\sqrt{2}$ .

Tam giác  $CMS$  vuông tại  $M$  và  $\cos \widehat{CSM} = \frac{SM}{SC} = \frac{a\sqrt{2}}{a\sqrt{8}} = \frac{1}{2}$ .

Vậy  $\widehat{CSM} = 60^\circ$  và do đó góc giữa  $SC$  và  $(SAB)$  bằng  $60^\circ$ .

Hình 7.40

» **Vận dụng.** Tâm Trái Đất chuyển động quanh Mặt Trời theo quỹ đạo là một đường elip nhận tâm Mặt Trời làm tiêu điểm. Trong quá trình chuyển động, Trái Đất lại quay quanh trục Bắc Nam. Trục này có phương không đổi và luôn tạo với mặt phẳng chứa quỹ đạo một góc khoảng  $66,5^\circ$ . (Theo *nationalgeographic.org*).

a) Giải thích vì sao hình chiếu của trục Trái Đất trên mặt phẳng quỹ đạo ( $P$ ) cũng có phương không đổi.

b) Giải thích vì sao có hai thời điểm trong năm mà tại đó hình chiếu của trục Trái Đất trên mặt phẳng ( $P$ ) thuộc đường thẳng nối tâm Mặt Trời và tâm Trái Đất.

Hình 7.41

» **Khám phá.** Cho đường thẳng  $\Delta$  vuông góc với mặt phẳng ( $P$ ). Khi đó, với một đường thẳng  $a$  bất kì, góc giữa  $a$  và ( $P$ ) có mối quan hệ gì với góc giữa  $a$  và  $\Delta$ ?

Hình 7.42

» **Trải nghiệm.** Đo góc giữa một sợi dây kéo căng và mặt bàn hoặc sàn lớp học. (Có thể cho một đầu sợi dây thuộc mặt bàn, mặt sàn để thuận tiện hơn cho việc đo.)

## Bài 25. Hai mặt phẳng vuông góc

#### THUẬT NGỮ

- Góc giữa hai mặt phẳng
- Hai mặt phẳng vuông góc
- Góc nhị diện
- Góc phẳng của góc nhị diện
- Hình lăng trụ đứng, lăng trụ đều
- Hình hộp đứng
- Hình chóp đều, hình chóp cụt đều

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết góc giữa hai mặt phẳng, hai mặt phẳng vuông góc.
- Xác định điều kiện hai mặt phẳng vuông góc.
- Giải thích tính chất cơ bản của hai mặt phẳng vuông góc.
- Nhận biết góc phẳng của góc nhị diện, tính góc phẳng nhị diện trong một số trường hợp đơn giản.
- Giải thích tính chất cơ bản của hình chóp đều, hình lăng trụ đứng (và các trường hợp đặc biệt của nó).
- Vận dụng kiến thức của bài học để mô tả một số hình ảnh thực tế.

Ta có thể gắn cho mỗi vị trí trên Trái Đất một cặp số, được gọi là vĩ độ và kinh độ. Mỗi vị trí trên Trái Đất hoàn toàn xác định khi biết vĩ độ và kinh độ của nó. Sau bài học này, ta có thể hiểu và diễn đạt chính xác các khái niệm đó.

#### 1. GÓC GIỮA HAI MẶT PHẪNG, HAI MẶT PHẪNG VUÔNG GÓC

**HĐ1.** Cho hai mặt phẳng  $(P)$  và  $(Q)$ . Lấy hai đường thẳng  $a, a'$  cùng vuông góc với  $(P)$ , hai đường thẳng  $b, b'$  cùng vuông góc với  $(Q)$ . Tìm mối quan hệ giữa các góc  $(a, b)$  và  $(a', b')$ .

Hình 7.44

- Cho hai mặt phẳng  $(P)$  và  $(Q)$ . Lấy các đường thẳng  $a, b$  tương ứng vuông góc với  $(P), (Q)$ . Khi đó, góc giữa  $a$  và  $b$  không phụ thuộc vào vị trí của  $a, b$  và được gọi là **góc giữa hai mặt phẳng**  $(P)$  và  $(Q)$ .
- Hai mặt phẳng  $(P)$  và  $(Q)$  được gọi là **vuông góc với nhau** nếu góc giữa chúng bằng  $90^\circ$ .

**Chú ý.** Nếu  $\varphi$  là góc giữa hai mặt phẳng  $(P)$  và  $(Q)$  thì  $0 \leq \varphi \leq 90^\circ$ .

**?** Góc giữa hai mặt phẳng bằng  $0^\circ$  khi nào, khác  $0^\circ$  khi nào?

» **Ví dụ 1.** Cho hai mặt phẳng  $(P)$  và  $(Q)$  cắt nhau theo giao tuyến  $\Delta$ . Lấy một điểm  $O$  bất kì thuộc đường thẳng  $\Delta$ . Gọi  $m, n$  là các đường thẳng đi qua  $O$ , tương ứng thuộc  $(P), (Q)$  và vuông góc với  $\Delta$ . Chứng minh rằng góc giữa  $(P)$  và  $(Q)$  bằng góc giữa  $m$  và  $n$ .

**Giải.** (H.7.45)

Trong mặt phẳng chứa  $m, n$ , lấy một điểm  $E$  không thuộc các đường thẳng  $m, n$ . Gọi  $A, B$  tương ứng là hình chiếu của  $E$  trên  $m, n$ . Khi đó  $\Delta$  vuông góc với các đường thẳng  $EA, EB$ .

Do  $EA \perp m, EA \perp \Delta$  nên  $EA \perp (P)$ . Tương tự,  $EB \perp (Q)$ . Do đó, góc giữa  $(P)$  và  $(Q)$  bằng góc giữa  $EA$  và  $EB$ .

Do  $\widehat{OAE} = 90^\circ = \widehat{OBE}$  nên bốn điểm  $O, A, E, B$  thuộc một đường tròn. Do đó,  $\widehat{AOB}$  và  $\widehat{AEB}$  bằng hoặc bù nhau, tức là  $(EA, EB) = (m, n)$ . Vậy góc giữa  $(P)$  và  $(Q)$  bằng góc giữa  $m$  và  $n$ .

Hình 7.45

**Nhận xét.** (H.7.46) Cho hai mặt phẳng  $(P)$  và  $(Q)$  cắt nhau theo giao tuyến  $\Delta$ . Lấy hai đường thẳng  $m, n$  tương ứng thuộc  $(P), (Q)$  và cùng vuông góc với  $\Delta$  tại một điểm  $O$  (nói cách khác, lấy một mặt phẳng vuông góc với  $\Delta$ , cắt  $(P), (Q)$  tương ứng theo các giao tuyến  $m, n$ ). Khi đó, góc giữa  $(P)$  và  $(Q)$  bằng góc giữa  $m$  và  $n$ . Đặc biệt,  $(P)$  vuông góc với  $(Q)$  khi và chỉ khi  $m$  vuông góc với  $n$ .

Hình 7.46

» **Luyện tập 1.** Cho hình chóp  $S.ABCD$ , đáy  $ABCD$  là một hình chữ nhật có tâm  $O$ ,  $SO \perp (ABCD)$ . Chứng minh rằng hai mặt phẳng  $(SAC)$  và  $(SBD)$  vuông góc với nhau khi và chỉ khi  $ABCD$  là một hình vuông.

#### 2. ĐIỀU KIỆN HAI MẶT PHẪNG VUÔNG GÓC

» **HĐ2.** Cho mặt phẳng  $(P)$  chứa đường thẳng  $b$  vuông góc với mặt phẳng  $(Q)$ . Lấy một đường thẳng  $a$  vuông góc với  $(P)$  (H.7.47).

a) Tính góc giữa  $a$  và  $b$ .

b) Tính góc giữa  $(P)$  và  $(Q)$ .

Hình 7.47

Hai mặt phẳng vuông góc với nhau nếu mặt phẳng này chứa một đường thẳng vuông góc với mặt phẳng kia.

» **Ví dụ 2.** Cho tứ diện  $OABC$  có  $OA$  vuông góc với  $OB$  và  $OC$ . Chứng minh rằng các mặt phẳng  $(OAB)$  và  $(OAC)$  cùng vuông góc với mặt phẳng  $(OBC)$ .

**Giải**

Do  $OA$  vuông góc với  $OB$  và  $OC$  nên  $OA \perp (OBC)$ . Mặt khác, các mặt phẳng  $(OAB), (OAC)$  chứa  $OA$ . Do đó chúng cùng vuông góc với mặt phẳng  $(OBC)$ .

» **Luyện tập 2.** Trong HĐ1 của Bài 23, ta đã nhận ra rằng đường thẳng nối các bản lề của cửa phòng vuông góc với sàn nhà. Hãy giải thích vì sao trong quá trình đóng – mở, cánh cửa luôn vuông góc với sàn nhà.

#### 3. TÍNH CHẤT HAI MẶT PHẪNG VUÔNG GÓC

» **HĐ3.** Cho hai mặt phẳng  $(P)$  và  $(Q)$  vuông góc với nhau. Kẻ đường thẳng  $a$  thuộc  $(P)$  và vuông góc với giao tuyến  $\Delta$  của  $(P)$  và  $(Q)$ . Gọi  $O$  là giao điểm của  $a$  và  $\Delta$ . Trong mặt phẳng  $(Q)$ , gọi  $b$  là đường thẳng vuông góc với  $\Delta$  tại  $O$ .

a) Tính góc giữa  $a$  và  $b$ .

b) Tìm mối quan hệ giữa  $a$  và  $(Q)$ .

Hình 7.48

Với hai mặt phẳng vuông góc với nhau, bất kì đường thẳng nào nằm trong mặt phẳng này mà vuông góc với giao tuyến cũng vuông góc với mặt phẳng kia.

**Nhận xét.** Cho hai mặt phẳng  $(P)$  và  $(Q)$  vuông góc với nhau. Mỗi đường thẳng qua điểm  $O$  thuộc  $(P)$  và vuông góc với mặt phẳng  $(Q)$  thì đường thẳng đó thuộc mặt phẳng  $(P)$ .

» **HĐ4.** Cho hai mặt phẳng  $(P)$  và  $(Q)$  cắt nhau theo giao tuyến  $a$  và cùng vuông góc với mặt phẳng  $(R)$ . Gọi  $O$  là một điểm thuộc  $a$  và  $a'$  là đường thẳng qua  $O$  và vuông góc với  $(R)$ .

a) Hỏi  $a'$  có nằm trong các mặt phẳng  $(P)$ ,  $(Q)$  hay không?

b) Tìm mối quan hệ giữa  $a$  và  $a'$ .

c) Tìm mối quan hệ giữa  $a$  và  $(R)$ .

Hình 7.49

Nếu hai mặt phẳng cắt nhau và cùng vuông góc với một mặt phẳng thứ ba thì giao tuyến của chúng vuông góc với mặt phẳng thứ ba đó.

» **Ví dụ 3.** Cho hình chóp  $S.ABCD$  có đáy là hình chữ nhật và  $SA \perp (ABCD)$ . Gọi  $B', C', D'$  tương ứng là hình chiếu của  $A$  trên  $SB, SC, SD$ . Chứng minh rằng:

a)  $(SBC) \perp (SAB)$ ,  $AB' \perp (SBC)$ ,  $AD' \perp (SCD)$ .

b) Các điểm  $A, B', C', D'$  cùng thuộc một mặt phẳng.

**Giải.** (H.7.50)

a) Vì  $BC \perp SA$  và  $BC \perp AB$  nên  $BC \perp (SAB)$ . Do đó,  $(SBC) \perp (SAB)$ . Đường thẳng  $AB'$  thuộc  $(SAB)$  và vuông góc với  $SB$  nên  $AB' \perp (SBC)$ . Tương tự  $AD' \perp (SCD)$ .

b) Từ câu a ta có  $AB' \perp SC$ ,  $AD' \perp SC$ . Các đường thẳng  $AB', AC', AD'$  cùng đi qua  $A$  và vuông góc với  $SC$  nên cùng thuộc một mặt phẳng. Do đó bốn điểm  $A, B', C', D'$  cùng thuộc một mặt phẳng.

Hình 7.50

» **Luyện tập 3.** Với giả thiết như ở Ví dụ 3, chứng minh rằng:

- Các mặt phẳng  $(AB'C'D')$  và  $(ABCD)$  cùng vuông góc với  $(SAC)$ ;
- Giao tuyến của hai mặt phẳng  $(AB'C'D')$  và  $(ABCD)$  là đường thẳng đi qua  $A$ , nằm trong mặt phẳng  $(ABCD)$  và vuông góc với  $AC$ .

#### 4. GÓC NHỊ DIỆN

» **HĐ5.** Một tài liệu hướng dẫn rằng đối với ghế bàn ăn, nên thiết kế lưng ghế tạo với mặt ghế một góc có số đo từ  $100^\circ$  đến  $105^\circ$ . Trong Hình 7.51, các tia  $Ox$ ,  $Oy$  được vẽ tương ứng trên mặt ghế, lưng ghế đồng thời vuông góc với giao tuyến  $a$  của mặt ghế và lưng ghế.

- Theo tài liệu nói trên, góc nào trong hình nên có số đo từ  $100^\circ$  đến  $105^\circ$ ?
- Nếu thiết kế theo hướng dẫn đó thì góc giữa mặt phẳng chứa mặt ghế và mặt phẳng chứa lưng ghế có thể nhận số đo từ bao nhiêu đến bao nhiêu độ?

Hình 7.51

Hình gồm hai nửa mặt phẳng  $(P)$ ,  $(Q)$  có chung bờ  $a$  được gọi là một **góc nhị diện**, kí hiệu là  $[P, a, Q]$ . Đường thẳng  $a$  và các nửa mặt phẳng  $(P)$ ,  $(Q)$  tương ứng được gọi là **cạnh** và các mặt của góc nhị diện đó.

Hình 7.52

Mỗi đường thẳng  $a$  trong một mặt phẳng chia mặt phẳng thành hai phần, mỗi phần cùng với  $a$  là một nửa mặt phẳng bờ  $a$ .

Từ một điểm  $O$  bất kì thuộc cạnh  $a$  của góc nhị diện  $[P, a, Q]$ , vẽ các tia  $Ox$ ,  $Oy$  tương ứng thuộc  $(P)$ ,  $(Q)$  và vuông góc với  $a$ . Góc  $xOy$  được gọi là một **góc phẳng của góc nhị diện**  $[P, a, Q]$  (gọi tắt là **góc phẳng nhị diện**). Số đo của góc  $xOy$  không phụ thuộc vào vị trí của  $O$  trên  $a$ , được gọi là số đo của góc nhị diện  $[P, a, Q]$ .

Hình 7.53

Mặt phẳng chứa góc phẳng nhị diện  $xOy$  của  $[P, a, Q]$  vuông góc với cạnh  $a$ .

##### Chú ý

- Số đo của góc nhị diện có thể nhận giá trị từ  $0^\circ$  đến  $180^\circ$ . Góc nhị diện được gọi là vuông, nhọn, tù nếu nó có số đo tương ứng bằng, nhỏ hơn, lớn hơn  $90^\circ$ .
- Đối với hai điểm  $M, N$  không thuộc đường thẳng  $a$ , ta kí hiệu  $[M, a, N]$  là góc nhị diện có cạnh  $a$  và các mặt tương ứng chứa  $M, N$ .
- Hai mặt phẳng cắt nhau tạo thành bốn góc nhị diện. Nếu một trong bốn góc nhị diện đó là góc nhị diện vuông thì các góc nhị diện còn lại cũng là góc nhị diện vuông.

» **Ví dụ 4.** Cho hình chóp  $S.ABCD$  có  $SA \perp (ABCD)$ , đáy  $ABCD$  là hình thoi có cạnh bằng  $a$ ,  $AC = a$ ,  $SA = \frac{1}{2}a$ . Gọi  $O$  là giao điểm của hai đường chéo hình thoi  $ABCD$  và  $H$  là hình chiếu của  $O$  trên  $SC$ .

- a) Tính số đo của các góc nhị diện  $[B, SA, D]$ ;  $[S, BD, A]$ ;  $[S, BD, C]$ .  
 b) Chứng minh rằng  $\widehat{BHD}$  là một góc phẳng của góc nhị diện  $[B, SC, D]$ .

**Giải.** (H.7.54)

- a) Vì  $SA \perp (ABCD)$  nên  $AB$  và  $AD$  vuông góc với  $SA$ . Vậy  $\widehat{BAD}$  là một góc phẳng của góc nhị diện  $[B, SA, D]$ . Hình thoi  $ABCD$  có cạnh bằng  $a$  và  $AC = a$  nên các tam giác  $ABC, ACD$  đều. Do đó  $\widehat{BAD} = 120^\circ$ . Vậy số đo của góc nhị diện  $[B, SA, D]$  bằng  $120^\circ$ .  
 Vì  $BD \perp AC$  và  $BD \perp SA$  nên  $BD \perp (SAC)$ . Vậy  $AC$  và  $SO$  vuông góc với  $BD$ . Suy ra  $\widehat{AOS}$  là một góc phẳng của góc nhị diện  $[S, BD, A]$  và  $\widehat{COS}$  là một góc phẳng của góc nhị diện  $[S, BD, C]$ .

Tam giác  $SAO$  vuông tại  $A$  và có  $SA = \frac{1}{2}a = AO$  nên  $\widehat{AOS} = 45^\circ$ . Suy ra  $\widehat{COS} = 180^\circ - \widehat{AOS} = 135^\circ$ .

Vậy các góc nhị diện  $[S, BD, A]$ ,  $[S, BD, C]$  tương ứng có số đo là  $45^\circ$ ,  $135^\circ$ .

- b) Theo chứng minh trên,  $BD \perp (SAC)$  nên  $BD \perp SC$ . Mặt khác,  $OH \perp SC$  nên  $SC \perp (BOD)$ . Do đó,  $\widehat{BHD}$  là một góc phẳng của góc nhị diện  $[B, SC, D]$ .

Hình 7.54

» **Luyện tập 4.** Cho hình chóp  $S.ABC$  có  $SA \perp (ABC)$ ,  $AB = AC = a$ ,  $\widehat{BAC} = 120^\circ$ ,  $SA = \frac{a}{2\sqrt{3}}$ . Gọi  $M$  là trung điểm của  $BC$ .

- a) Chứng minh rằng  $\widehat{SMA}$  là một góc phẳng của góc nhị diện  $[S, BC, A]$ .  
 b) Tính số đo của góc nhị diện  $[S, BC, A]$ .

Hình 7.55

» **Vận dụng 1.** Trong cửa sổ ở Hình 7.56, cánh và khung cửa là các nửa hình tròn có đường kính 80 cm, bản lề được đính ở điểm chính giữa  $O$  của các cung tròn khung và cánh cửa. Khi cửa mở, đường kính của khung và đường kính của cánh song song với nhau và cách nhau một khoảng  $d$ ; khi cửa đóng, hai đường kính đó trùng nhau. Hãy tính số đo của góc nhị diện có hai nửa mặt phẳng tương ứng chứa cánh, khung cửa khi  $d = 40$  cm.

Trở lại vấn đề được nêu ở đầu bài học. Trên Trái Đất, mỗi kinh tuyến là một nửa đường tròn có đường kính là trục của Trái Đất (đoạn thẳng nối cực Bắc và cực Nam). Kinh tuyến gốc là kinh tuyến đi qua Đài Thiên văn Greenwich ở London. Mặt phẳng chứa kinh tuyến gốc chia Trái Đất làm hai nửa là Đông và Tây, nước ta nằm ở nửa Đông. Kinh độ của một điểm  $P$  trên Trái Đất là số đo của

Hình 7.56

góc nhị diện có hai cạnh tương ứng chứa kinh tuyến gốc và kinh tuyến đi qua  $P$  (cạnh của góc nhị diện này là trục Trái Đất). Do đó, các điểm trên cùng kinh tuyến thì có cùng kinh độ. Vĩ độ của điểm  $P$  là số đo của góc giữa mặt phẳng chứa đường xích đạo và đường thẳng nối  $P$  với tâm Trái Đất. Mỗi điểm trên Trái Đất sẽ thuộc một trong hai bán cầu Bắc hoặc Nam và thuộc nửa Đông hay nửa Tây. Vì vậy, đi kèm số đo vĩ độ còn có chữ  $E$  hoặc  $W$  nếu vị trí đó tương ứng thuộc nửa Đông, nửa Tây, và có chữ  $N$ ,  $S$  nếu vị trí đó tương ứng ở bán cầu Bắc, bán cầu Nam. Chẳng hạn, Bia Chủ quyền đảo Song Tử Tây thuộc xã Song Tử Tây, huyện Hoàng Sa, tỉnh Khánh Hòa, có vị trí:  $11^{\circ}25'55''N$ ,  $114^{\circ}8'00''E$ . (Theo baokhanhhoa.vn).

#### 5. MỘT SỐ HÌNH LĂNG TRỤ ĐẶC BIỆT

Trong chương IV, ta đã biết khái niệm hình lăng trụ. Với các kiến thức về quan hệ vuông góc, ta có thể định nghĩa một số hình lăng trụ đặc biệt sau đây.

##### a) Hình lăng trụ đứng

Hình lăng trụ đứng là hình lăng trụ có các cạnh bên vuông góc với mặt đáy.

» **HĐ4.** Các mặt bên của lăng trụ đứng là các hình gì và các mặt bên đó có vuông góc với mặt đáy không? Vì sao?

Hình lăng trụ đứng có các mặt bên là các hình chữ nhật và vuông góc với mặt đáy.

##### b) Hình lăng trụ đều

Hình lăng trụ đều là hình lăng trụ đứng có đáy là đa giác đều.

» **HĐ7.** Các mặt bên của hình lăng trụ đều có phải là các hình chữ nhật có cùng kích thước hay không? Vì sao?

Hình lăng trụ đều có các mặt bên là các hình chữ nhật có cùng kích thước.

##### c) Hình hộp đứng

Hình hộp đứng là hình lăng trụ đứng, có đáy là hình bình hành.

» **HĐ8.** Trong 6 mặt của hình hộp đứng, có ít nhất bao nhiêu mặt là hình chữ nhật? Vì sao?

Hình hộp đứng có các mặt bên là các hình chữ nhật.

##### d) Hình hộp chữ nhật

Hình hộp chữ nhật là hình hộp đứng có đáy là hình chữ nhật.

Hình 7.58

Hình 7.59

Hình 7.60

Hình 7.61

###### HD9

- a) Hình hộp chữ nhật có bao nhiêu mặt là hình chữ nhật? Vì sao?  
 b) Các đường chéo của hình hộp chữ nhật có bằng nhau và cắt nhau tại trung điểm mỗi đường hay không? Vì sao?

Hình hộp chữ nhật có các mặt bên là hình chữ nhật. Các đường chéo của hình hộp chữ nhật có độ dài bằng nhau và chúng cắt nhau tại trung điểm của mỗi đường.

- » **Ví dụ 5.** Cho hình hộp chữ nhật  $ABCD.A'B'C'D'$ . Chứng minh rằng  $AA'C'C$  là một hình chữ nhật.

**Giải.** (H.7.62)

Ta có  $AA' = CC'$  và  $AA' // CC'$  (vì  $AA'$ ,  $CC'$  cùng bằng và cùng song song với  $DD'$ ). Do đó  $ACC'A'$  là một hình bình hành.

Mặt khác,  $AA' \perp (A'B'C'D')$  nên  $AA' \perp A'C'$ . Do đó  $ACC'A'$  là một hình chữ nhật.

Hình 7.62

##### e) Hình lập phương

Hình lập phương là hình hộp chữ nhật có tất cả các cạnh bằng nhau.

- » **HD10.** Các mặt của một hình lập phương là các hình gì? Vì sao?

Hình lập phương có các mặt là các hình vuông.

Hình 7.63

**Chú ý.** Khi đáy của hình lăng trụ đứng (đều) là tam giác, tứ giác, ngũ giác,... đôi khi ta cũng tương ứng gọi rõ là hình lăng trụ đứng (đều) tam giác, tứ giác, ngũ giác,...

- » **Ví dụ 6.** Cho hình lập phương  $ABCD.A'B'C'D'$ . Chứng minh rằng  $A'BD$  là tam giác đều.

**Giải.** (H.7.64)

Gọi  $a$  là độ dài các cạnh của hình lập phương. Do các mặt của hình lập phương là các hình vuông nên

$$A'D = \sqrt{AA'^2 + AD^2} = a\sqrt{2};$$

$$BD = \sqrt{AB^2 + AD^2} = a\sqrt{2};$$

$$A'B = \sqrt{AA'^2 + AB^2} = a\sqrt{2}.$$

Tam giác  $A'BD$  có ba cạnh bằng nhau nên là tam giác đều.

Hình 7.64

- » **Vận dụng 2.** Từ một tấm tôn hình chữ nhật, tại 4 góc bác Hùng cắt bỏ đi 4 hình vuông có cùng kích thước và sau đó hàn gắn các mép tại các góc như Hình 7.65. Giải thích vì sao bằng cách đó, bác Hùng nhận được chiếc thùng không nắp có dạng hình hộp chữ nhật.

Hình 7.65

#### 6. HÌNH CHÓP ĐỀU VÀ HÌNH CHÓP CỤT ĐỀU

- » **HĐ11.** Tháp lớn tại Bảo tàng Louvre ở Paris (H.7.66) (với kết cấu kính và kim loại) có dạng hình chóp với đáy là hình vuông có cạnh bằng 34 m, các cạnh bên bằng nhau và có độ dài xấp xỉ 32,3 m (theo Wikipedia.org).

Giải thích vì sao hình chiếu của đỉnh trên đáy là tâm của đáy tháp.

Hình 7.66

**Hình chóp đều** là hình chóp có đáy là đa giác đều và các cạnh bên bằng nhau.

**Chú ý.** Tương tự như đối với hình chóp, khi đáy của hình chóp đều là tam giác đều, hình vuông, ngũ giác đều,... đôi khi ta cũng gọi rõ chúng tương ứng là chóp tam giác đều, tứ giác đều, ngũ giác đều,...

- » **HĐ12.** Cho hình chóp  $S.A_1A_2\dots A_n$ . Gọi  $O$  là hình chiếu của  $S$  trên mặt phẳng  $(A_1A_2\dots A_n)$ .

- Trong trường hợp hình chóp đã cho là đều, vị trí của điểm  $O$  có gì đặc biệt đối với tam giác đều  $A_1A_2\dots A_n$ ?
- Nếu đa giác  $A_1A_2\dots A_n$  là đều và  $O$  là tâm của đa giác đó thì hình chóp đã cho có gì đặc biệt?

Hình 7.67

Một hình chóp là đều khi và chỉ khi đáy của nó là một hình đa giác đều và hình chiếu của đỉnh trên mặt phẳng đáy là tâm của mặt đáy.

- » **Ví dụ 7.** Chứng minh rằng một hình chóp là đều khi và chỉ khi đáy của nó là một đa giác đều và các cạnh bên tạo với mặt phẳng đáy các góc bằng nhau.

**Giải.** (H.7.68)

Xét hình chóp  $S.A_1A_2\dots A_n$ . Gọi  $O$  là hình chiếu của  $S$  trên mặt phẳng đáy.

Giả sử hình chóp là đều, khi đó  $O$  là tâm của đa giác đều  $A_1A_2\dots A_n$ . Các tam giác  $SOA_1, SOA_2, \dots, SOA_n$  đều vuông tại  $O$ , có chung cạnh  $SO$  và có các cạnh  $OA_1, OA_2, \dots, OA_n$  bằng nhau, do đó chúng bằng nhau. Vậy  $\widehat{SA_1O} = \widehat{SA_2O} = \dots = \widehat{SA_nO}$ , tức là các cạnh bên của hình chóp tạo với mặt phẳng đáy các góc bằng nhau.

Ngược lại, giả sử hình chóp có đáy là đa giác đều và các cạnh bên tạo với mặt phẳng đáy các góc bằng nhau. Khi đó,  $\widehat{SA_1O} = \widehat{SA_2O} = \dots = \widehat{SA_nO}$ . Từ đó suy ra các tam giác vuông  $SOA_1, SOA_2, \dots, SOA_n$  bằng nhau. Do đó,  $SA_1 = SA_2 = \dots = SA_n$ . Mặt khác,  $A_1A_2\dots A_n$  là đa giác đều, do đó  $S.A_1A_2\dots A_n$  là hình chóp đều.

Hình 7.68

- » **Luyện tập 5.** Cho hình chóp tam giác đều  $S.ABC$ , cạnh đáy bằng  $a$ , cạnh bên bằng  $a\sqrt{\frac{5}{12}}$ . Tính số đo của góc nhị diện  $[S, BC, A]$ .

**HĐ13.** Cho hình chóp đều  $S.A_1A_2\dots A_n$ . Một mặt phẳng không đi qua  $S$  và song song với mặt phẳng đáy, cắt các cạnh  $SA_1, SA_2, \dots, SA_n$  tương ứng tại  $B_1, B_2, \dots, B_n$ .

a) Giải thích vì sao  $S.B_1B_2\dots B_n$  là một hình chóp đều.

b) Gọi  $H$  là tâm của đa giác  $A_1A_2\dots A_n$ . Chứng minh rằng đường thẳng  $SH$  đi qua tâm  $K$  của đa giác đều  $B_1B_2\dots B_n$  và  $HK$  vuông góc với các mặt phẳng  $(A_1A_2\dots A_n)$ ,  $(B_1B_2\dots B_n)$ .

Hình 7.69

Hình 7.70

- Hình gồm các đa giác đều  $A_1A_2\dots A_n$ ,  $B_1B_2\dots B_n$  và các hình thang cân  $A_1A_2B_1B_2$ ,  $A_2A_3B_2B_3, \dots, A_nA_1B_1B_n$  được tạo thành như trong HĐ13 được gọi là một **hình chóp cụt đều** (nói đơn giản là hình chóp cụt được tạo thành từ hình chóp đều  $S.A_1A_2\dots A_n$  sau khi cắt đi chóp đều  $S.B_1B_2\dots B_n$ ), kí hiệu là  $A_1A_2\dots A_nB_1B_2\dots B_n$ .
- Các đa giác  $A_1A_2\dots A_n$ ,  $B_1B_2\dots B_n$  được gọi là hai **mặt đáy**, các hình thang  $A_1A_2B_2B_1$ ,  $A_2A_3B_3B_2, \dots, A_nA_1B_1B_n$  được gọi là các **mặt bên** của hình chóp cụt. Các đoạn thẳng  $A_1B_1, A_2B_2, \dots, A_nB_n$  được gọi là các **cạnh bên**; các cạnh của mặt đáy được gọi là các **cạnh đáy** của hình chóp cụt.
- Đoạn thẳng  $HK$  nối hai tâm của đáy được gọi là **đường cao** của hình chóp cụt đều. Độ dài của đường cao được gọi là **chiều cao** của hình chóp cụt.

#### VỚI CUỘC SỐNG

**?** Hình chóp cụt đều có các cạnh bên bằng nhau hay không?

**Ví dụ 8.** Cho hình chóp cụt đều  $ABC.A'B'C'$  có chiều cao bằng  $h$ , các đáy là các tam giác đều  $ABC$ ,  $A'B'C'$  có cạnh tương ứng là  $a$ ,  $a'$  ( $a > a'$ ). Tính độ dài các cạnh bên của hình chóp cụt.

**Giải.** (H.7.71)

Gọi  $H, H'$  tương ứng là tâm của các tam giác  $ABC, A'B'C'$ .

Khi đó,  $HH'$  vuông góc với hai đáy của hình chóp cụt.

Trong tam giác đều  $ABC$ , ta có  $HA = \frac{a}{\sqrt{3}}$ .

Trong tam giác đều  $A'B'C'$ , ta có  $H'A' = \frac{a'}{\sqrt{3}}$ .

Hình thang  $AHH'A'$  vuông tại  $H$  và  $H'$ . Kẻ  $A'M \perp HA$  ( $M \in HA$ ).

Hình 7.71

$$\text{Ta có } AA' = \sqrt{A'M^2 + MA^2} = \sqrt{H'H^2 + (HA - H'A')^2} = \sqrt{h^2 + \left(\frac{a}{\sqrt{3}} - \frac{a'}{\sqrt{3}}\right)^2} = \sqrt{h^2 + \frac{(a - a')^2}{3}}.$$

Vậy các cạnh bên của chóp cụt có độ dài bằng  $\sqrt{h^2 + \frac{(a - a')^2}{3}}$ .

## Bài 26. Khoảng cách

#### **THUẬT NGỮ**

- Khoảng cách
- Chiều cao của hình chóp, hình lăng trụ
- Đường vuông góc chung

#### **KIẾN THỨC, KĨ NĂNG**

- Xác định khoảng cách giữa các đối tượng điểm, đường thẳng, mặt phẳng trong không gian.
- Xác định đường vuông góc chung của hai đường thẳng chéo nhau trong các trường hợp đơn giản.
- Vận dụng kiến thức về khoảng cách vào một số tình huống thực tế.

Khoảng cách là khái niệm được dùng trong nhiều lĩnh vực của đời sống. Trong bài học này ta tìm hiểu về khoảng cách giữa điểm, đường thẳng, mặt phẳng.

Hình 7.73. Các đầu phun nước chữa cháy sprinkler cần được lắp đặt theo tiêu chuẩn kĩ thuật, trong đó có tiêu chuẩn về khoảng cách tới từng loại trần, tường, nhà.

#### **1. KHOẢNG CÁCH TỪ MỘT ĐIỂM ĐẾN MỘT ĐƯỜNG THẳng, ĐẾN MỘT MẶT PHẪNG**

##### **HĐ1**

- a) Cho điểm  $M$  và đường thẳng  $a$ . Gọi  $H$  là hình chiếu của  $M$  trên  $a$ . Với mỗi điểm  $K$  thuộc  $a$ , giải thích vì sao  $MK \geq MH$  (H.7.74).
- b) Cho điểm  $M$  và mặt phẳng  $(P)$ . Gọi  $H$  là hình chiếu của  $M$  trên  $(P)$ . Với mỗi điểm  $K$  thuộc  $(P)$ , giải thích vì sao  $MK \geq MH$  (H.7.75).

Hình 7.74

Hình 7.75

- **Khoảng cách** từ một điểm  $M$  đến một đường thẳng  $a$ , kí hiệu  $d(M, a)$ , là khoảng cách giữa  $M$  và hình chiếu  $H$  của  $M$  trên  $a$ .
- **Khoảng cách** từ một điểm  $M$  đến một mặt phẳng  $(P)$ , kí hiệu  $d(M, (P))$ , là khoảng cách giữa  $M$  và hình chiếu  $H$  của  $M$  trên  $(P)$ .

**Chú ý.**  $d(M, a) = 0$  khi và chỉ khi  $M \in a$ ;  $d(M, (P)) = 0$  khi và chỉ khi  $M \in (P)$ .

**Nhận xét.** Khoảng cách từ  $M$  đến đường thẳng  $a$  (mặt phẳng  $(P)$ ) là khoảng cách nhỏ nhất giữa  $M$  và một điểm thuộc  $a$  (thuộc  $(P)$ ).

**Chú ý.** Khoảng cách từ đỉnh đến mặt phẳng chứa mặt đáy của một hình chóp được gọi là chiều cao của hình chóp đó.

» **Ví dụ 1.** Cho hình chóp đều  $S.ABC$ . Biết độ dài cạnh đáy, cạnh bên tương ứng bằng  $a, b$  ( $a < b\sqrt{3}$ ). Tính chiều cao của hình chóp.

**Giải.** (H.7.76)

Hình chiếu của  $S$  trên mặt phẳng  $(ABC)$  là tâm  $O$  của tam giác đều  $ABC$ . Trong tam giác đều  $ABC$ ,

ta có  $OA = \frac{a}{\sqrt{3}}$ . Trong tam giác vuông  $SOA$ , ta có

$$SO = \sqrt{SA^2 - OA^2} = \sqrt{b^2 - \frac{a^2}{3}}.$$

Vậy chiều cao của hình chóp là  $SO = \sqrt{b^2 - \frac{a^2}{3}}$ .

Hình 7.76

» **Luyện tập 1.** Cho hình lăng trụ đứng  $ABC.A'B'C'$  có  $ABC$  là tam giác vuông cân tại  $A$ ,  $AB = a, AA' = h$  (H.7.77).

a) Tính khoảng cách từ  $A$  đến mặt phẳng  $(BCC'B')$ .

b) Tam giác  $ABC'$  là tam giác gì? Tính khoảng cách từ  $A$  đến  $BC'$ .

Hình 7.77

#### 2. KHOẢNG CÁCH GIỮA CÁC ĐƯỜNG THẳng VÀ MẶT PHẪNG SONG SONG, GIỮA HAI MẶT PHẪNG SONG SONG

» **HĐ2.** Cho đường thẳng  $a$  song song với mặt phẳng  $(P)$ . Lấy hai điểm  $M, N$  bất kì thuộc  $a$  và gọi  $A, B$  tương ứng là các hình chiếu của chúng trên  $(P)$  (H.7.78).

Giải thích vì sao  $ABNM$  là một hình chữ nhật và  $M, N$  có cùng khoảng cách đến  $(P)$ .

Hình 7.78

Khoảng cách giữa đường thẳng  $a$  và mặt phẳng  $(P)$  song song với  $a$ , kí hiệu  $d(a, (P))$ , là khoảng cách từ một điểm bất kì trên  $a$  đến  $(P)$ .

**HĐ3.** a) Cho hai đường thẳng  $m$  và  $n$  song song với nhau. Khi một điểm  $M$  thay đổi trên  $m$  thì khoảng cách từ nó đến đường thẳng  $n$  có thay đổi hay không?

b) Cho hai mặt phẳng song song  $(P)$  và  $(Q)$  và một điểm  $M$  thay đổi trên  $(P)$  (H.7.79). Hỏi khoảng cách từ  $M$  đến  $(Q)$  thay đổi thế nào khi  $M$  thay đổi.

Hình 7.79

- Khoảng cách giữa hai mặt phẳng song song  $(P)$  và  $(Q)$ , kí hiệu  $d((P), (Q))$ , là khoảng cách từ một điểm bất kì thuộc mặt phẳng này đến mặt phẳng kia.
- Khoảng cách giữa hai đường thẳng song song  $m$  và  $n$ , kí hiệu  $d(m, n)$ , là khoảng cách từ một điểm thuộc đường thẳng này đến đường thẳng kia.

**?** Nếu đường thẳng  $a$  thuộc mặt phẳng  $(P)$  và mặt phẳng  $(Q)$  song song với  $(P)$  thì giữa  $d(a, (Q))$  và  $d((P), (Q))$  có mối quan hệ gì?

**Chú ý.** Khoảng cách giữa hai đáy của một hình lăng trụ được gọi là **chiều cao của hình lăng trụ** đó.

**Ví dụ 2.** Cho một hình hộp đứng  $ABCD.A'B'C'D'$ , đáy là các hình thoi có cạnh bằng  $a$ ,  $\widehat{BAD} = 120^\circ$ ,  $AA' = h$ . Tính các khoảng cách giữa  $A'C'$  và  $(ABCD)$ ,  $AA'$  và  $(BDD'B')$ .

**Giải.** (H.7.80)

Đường thẳng  $A'C'$  thuộc mặt phẳng  $(A'B'C'D')$  nên nó song song với mặt phẳng  $(ABCD)$ . Do  $ABCD.A'B'C'D'$  là hình hộp đứng nên  $A'A \perp (ABCD)$ .

Vậy  $d(A'C', (ABCD)) = d(A', (ABCD)) = A'A = h$ .

Do  $AA'$  song song với  $BB'$  nên  $AA'$  song song với  $(BDD'B')$ . Gọi  $O$  là tâm của hình thoi  $ABCD$ . Do  $AO \perp BD$  và  $AO \perp BB'$  nên  $AO \perp (BDD'B')$ . Vậy khoảng cách giữa  $AA'$  và  $(BDD'B')$  bằng độ dài đoạn thẳng  $AO$ .

Tam giác  $BAD$  cân tại  $A$  và có  $\widehat{BAD} = 120^\circ$  nên  $\widehat{ABO} = 30^\circ$ .

Do đó, trong tam giác vuông  $AOB$ , ta có  $AO = \frac{1}{2}AB = \frac{a}{2}$ .

Vậy khoảng cách giữa  $AA'$  và  $(BDD'B')$  bằng  $\frac{a}{2}$ .

Hình 7.80

**Luyện tập 2.** Cho hình chóp  $S.ABC$  có  $SA \perp (ABC)$ ,  $SA = h$ . Gọi  $M, N, P$  tương ứng là trung điểm của  $SA, SB, SC$ .

a) Tính  $d((MNP), (ABC))$  và  $d(NP, (ABC))$ .

b) Giả sử tam giác  $ABC$  vuông tại  $B$  và  $AB = a$ .

Tính  $d(A, (SBC))$ .

Hình 7.81

» **Vận dụng.** Ở một con dốc lên cầu, người ta đặt một khung khống chế chiều cao, hai cột của khung có phương thẳng đứng và có chiều dài bằng 2,28 m. Đường thẳng nối hai chân cột vuông góc với hai đường mép dốc. Thanh ngang được đặt trên đỉnh hai cột. Biết dốc nghiêng  $15^\circ$  so phương nằm ngang. Tính khoảng cách giữa thanh ngang của khung và mặt đường (theo đơn vị mét và làm tròn kết quả đến chữ số thập phân thứ hai). Hỏi cầu này có cho phép xe cao 2,21 m đi qua hay không?

Hình 7.82. Tại đầu một số cầu vượt ta có thể bắt gặp khung khống chế chiều cao.

#### 3. KHOẢNG CÁCH GIỮA HAI ĐƯỜNG THẲNG CHÉO NHAU

» **HĐ4.** Cho hai đường thẳng chéo nhau  $a$  và  $b$ . Gọi  $(Q)$  là mặt phẳng chứa đường thẳng  $b$  và song song với  $a$ . Hình chiếu  $a'$  của  $a$  trên  $(Q)$  cắt  $b$  tại  $N$ . Gọi  $M$  là hình chiếu của  $N$  trên  $a$  (H.7.83).

Hình 7.83

- Mặt phẳng chứa  $a$  và  $a'$  có vuông góc với  $(Q)$  hay không?
- Đường thẳng  $MN$  có vuông góc với cả hai đường thẳng  $a$  và  $b$  hay không?
- Nêu mối quan hệ của khoảng cách giữa  $a$ ,  $(Q)$  và độ dài đoạn thẳng  $MN$ .

Đường thẳng  $\Delta$  cắt hai đường thẳng chéo nhau  $a$ ,  $b$  và vuông góc với cả hai đường thẳng đó được gọi là **đường vuông góc chung** của  $a$  và  $b$ .

Nếu đường vuông góc chung  $\Delta$  cắt  $a$ ,  $b$  tương ứng tại  $M$ ,  $N$  thì độ dài đoạn thẳng  $MN$  được gọi là **khoảng cách giữa hai đường thẳng chéo nhau**  $a$ ,  $b$ .

Hình 7.84

##### Nhận xét

- Khoảng cách giữa hai đường thẳng chéo nhau bằng khoảng cách giữa một trong hai đường thẳng đó đến mặt phẳng song song với nó và chứa đường thẳng còn lại (H.7.85).
- Khoảng cách giữa hai đường thẳng chéo nhau bằng khoảng cách giữa hai mặt phẳng song song, tương ứng chứa hai đường thẳng đó (H.7.86).

Hình 7.85

Hình 7.86

» **Ví dụ 3.** Cho hình chóp  $S.ABC$  có  $SA \perp (ABC)$ ,  $AB = a$ ,  $\widehat{ABC} = 60^\circ$ . Xác định đường vuông góc chung và tính khoảng cách giữa hai đường thẳng  $SA$  và  $BC$ .

**Giải.** (H.7.87)

Gọi  $H$  là hình chiếu của  $A$  trên  $BC$ . Tam giác  $ABH$  vuông tại  $H$  và có  $AB = a$ ,  $\widehat{ABH} = 60^\circ$  nên  $BH = \frac{a}{2}$ .

Do  $SA$  vuông góc với mặt phẳng  $(ABC)$  nên  $AH$  là đường vuông góc chung của  $SA$  và  $BC$  ( $H$  thuộc tia  $BC$  và  $BH = \frac{a}{2}$ ).

Khoảng cách giữa hai đường thẳng  $SA$  và  $BC$  là

$$d(SA, BC) = AH = \frac{a\sqrt{3}}{2}.$$

Hình 7.87

» **Khám phá.** Cho đường thẳng  $a$  vuông góc với mặt phẳng  $(P)$  và cắt  $(P)$  tại  $O$ . Cho đường thẳng  $b$  thuộc mặt phẳng  $(P)$ . Hãy tìm mối quan hệ giữa khoảng cách giữa  $a, b$  và khoảng cách từ  $O$  đến  $b$  (H.7.88).

Hình 7.88

» **Luyện tập 3.** Cho hình chóp  $S.ABCD$  có đáy là hình vuông cạnh  $a$ ,  $SA \perp (ABCD)$ ,  $SA = a\sqrt{2}$ .

- Tính khoảng cách từ  $A$  đến  $SC$ .
- Chứng minh rằng  $BD \perp (SAC)$ .
- Xác định đường vuông góc chung và tính khoảng cách giữa  $BD$  và  $SC$ .

Hình 7.89

» **Thảo luận.** Khoảng cách giữa hai hình được nêu trong bài học (điểm, đường thẳng, mặt phẳng) là khoảng cách nhỏ nhất giữa một điểm thuộc hình này và một điểm thuộc hình kia. Hãy thảo luận để làm rõ nhận xét này.

## Bài 27. Thể tích

#### **THUẬT NGỮ**

- Thể tích khối hộp
- Thể tích khối lăng trụ
- Thể tích khối chóp
- Thể tích khối chóp cụt

#### **KIẾN THỨC, KĨ NĂNG**

- Nhận biết công thức tính thể tích của khối chóp, khối lăng trụ, khối hộp, khối chóp cụt đều.
- Tính thể tích của khối chóp, khối lăng trụ, khối hộp, khối chóp cụt đều trong một số tình huống đơn giản.
- Vận dụng kiến thức, kĩ năng về thể tích vào một số bài toán thực tế.

**Thể tích** là một trong những khái niệm toán học xuất hiện thường xuyên trong cuộc sống, đo sự chiếm chỗ của vật thể trong không gian. Bài học này đưa ra công thức thể tích của các hình khối ứng với các hình mà ta đã học.

**H01.** Khi mua máy điều hoà, bác An được hướng dẫn rằng mỗi mét khối của phòng cần công suất điều hoà khoảng 200 BTU. Căn phòng bác An cần lắp máy có dạng hình hộp chữ nhật, rộng 4 m, dài 5 m và cao 3 m. Hỏi bác An cần mua loại điều hoà có công suất bao nhiêu BTU?

Hình 7.92

Phần không gian được giới hạn bởi hình chóp, hình chóp cụt đều, hình lăng trụ, hình hộp tương ứng được gọi là **khối chóp, khối chóp cụt đều, khối lăng trụ, khối hộp**. Đỉnh, mặt, cạnh, đường cao của các khối hình đó lần lượt là đỉnh, mặt, cạnh, đường cao của hình chóp, hình chóp cụt đều, hình lăng trụ, hình hộp tương ứng.

- Thể tích của khối chóp có diện tích đáy **S** và chiều cao **h** là  $V = \frac{1}{3} \cdot h \cdot S$ .
- Thể tích của khối chóp cụt đều có diện tích đáy lớn **S**, diện tích đáy bé **S'** và chiều cao **h** là  $V = \frac{1}{3} \cdot h \cdot (S + S' + \sqrt{S \cdot S'})$ .
- Thể tích của khối lăng trụ có diện tích đáy **S** và chiều cao **h** là  $V = h \cdot S$ .

$$V = \frac{1}{3} \cdot h \cdot S$$

$$V = \frac{1}{3} \cdot h \cdot (S + S' + \sqrt{S \cdot S'})$$

$$V = h \cdot S$$

Hình 7.93

##### Nhận xét

- Thể tích khối tứ diện bằng một phần ba tích của chiều cao từ một đỉnh và diện tích mặt đối diện với đỉnh đó.
- Thể tích của khối hộp bằng tích của diện tích một mặt và chiều cao của khối hộp ứng với mặt đó.

» **Ví dụ 1.** Cho khối tứ diện  $OABC$  có các cạnh  $OA, OB, OC$  đôi một vuông góc với nhau và  $OA = a, OB = b, OC = c$ . Tính thể tích của khối tứ diện.

**Giải.** (H.7.94)

Tam giác vuông  $OBC$  có diện tích là  $S_{OBC} = \frac{1}{2}bc$ .

$OA$  vuông góc với mặt phẳng  $(OBC)$  nên tứ diện  $OABC$  có chiều cao ứng với đỉnh  $A$  bằng  $OA$ .

Vậy thể tích của khối tứ diện là  $V_{OABC} = \frac{1}{3}AO \cdot S_{OBC} = \frac{1}{6}abc$ .

Hình 7.94

» **Luyện tập 1.** Cho khối chóp đều  $S.ABCD$  có cạnh đáy bằng  $a$ , cạnh bên bằng  $b$ . Tính thể tích của khối chóp.

» **Ví dụ 2.** Cho khối lăng trụ  $ABC.A'B'C'$  có đáy là các tam giác đều cạnh  $a$ , mặt  $(ACC'A')$  vuông góc với hai mặt đáy, tam giác  $A'AC$  cân tại  $A$  và  $AA' = b$  ( $a < 2b$ ). Tính thể tích của khối lăng trụ.

**Giải.** (H.7.95)

Gọi  $A'H$  là đường cao của tam giác cân  $A'AC$ . Khi đó,  $H$  là trung điểm của  $AC$ .

Do  $(ACC'A') \perp (ABC)$  và  $A'H \perp AC$  nên  $A'H \perp (ABC)$ .

Vậy khối lăng trụ có chiều cao là  $A'H = \sqrt{AA'^2 - AH^2} = \sqrt{b^2 - \frac{a^2}{4}}$ .

Tam giác đều  $ABC$  có diện tích là  $S_{ABC} = \frac{a^2\sqrt{3}}{4}$ .

Vậy khối lăng trụ có thể tích là  $V = A'H \cdot S_{ABC} = \sqrt{b^2 - \frac{a^2}{4}} \cdot \frac{a^2\sqrt{3}}{4} = \frac{a^2\sqrt{3(4b^2 - a^2)}}{8}$ .

Hình 7.95

» **Luyện tập 2.** Cho khối chóp cụt đều  $ABC.A'B'C'$  có đường cao  $HH' = h$ , hai mặt đáy  $ABC, A'B'C'$  có cạnh tương ứng bằng  $2a, a$ .

a) Tính thể tích của khối chóp cụt.

b) Gọi  $B_1, C_1$  tương ứng là trung điểm của  $AB, AC$ . Chứng minh rằng  $AB_1C_1.A'B'C'$  là một hình lăng trụ. Tính thể tích khối lăng trụ  $AB_1C_1.A'B'C'$ .

Hình 7.96

» **Ví dụ 3.** Cho khối hộp  $ABCD.A'B'C'D'$  có  $AB = 8$  cm,  $AD = 5$  cm,  $AA' = 6$  cm,  $\widehat{BAD} = 30^\circ$ , góc giữa  $AA'$  và  $(ABCD)$  bằng  $45^\circ$ . Tính thể tích của khối hộp.

**Giải.** (H.7.97)

Hình bình hành  $ABCD$  có diện tích là

$$S_{ABCD} = 2S_{ABD} = 2\left(\frac{1}{2}AB \cdot AD \sin \widehat{BAD}\right) = 20 \text{ (cm}^2\text{)}.$$

Gọi  $H$  là hình chiếu của  $A'$  trên  $(ABCD)$ . Khi đó,  $\widehat{A'AH}$  bằng góc giữa  $AA'$  và  $(ABCD)$  nên  $\widehat{A'AH} = 45^\circ$ . Trong tam giác vuông  $A'AH$ , ta có  $A'H = A'A \cdot \sin \widehat{A'AH} = \frac{6\sqrt{2}}{2} = 3\sqrt{2}$  (cm).

Khối hộp  $ABCD.A'B'C'D'$  có chiều cao tương ứng với mặt  $ABCD$  bằng  $A'H = 3\sqrt{2}$  (cm).

Do đó, thể tích của khối hộp là  $V = A'A \cdot S_{ABCD} = 60\sqrt{2}$  (cm<sup>3</sup>).

Hình 7.97

» **Vận dụng.** Một sọt đựng đồ có dạng hình chóp cụt đều (H.7.98). Đáy và miệng sọt là các hình vuông tương ứng có cạnh bằng 60 cm, 30 cm, cạnh bên của sọt dài 50 cm. Tính thể tích của sọt.

Hình 7.98

# CHƯƠNG VIII. CÁC QUY TẮC TÍNH XÁC SUẤT

## Bài 28. Biến cố hợp, biến cố giao, biến cố độc lập

#### THUẬT NGỮ

- Biến cố hợp
- Biến cố giao
- Biến cố độc lập

#### KIẾN THỨC, KĨ NĂNG

Nhận biết các khái niệm biến cố hợp, biến cố giao, biến cố độc lập.

Trong một cuộc khảo sát về mức sống của người Hà Nội, người khảo sát chọn ngẫu nhiên một gia đình ở Hà Nội. Xét các biến cố sau:

$M$ : "Gia đình đó có ti vi";

$N$ : "Gia đình đó có máy vi tính";

$E$ : "Gia đình đó có ti vi hoặc máy vi tính";

$F$ : "Gia đình đó có cả ti vi và máy vi tính";

$G$ : "Gia đình đó có ti vi hoặc máy vi tính nhưng không có cả hai thiết bị nói trên";

$H$ : "Gia đình đó không có cả ti vi và máy vi tính".

Các biến cố trên rõ ràng có mối liên hệ với nhau. Chúng ta có thể mô tả các mối liên hệ đó một cách cô đọng, súc tích bằng các khái niệm và kí hiệu toán học được không?

#### 1. BIẾN CỐ HỢP

» **HĐ1.** Một tổ trong lớp 11A có 10 học sinh. Điểm kiểm tra học kì I của 10 bạn này ở hai môn Toán và Ngữ văn được cho như sau:

| Tên học sinh \ Môn | Toán | Ngữ văn |
|--------------------|------|---------|
| Bảo                | 7    | 6       |
| Dung               | 5    | 9       |
| Định               | 5    | 6       |
| Lan                | 8    | 7       |
| Long               | 6    | 8       |
| Hương              | 9    | 7       |
| Phúc               | 8    | 6       |
| Cường              | 8    | 9       |
| Tuấn               | 4    | 5       |
| Trang              | 10   | 8       |

Điểm 8 trở lên là điểm giỏi.

Chọn ngẫu nhiên một học sinh trong tổ. Xét các biến cố sau:

A: "Học sinh đó được điểm giỏi môn Ngữ văn";

B: "Học sinh đó được điểm giỏi môn Toán";

C: "Học sinh đó được điểm giỏi môn Ngữ văn hoặc điểm giỏi môn Toán".

a) Mô tả không gian mẫu và các tập con A, B, C của không gian mẫu.

b) Tìm  $A \cup B$ .

Cho A và B là hai biến cố. Biến cố: "A hoặc B xảy ra" được gọi là **biến cố hợp** của A và B, kí hiệu là  $A \cup B$ .

Biến cố hợp của A và B là tập con  $A \cup B$  của không gian mẫu  $\Omega$ .

Hình 8.1

» **Ví dụ 1.** Một hộp đựng 15 tấm thẻ cùng loại được đánh số từ 1 đến 15. Rút ngẫu nhiên một tấm thẻ trong hộp. Gọi E là biến cố "Số ghi trên tấm thẻ là số lẻ"; F là biến cố "Số ghi trên tấm thẻ là số nguyên tố".

a) Mô tả không gian mẫu.

b) Nêu nội dung của biến cố hợp  $G = E \cup F$ . Hỏi G là tập con nào của không gian mẫu?

**Giải**

a) Không gian mẫu  $\Omega = \{1; 2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12; 13; 14; 15\}$ .

b)  $E \cup F$  là biến cố "Số ghi trên tấm thẻ là số lẻ hoặc số nguyên tố".

Ta có  $E = \{1; 3; 5; 7; 9; 11; 13; 15\}$ ;  $F = \{2; 3; 5; 7; 11; 13\}$ .

Vậy  $G = E \cup F = \{1; 2; 3; 5; 7; 9; 11; 13; 15\}$ .

» **Luyện tập 1.** Một tổ trong lớp 11B có 4 học sinh nữ là Hương, Hồng, Dung, Phương và 5 học sinh nam là Sơn, Tùng, Hoàng, Tiến, Hải. Trong giờ học, giáo viên chọn ngẫu nhiên một học sinh trong tổ đó lên bảng để kiểm tra bài.

Xét các biến cố sau:

$H$ : "Học sinh đó là một bạn nữ";

$K$ : "Học sinh đó có tên bắt đầu là chữ cái H".

a) Mô tả không gian mẫu.

b) Nêu nội dung của biến cố hợp  $M = H \cup K$ . Mỗi biến cố  $H$ ,  $K$ ,  $M$  là tập con nào của không gian mẫu?

#### 2. BIẾN CỐ GIAO

» **HĐ2.** Trở lại tình huống trong HĐ1. Xét biến cố  $D$ : "Học sinh đó được điểm giỏi môn Ngữ văn và điểm giỏi môn Toán".

a) Hỏi  $D$  là tập con nào của không gian mẫu?

b) Tìm  $A \cap B$ .

Cho  $A$  và  $B$  là hai biến cố. Biến cố: "Cả  $A$  và  $B$  đều xảy ra" được gọi là **biến cố giao** của  $A$  và  $B$ , kí hiệu là  $AB$ .

Biến cố giao của  $A$  và  $B$  là tập con  $A \cap B$  của không gian mẫu  $\Omega$ .

Hình 8.2

» **Ví dụ 2.** Một tổ trong lớp 11C có 9 học sinh. Phỏng vấn 9 bạn này với câu hỏi: "Bạn có biết chơi môn thể thao nào trong hai môn này không?". Nếu biết thì đánh dấu X vào ô ghi tên môn thể thao đó, không biết thì để trống. Kết quả thu được như sau:

| Tên học sinh | Môn thể thao | Cầu lông | Bóng bàn |
|--------------|--------------|----------|----------|
| Bảo          |              | X        |          |
| Đăng         |              | X        |          |
| Giang        |              |          | X        |
| Hoa          |              |          |          |
| Long         |              | X        | X        |
| Mai          |              |          |          |
| Phúc         |              | X        | X        |
| Tuấn         |              | X        | X        |
| Yến          |              | X        |          |

Chọn ngẫu nhiên một học sinh trong tổ. Xét các biến cố sau:

$U$ : "Học sinh được chọn biết chơi cầu lông";

$V$ : "Học sinh được chọn biết chơi bóng bàn".

a) Mô tả không gian mẫu.

b) Nội dung của biến cố giao  $T = UV$  là gì? Mỗi biến cố  $U$ ,  $V$ ,  $T$  là tập con nào của không gian mẫu?

**Giải**

a) Không gian mẫu  $\Omega = \{\text{Bảo; Đăng; Giang; Hoa; Long; Mai; Phúc; Tuấn; Yên}\}$ .

b)  $T$  là biến cố "Học sinh được chọn biết chơi cả cầu lông và bóng bàn".

Ta có:  $U = \{\text{Bảo; Đăng; Long; Phúc; Tuấn; Yên}\}$ ;  $V = \{\text{Giang; Long; Phúc; Tuấn}\}$ .

Vậy  $T = U \cap V = \{\text{Long; Phúc; Tuấn}\}$ .

» **Luyện tập 2.** Một hộp đựng 25 tấm thẻ cùng loại được đánh số từ 1 đến 25. Rút ngẫu nhiên một tấm thẻ trong hộp. Xét các biến cố  $P$ : "Số ghi trên tấm thẻ là số chia hết cho 4";  $Q$ : "Số ghi trên tấm thẻ là số chia hết cho 6".

a) Mô tả không gian mẫu.

b) Nội dung của biến cố giao  $S = PQ$  là gì? Mỗi biến cố  $P$ ,  $Q$ ,  $S$  là tập con nào của không gian mẫu?

» **Vận dụng.** Trở lại tình huống mở đầu. Sử dụng khái niệm biến cố hợp, biến cố giao, biến cố đối, ta biểu diễn biến cố  $G$ ,  $H$  theo các biến cố  $M$  và  $N$  như sau:

Biến cố  $G$  xảy ra khi và chỉ khi hoặc gia đình đó có ti vi và không có máy vi tính hoặc gia đình đó không có ti vi và có máy vi tính. Vậy  $G = \overline{MN} \cup \overline{MN}$ .

Biến cố  $H$  xảy ra khi và chỉ khi gia đình đó không có cả ti vi và máy vi tính. Vậy  $H = \overline{MN}$ .

Hãy biểu diễn mỗi biến cố  $E$ ,  $F$  theo các biến cố  $M$  và  $N$ .

#### 3. BIẾN CỐ ĐỘC LẬP

» **HĐ3.** Hai bạn Minh và Sơn, mỗi người gieo đồng thời một con xúc xắc cân đối, đồng chất. Xét hai biến cố sau:

A: "Số chấm xuất hiện trên con xúc xắc bạn Minh gieo là số chẵn";

B: "Số chấm xuất hiện trên con xúc xắc bạn Sơn gieo là số chia hết cho 3".

Việc xảy ra hay không xảy ra biến cố A có ảnh hưởng tới xác suất xảy ra của biến cố B không? Việc xảy ra hay không xảy ra biến cố B có ảnh hưởng tới xác suất xảy ra của biến cố A không?

Cặp biến cố A và B được gọi là **độc lập** nếu việc xảy ra hay không xảy ra của biến cố này không ảnh hưởng tới xác suất xảy ra của biến cố kia.

**Chú ý.** Nếu cặp biến cố A và B độc lập thì các cặp biến cố: A và  $\overline{B}$ ;  $\overline{A}$  và B;  $\overline{A}$  và  $\overline{B}$  cũng độc lập.

» **Ví dụ 3.** Một hộp đựng 4 viên bi màu đỏ và 5 viên bi màu xanh, có cùng kích thước và khối lượng.

- a) Bạn Minh lấy ngẫu nhiên một viên bi, ghi lại màu của viên bi được lấy ra rồi trả lại viên bi vào hộp. Tiếp theo, bạn Hùng lấy ngẫu nhiên một viên bi từ hộp đó. Xét hai biến cố sau:

A: "Minh lấy được viên bi màu đỏ";

B: "Hùng lấy được viên bi màu xanh".

Chứng tỏ rằng hai biến cố A và B độc lập.

- b) Bạn Sơn lấy ngẫu nhiên một viên bi và không trả lại vào hộp. Tiếp theo, bạn Tùng lấy ngẫu nhiên một viên bi từ hộp đó. Xét hai biến cố sau:

C: "Sơn lấy được viên bi màu đỏ";

D: "Tùng lấy được viên bi màu xanh".

Chứng tỏ rằng hai biến cố C và D không độc lập.

**Giải**

- a) Nếu A xảy ra, tức là Minh lấy được viên bi màu đỏ. Vì Minh trả lại viên bi đã lấy vào hộp nên trong hộp có 4 viên bi màu đỏ và 5 viên bi màu xanh. Vậy  $P(B) = \frac{5}{9}$ .

Nếu A không xảy ra, tức là Minh lấy được viên bi màu xanh. Vì Minh trả lại viên bi đã lấy vào hộp nên trong hộp vẫn có 4 viên bi màu đỏ và 5 viên bi màu xanh. Vậy  $P(B) = \frac{5}{9}$ .

Như vậy, xác suất xảy ra của biến cố B không thay đổi bởi việc xảy ra hay không xảy ra của biến cố A.

Vì Hùng lấy sau Minh nên  $P(A) = \frac{4}{9}$  dù biến cố B xảy ra hay không xảy ra.

Vậy A và B độc lập.

- b) Nếu C xảy ra, tức là Sơn lấy được viên bi màu đỏ. Vì Sơn không trả lại viên bi đó vào hộp nên trong hộp có 8 viên bi với 3 viên bi màu đỏ và 5 viên bi màu xanh. Vậy  $P(D) = \frac{5}{8}$ .

Nếu C không xảy ra, tức là Sơn lấy được viên bi màu xanh. Vì Sơn không trả lại viên bi đã lấy vào hộp nên trong hộp có 4 viên bi màu đỏ và 4 viên bi màu xanh. Vậy  $P(D) = \frac{4}{8}$ .

Như vậy, xác suất xảy ra của biến cố D đã thay đổi phụ thuộc vào việc biến cố C xảy ra hay không xảy ra. Do đó, hai biến cố C và D không độc lập.

» **Luyện tập 3.** Trở lại tình huống trong HĐ3. Xét hai biến cố sau:

E: "Số chấm xuất hiện trên con xúc xắc bạn Minh gieo là số nguyên tố";

B: "Số chấm xuất hiện trên con xúc xắc bạn Sơn gieo là số chia hết cho 3".

Hai biến cố E và B độc lập hay không độc lập?

## Bài 29. Công thức cộng xác suất

#### THUẬT NGỮ

- Công thức cộng xác suất cho hai biến cố xung khắc
- Công thức cộng xác suất

#### KIẾN THỨC, KĨ NĂNG

- Tính xác suất của biến cố hợp của hai biến cố xung khắc bằng cách sử dụng công thức cộng xác suất.
- Tính xác suất của biến cố hợp của hai biến cố bất kì bằng cách sử dụng công thức cộng xác suất và phương pháp tổ hợp.

Tại tỉnh X, thống kê cho thấy trong số những người trên 50 tuổi có 8,2% mắc bệnh tim; 12,5% mắc bệnh huyết áp và 5,7% mắc cả bệnh tim và bệnh huyết áp. Từ đó, ta có thể tính được tỉ lệ dân cư trên 50 tuổi của tỉnh X không mắc cả bệnh tim và bệnh huyết áp hay không?

#### 1. CÔNG THỨC CỘNG XÁC SUẤT CHO HAI BIẾN CỐ XUNG KHẮC

##### a) Biến cố xung khắc

» **HĐ1.** Gieo một con xúc xắc cân đối, đồng chất. Xét hai biến cố sau:

A: "Số chấm xuất hiện trên con xúc xắc là số chia hết cho 3";

B: "Số chấm xuất hiện trên con xúc xắc là số chia hết cho 4".

Hai biến cố A và B có đồng thời xảy ra hay không? Vì sao?

Biến cố A và biến cố B được gọi là **xung khắc** nếu A và B không đồng thời xảy ra.

Hai biến cố A và B xung khắc khi và chỉ khi  $A \cap B = \emptyset$ .

Hình 8.3

» **Biến cố A và biến cố đối  $\bar{A}$  có xung khắc hay không? Tại sao?**

» **Ví dụ 1.** Gieo đồng thời hai con xúc xắc cân đối, đồng chất. Xét các biến cố sau:

A: "Tổng số chấm xuất hiện trên hai con xúc xắc lớn hơn hoặc bằng 7";

B: "Tổng số chấm xuất hiện trên hai con xúc xắc nhỏ hơn hoặc bằng 4";

C: "Tổng số chấm xuất hiện trên hai con xúc xắc là số nguyên tố".

Trong các cặp biến cố A và B; A và C; B và C, cặp biến cố nào xung khắc? Tại sao?

###### Giải

Cặp biến cố  $A$  và  $B$  là xung khắc vì  $A$  và  $B$  không đồng thời xảy ra.

Cặp biến cố  $A$  và  $C$  không xung khắc vì nếu tổng số chấm xuất hiện trên hai con xúc xắc bằng 7 thì cả  $A$  và  $C$  xảy ra.

Cặp biến cố  $B$  và  $C$  không xung khắc vì nếu tổng số chấm xuất hiện trên hai con xúc xắc bằng 3 thì cả  $B$  và  $C$  xảy ra.

» **Luyện tập 1.** Một tổ học sinh có 8 bạn, trong đó có 6 bạn thích môn Bóng đá, 4 bạn thích môn Cầu lông và 2 bạn thích cả hai môn Bóng đá và Cầu lông. Chọn ngẫu nhiên một học sinh trong tổ. Xét các biến cố sau:

$E$ : "Học sinh được chọn thích môn Bóng đá";

$F$ : "Học sinh được chọn thích môn Cầu lông".

Hai biến cố  $E$  và  $F$  có xung khắc không?

##### b) Công thức cộng xác suất cho hai biến cố xung khắc

» **HĐ2.** Trở lại tình huống trong HĐ1. Hãy tính  $P(A)$ ,  $P(B)$  và  $P(A \cup B)$ .

Với hai biến cố xung khắc, ta có công thức tính xác suất của biến cố hợp như sau:

Nếu  $A$  và  $B$  là hai biến cố xung khắc thì  $P(A \cup B) = P(A) + P(B)$ .

» **Ví dụ 2.** Một hộp đựng 9 tấm thẻ cùng loại được ghi số từ 1 đến 9. Rút ngẫu nhiên đồng thời hai tấm thẻ từ trong hộp. Xét các biến cố sau:

$A$ : "Cả hai tấm thẻ đều ghi số chẵn";

$B$ : "Chỉ có một tấm thẻ ghi số chẵn";

$C$ : "Tích hai số ghi trên hai tấm thẻ là một số chẵn".

a) Chứng minh rằng  $C = A \cup B$ .

b) Tính  $P(C)$ .

###### Giải

a) Biến cố  $C$  xảy ra khi và chỉ khi trong hai tấm thẻ có ít nhất một tấm thẻ ghi số chẵn. Nếu cả hai tấm thẻ ghi số chẵn thì biến cố  $A$  xảy ra. Nếu chỉ có một tấm thẻ ghi số chẵn thì biến cố  $B$  xảy ra. Vậy  $C$  là biến cố hợp của  $A$  và  $B$ .

b) Hai biến cố  $A$  và  $B$  là xung khắc. Do đó  $P(C) = P(A \cup B) = P(A) + P(B)$ .

Ta cần tính  $P(A)$  và  $P(B)$ .

Không gian mẫu  $\Omega$  là tập hợp tất cả các tập con có hai phần tử của tập  $\{1; 2; \dots; 9\}$ .

Do đó  $n(\Omega) = C_9^2 = 36$ .

- Tính  $P(A)$ : Biến cố  $A$  là tập hợp tất cả các tập con có hai phần tử của tập  $\{2; 4; 6; 8\}$ .

Do đó  $n(A) = C_4^2 = 6$ . Suy ra  $P(A) = \frac{n(A)}{n(\Omega)} = \frac{6}{36}$ .

- Tính  $P(B)$ : Mỗi phần tử của  $B$  được hình thành từ hai công đoạn:

**Công đoạn 1:** Chọn một số chẵn từ tập  $\{2; 4; 6; 8\}$ . Có 4 cách chọn.

**Công đoạn 2:** Chọn một số lẻ từ tập  $\{1; 3; 5; 7; 9\}$ . Có 5 cách chọn.

Theo quy tắc nhân, tập  $B$  có  $4 \cdot 5 = 20$  (phần tử).

Do đó  $n(B) = 20$ . Suy ra  $P(B) = \frac{n(B)}{n(\Omega)} = \frac{20}{36}$ .

Vậy  $P(C) = P(A) + P(B) = \frac{6}{36} + \frac{20}{36} = \frac{26}{36} = \frac{13}{18}$ .

» **Luyện tập 2.** Một hộp đựng 5 quả cầu màu xanh và 3 quả cầu màu đỏ, có cùng kích thước và khối lượng. Chọn ngẫu nhiên hai quả cầu trong hộp. Tính xác suất để chọn được hai quả cầu có cùng màu.

#### 2. CÔNG THỨC CỘNG XÁC SUẤT

» **HĐ3.** Ở một trường trung học phổ thông  $X$ , có 19% học sinh học khá môn Ngữ văn, 32% học sinh học khá môn Toán, 7% học sinh học khá cả hai môn Ngữ văn và Toán. Chọn ngẫu nhiên một học sinh của trường  $X$ . Xét hai biến cố sau:

$A$ : "Học sinh đó học khá môn Ngữ văn";

$B$ : "Học sinh đó học khá môn Toán".

a) Hoàn thành các mệnh đề sau bằng cách tìm cụm từ thích hợp thay cho dấu "?".

$P(A)$  là tỉ lệ ...(?)...

$P(AB)$  là ...(?)...

$P(B)$  là ...(?)...

$P(A \cup B)$  là ...(?)...

b) Tại sao để tính  $P(A \cup B)$  ta không áp dụng được công thức  $P(A \cup B) = P(A) + P(B)$ ?

Cho hai biến cố  $A$  và  $B$ . Khi đó, ta có:

$$P(A \cup B) = P(A) + P(B) - P(AB).$$

Công thức này được gọi là **công thức cộng xác suất**.

Tại sao công thức cộng xác suất cho hai biến cố xung khắc là hệ quả của công thức cộng xác suất?

» **Ví dụ 3.** Trở lại tình huống trong HĐ3. Hãy tính tỉ lệ học sinh học khá môn Ngữ văn hoặc học khá môn Toán của trường  $X$ .

**Giải**

Theo đề bài, ta có:

$$P(A) = 19\% = 0,19; P(B) = 32\% = 0,32 \text{ và } P(AB) = 7\% = 0,07.$$

Theo công thức cộng xác suất, ta có:

$$P(A \cup B) = P(A) + P(B) - P(AB) = 0,19 + 0,32 - 0,07 = 0,44.$$

Do đó, xác suất để chọn ngẫu nhiên một học sinh của trường X học khá môn Ngữ văn hoặc học khá môn Toán là 0,44.

Vậy tỉ lệ học sinh học khá môn Ngữ văn hoặc học khá môn Toán của trường X là 44%.

» **Luyện tập 3.** Phỏng vấn 30 học sinh lớp 11A về môn thể thao yêu thích thu được kết quả có 19 bạn thích môn Bóng đá, 17 bạn thích môn Bóng bàn và 15 bạn thích cả hai môn đó. Chọn ngẫu nhiên một học sinh của lớp 11A. Tính xác suất để chọn được học sinh thích ít nhất một trong hai môn Bóng đá hoặc Bóng bàn.

» **Vận dụng.** Giải quyết bài toán trong tình huống mở đầu.

Gợi ý. Chọn ngẫu nhiên một người dân trên 50 tuổi của tỉnh X. Gọi A là biến cố “Người đó mắc bệnh tim”; B là biến cố “Người đó mắc bệnh huyết áp”; E là biến cố “Người đó không mắc cả bệnh tim và bệnh huyết áp”. Khi đó  $\overline{E}$  là biến cố “Người đó mắc bệnh tim hoặc mắc bệnh huyết áp”. Ta có  $\overline{E} = A \cup B$ . Áp dụng công thức cộng xác suất và công thức xác suất của biến cố đối để tính  $P(E)$ .

## Bài 30. Công thức nhân xác suất cho hai biến cố độc lập

#### THUẬT NGỮ

- Hai biến cố độc lập
- Công thức nhân xác suất cho hai biến cố độc lập

#### KIẾN THỨC, KĨ NĂNG

Tính xác suất của biến cố giao của hai biến cố độc lập bằng cách sử dụng công thức nhân xác suất và sơ đồ hình cây.

Tại vòng chung kết của một đại hội thể thao, vận động viên An thi đấu môn Bắn súng, vận động viên Bình thi đấu môn Bơi lội.

Biết rằng xác suất giành huy chương của vận động viên An và vận động viên Bình tương ứng là 0,8 và 0,9. Hỏi xác suất để cả hai vận động viên đạt huy chương là bao nhiêu?

Bài học này sẽ giúp em trả lời câu hỏi trên thông qua việc tìm hiểu công thức nhân xác suất cho hai biến cố độc lập.

#### 1. CÔNG THỨC NHÂN XÁC SUẤT CHO HAI BIẾN CỐ ĐỘC LẬP

**HĐ1.** Có hai hộp đựng các quả bóng có cùng kích thước và khối lượng. Hộp I có 6 quả màu trắng và 4 quả màu đen. Hộp II có 1 quả màu trắng và 7 quả màu đen. Bạn Long lấy ngẫu nhiên một quả bóng từ hộp I, bạn Hải lấy ngẫu nhiên một quả bóng từ hộp II. Xét các biến cố sau:

A: "Bạn Long lấy được quả bóng màu trắng";

B: "Bạn Hải lấy được quả bóng màu đen".

a) Tính  $P(A)$ ,  $P(B)$  và  $P(AB)$ .

b) So sánh  $P(AB)$  và  $P(A) \cdot P(B)$ .

Nếu hai biến cố A và B độc lập với nhau thì

$$P(AB) = P(A) \cdot P(B).$$

Công thức này gọi là **công thức nhân xác suất cho hai biến cố độc lập**.

Hai biến cố A và B trong HĐ1 độc lập hay không độc lập? Tại sao?

**Chú ý.** Với hai biến cố A và B, nếu  $P(AB) \neq P(A)P(B)$  thì A và B không độc lập.

» **Ví dụ 1.** Trở lại tình huống mở đầu. Gọi  $A$  là biến cố “Vận động viên An đạt huy chương”;  $B$  là biến cố “Vận động viên Bình đạt huy chương”.

- Giải thích tại sao hai biến cố  $A$  và  $B$  là độc lập.
- Tính xác suất để cả hai vận động viên đạt huy chương.
- Sử dụng sơ đồ hình cây, tính xác suất để:
  - Cả hai vận động viên không đạt huy chương;
  - Vận động viên An đạt huy chương, vận động viên Bình không đạt huy chương;
  - Vận động viên An không đạt huy chương, vận động viên Bình đạt huy chương.

**Giải**

a) Vì hai vận động viên An và Bình thi đấu hai môn thể thao khác nhau nên hai biến cố  $A$  và  $B$  là độc lập.

b) Vì  $A$  và  $B$  là hai biến cố độc lập nên áp dụng công thức nhân xác suất, ta có:

$$P(AB) = P(A)P(B) = 0,8 \cdot 0,9 = 0,72.$$

c) Ta dùng sơ đồ hình cây để mô tả như sau:

Theo sơ đồ hình cây, ta có:

$$P(\overline{A}\overline{B}) = 0,2 \cdot 0,1 = 0,02;$$

$$P(A\overline{B}) = 0,8 \cdot 0,1 = 0,08;$$

$$P(\overline{A}B) = 0,2 \cdot 0,9 = 0,18.$$

» **Luyện tập 1.** Các học sinh lớp 11D làm thí nghiệm gieo hai loại hạt giống  $A$  và  $B$ . Xác suất để hai loại hạt giống  $A$  và  $B$  nảy mầm tương ứng là  $0,92$  và  $0,88$ . Giả sử việc nảy mầm của hạt  $A$  và hạt  $B$  là độc lập với nhau. Dùng sơ đồ hình cây, tính xác suất để:

- Hạt giống  $A$  nảy mầm còn hạt giống  $B$  không nảy mầm;
- Hạt giống  $A$  không nảy mầm còn hạt giống  $B$  nảy mầm;
- Ít nhất có một trong hai loại hạt giống nảy mầm.

#### 2. VẬN DỤNG

» **Ví dụ 2.** Số liệu thống kê tại một vùng cho thấy trong các vụ tai nạn ô tô có  $0,37\%$  người tử vong;  $29\%$  người không thắt dây an toàn và  $0,28\%$  người không thắt dây an toàn và tử vong. Chứng tỏ rằng việc không thắt dây an toàn khi lái xe và nguy cơ tử vong khi gặp tai nạn có liên quan với nhau.

**Giải**

Chọn ngẫu nhiên một người đã bị tai nạn ô tô.

Gọi  $A$  là biến cố “Người đó đã tử vong”;  $B$  là biến cố “Người đó đã không thắt dây an toàn”.

Khi đó,  $AB$  là biến cố “Người đó không thắt dây an toàn và đã tử vong”.

Chú ý trong Mục 1 được sử dụng để phát hiện mối liên quan giữa hai biến cố.

Ta có  $P(A) = 0,37\% = 0,0037$ ;  $P(B) = 29\% = 0,29$ ; suy ra  $P(A)P(B) = 0,0037 \cdot 0,29 = 0,001073$ .

Mặt khác  $P(AB) = 0,28\% = 0,0028$ .

Vì  $P(AB) \neq P(A)P(B)$  nên hai biến cố  $A$  và  $B$  không độc lập.

Vậy việc không thắt dây an toàn khi lái xe có liên quan tới nguy cơ tử vong khi gặp tai nạn.

» **Luyện tập 2.** Để nghiên cứu mối liên quan giữa thói quen hút thuốc lá với bệnh viêm phổi, nhà nghiên cứu chọn một nhóm 5 000 người đàn ông. Với mỗi người trong nhóm, nhà nghiên cứu kiểm tra xem họ có nghiện thuốc lá và có bị viêm phổi hay không. Kết quả được thống kê trong bảng sau:

|                       | Viêm phổi | Không viêm phổi |
|-----------------------|-----------|-----------------|
| Nghiện thuốc lá       | 752 người | 1 236 người     |
| Không nghiện thuốc lá | 575 người | 2 437 người     |

Từ bảng thống kê trên, hãy chứng tỏ rằng việc nghiện thuốc lá và mắc bệnh viêm phổi có liên quan với nhau.
