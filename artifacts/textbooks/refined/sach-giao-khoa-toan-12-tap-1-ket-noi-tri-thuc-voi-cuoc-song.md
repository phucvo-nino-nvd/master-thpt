# CHƯƠNG I. ỨNG DỤNG ĐẠO HÀM ĐỂ KHÁO SÁT VÀ VẼ ĐỒ THỊ HÀM SỐ

## Bài 1. Tính đơn điệu và cực trị của hàm số

#### THUẬT NGỮ

- Bảng biến thiên
- Đồng biến
- Nghịch biến
- Cực đại
- Cực tiểu
- Cực trị

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết tính đồng biến, nghịch biến của một hàm số trên một khoảng dựa vào dấu đạo hàm cấp một của nó.
- Thể hiện tính đồng biến, nghịch biến của hàm số trong bảng biến thiên.
- Nhận biết tính đơn điệu của hàm số thông qua bảng biến thiên hoặc thông qua hình ảnh hình học của đồ thị hàm số.
- Nhận biết điểm cực trị, giá trị cực trị của hàm số thông qua bảng biến thiên hoặc thông qua hình ảnh hình học của đồ thị hàm số.

Xét một chất điểm chuyển động trên một trục số nằm ngang, chiều dương từ trái sang phải (H.1.1). Giả sử vị trí  $s(t)$  (mét) của chất điểm trên trục số đã chọn tại thời điểm  $t$  (giây) được cho bởi công thức

$$s(t) = t^3 - 9t^2 + 15t, \quad t \geq 0.$$

Hỏi trong khoảng thời gian nào thì chất điểm chuyển động sang phải, trong khoảng thời gian nào thì chất điểm chuyển động sang trái?

Hình 1.1

#### 1. TÍNH ĐƠN ĐIỀU CỦA HÀM SỐ

##### a) Khái niệm tính đơn điệu của hàm số

» **HĐ1.** Nhận biết tính đồng biến, nghịch biến của hàm số

Quan sát đồ thị của hàm số  $y = x^2$  (H.1.2).

a) Hàm số đồng biến trên khoảng nào?

b) Hàm số nghịch biến trên khoảng nào?

Hình 1.2

Giả sử  $K$  là một khoảng, một đoạn hoặc một nửa khoảng và  $y = f(x)$  là hàm số xác định trên  $K$ .

- Hàm số  $y = f(x)$  được gọi là **đồng biến** trên  $K$  nếu  $\forall x_1, x_2 \in K, x_1 < x_2 \Rightarrow f(x_1) < f(x_2)$ .
- Hàm số  $y = f(x)$  được gọi là **nghịch biến** trên  $K$  nếu  $\forall x_1, x_2 \in K, x_1 < x_2 \Rightarrow f(x_1) > f(x_2)$ .

###### Chú ý

- Nếu hàm số đồng biến trên  $K$  thì đồ thị của hàm số đi lên từ trái sang phải (H.1.3a). Nếu hàm số nghịch biến trên  $K$  thì đồ thị của hàm số đi xuống từ trái sang phải (H.1.3b).

a) Hàm số đồng biến trên  $(a; b)$ .

b) Hàm số nghịch biến trên  $(a; b)$ .

Hình 1.3

- Hàm số đồng biến hay nghịch biến trên  $K$  còn được gọi chung là **đơn điệu** trên  $K$ . Việc tìm các khoảng đồng biến, nghịch biến của hàm số còn được gọi là tìm các khoảng đơn điệu (hay xét tính đơn điệu) của hàm số.
- Khi xét tính đơn điệu của hàm số mà không chỉ rõ tập  $K$  thì ta hiểu là xét trên tập xác định của hàm số đó.

» **Ví dụ 1.** Hình 1.4 là đồ thị của hàm số  $y = f(x) = |x|$ . Hãy tìm các khoảng đồng biến, khoảng nghịch biến của hàm số.

**Giải**

Tập xác định của hàm số là  $\mathbb{R}$ .

Từ đồ thị suy ra: Hàm số đồng biến trên khoảng  $(0; +\infty)$ , nghịch biến trên khoảng  $(-\infty; 0)$ .

Hình 1.4

» **Luyện tập 1.** Hình 1.5 là đồ thị của hàm số  $y = x^3 - 3x^2 + 2$ . Hãy tìm các khoảng đồng biến, khoảng nghịch biến của hàm số.

Hình 1.5

###### » **HĐ2. Nhận biết mối quan hệ giữa tính đơn điệu và dấu của đạo hàm**

Xét hàm số  $y = \begin{cases} -x & \text{nếu } x < -1 \\ 1 & \text{nếu } -1 \leq x \leq 1 \\ x & \text{nếu } x > 1 \end{cases}$  có đồ thị như Hình 1.6.

Hình 1.6

- a) Xét dấu đạo hàm của hàm số trên các khoảng  $(-\infty; -1)$ ,  $(1; +\infty)$ . Nêu nhận xét về mối quan hệ giữa tính đồng biến, nghịch biến và dấu đạo hàm của hàm số trên mỗi khoảng này.
- b) Có nhận xét gì về đạo hàm  $y'$  và hàm số  $y$  trên khoảng  $(-1; 1)$ ?

###### **Định lí**

Cho hàm số  $y = f(x)$  có đạo hàm trên khoảng  $K$ .

- a) Nếu  $f'(x) > 0$  với mọi  $x \in K$  thì hàm số  $f(x)$  đồng biến trên khoảng  $K$ .
- b) Nếu  $f'(x) < 0$  với mọi  $x \in K$  thì hàm số  $f(x)$  nghịch biến trên khoảng  $K$ .

###### **Chú ý**

- Định lí trên vẫn đúng trong trường hợp  $f'(x)$  bằng 0 tại một số hữu hạn điểm trong khoảng  $K$ .
- Người ta chứng minh được rằng, nếu  $f'(x) = 0$  với mọi  $x \in K$  thì hàm số  $f(x)$  không đổi trên khoảng  $K$ .

###### » **Ví dụ 2.** Tìm các khoảng đồng biến, khoảng nghịch biến của hàm số $y = x^2 - 4x + 2$ .

**Giải**

Tập xác định của hàm số là  $\mathbb{R}$ .

Ta có:  $y' = 2x - 4$ ;  $y' > 0$  với  $x \in (2; +\infty)$ ;  $y' < 0$  với  $x \in (-\infty; 2)$ .

Do đó, hàm số đồng biến trên khoảng  $(2; +\infty)$ , nghịch biến trên khoảng  $(-\infty; 2)$ .

###### » **Luyện tập 2.** Tìm các khoảng đồng biến, khoảng nghịch biến của hàm số $y = -x^2 + 2x + 3$ .

##### **b) Sử dụng bảng biến thiên xét tính đơn điệu của hàm số**

###### » **HĐ3. Xét tính đơn điệu của hàm số bằng bảng biến thiên**

Cho hàm số  $y = f(x) = x^3 - 3x^2 + 2x + 1$ .

- a) Tính đạo hàm  $f'(x)$  và tìm các điểm  $x$  mà  $f'(x) = 0$ .
- b) Lập bảng biến thiên của hàm số, tức là lập bảng thể hiện dấu của đạo hàm và sự đồng biến, nghịch biến của hàm số trên các khoảng tương ứng.
- c) Nêu kết luận về khoảng đồng biến, nghịch biến của hàm số.

Các bước để xét tính đơn điệu của hàm số  $y = f(x)$ :

1. Tìm tập xác định của hàm số.
2. Tính đạo hàm  $f'(x)$ . Tìm các điểm  $x_i$  ( $i = 1, 2, \dots$ ) mà tại đó đạo hàm bằng 0 hoặc không tồn tại.
3. Sắp xếp các điểm  $x_i$  theo thứ tự tăng dần và lập bảng biến thiên của hàm số.
4. Nêu kết luận về khoảng đồng biến, nghịch biến của hàm số.

» **Ví dụ 3.** Tìm các khoảng đơn điệu của hàm số  $y = \frac{x^2 - 2x + 5}{x - 1}$ .

Giải

Tập xác định của hàm số là  $\mathbb{R} \setminus \{1\}$ .

Ta có:  $y' = \frac{(2x-2)(x-1) - (x^2-2x+5)}{(x-1)^2} = \frac{x^2-2x-3}{(x-1)^2}$ ;  $y' = 0 \Leftrightarrow x = -1$  hoặc  $x = 3$ .

Lập bảng biến thiên của hàm số:

|      |           |    |   |           |   |   |           |
|------|-----------|----|---|-----------|---|---|-----------|
| $x$  | $-\infty$ | -1 |   | 1         |   | 3 | $+\infty$ |
| $y'$ | +         | 0  | - |           | - | 0 | +         |
| $y$  | $-\infty$ | -4 |   | $+\infty$ |   | 4 | $+\infty$ |

Từ bảng biến thiên, ta có:

Hàm số đồng biến trên các khoảng  $(-\infty; -1)$  và  $(3; +\infty)$ .

Hàm số nghịch biến trên các khoảng  $(-1; 1)$  và  $(1; 3)$ .

» **Ví dụ 4.** Xét chiều biến thiên của hàm số  $y = \frac{x-2}{x+1}$ .

Giải

Tập xác định của hàm số là  $\mathbb{R} \setminus \{-1\}$ .

Ta có:  $y' = \frac{(x+1) - (x-2)}{(x+1)^2} = \frac{3}{(x+1)^2} > 0$ , với mọi  $x \neq -1$ .

Lập bảng biến thiên của hàm số:

|      |           |           |           |
|------|-----------|-----------|-----------|
| $x$  | $-\infty$ | -1        | $+\infty$ |
| $y'$ | +         |           | +         |
| $y$  | 1         | $+\infty$ | $-\infty$ |

Việc tìm các khoảng đồng biến, nghịch biến của hàm số còn được nói gọn là xét chiều biến thiên của hàm số.

Từ bảng biến thiên, ta có: Hàm số đồng biến trên các khoảng  $(-\infty; -1)$  và  $(-1; +\infty)$ .

» **Luyện tập 3.** Tìm các khoảng đơn điệu của các hàm số sau:

a)  $y = \frac{1}{3}x^3 + 3x^2 + 5x + 2$ ;

b)  $y = \frac{-x^2 + 5x - 7}{x - 2}$ .

» **Vận dụng 1.** Giải bài toán trong tình huống mở đầu bằng cách thực hiện lần lượt các yêu cầu sau:

- a) Theo ý nghĩa cơ học của đạo hàm, vận tốc  $v(t)$  là đạo hàm của  $s(t)$ . Hãy tìm vận tốc  $v(t)$ .
- b) Xét dấu của hàm  $v(t)$ , từ đó suy ra câu trả lời.

Chất điểm chuyển động theo chiều dương khi vận tốc  $v(t) > 0$ .

#### 2. CỰC TRỊ CỦA HÀM SỐ

##### a) Khái niệm cực trị của hàm số

» **HĐ4.** Nhận biết khái niệm cực đại, cực tiểu của hàm số

Quan sát đồ thị của hàm số  $y = x^3 + 3x^2 - 4$  (H.1.7). Xét dấu đạo hàm của hàm số đã cho và hoàn thành các bảng sau vào vở:

|      |                                                                                                                        |    |    |
|------|------------------------------------------------------------------------------------------------------------------------|----|----|
| $x$  | -3                                                                                                                     | -2 | -1 |
| $y'$ | ?                                                                                                                      | 0  | ?  |
| $y$  | <div> <div> <div>-4</div> <div>↗</div> </div> <div> <div>?</div> <div>↘</div> </div> <div> <div>-2</div> </div> </div> |    |    |

|      |                                                                                                          |   |   |
|------|----------------------------------------------------------------------------------------------------------|---|---|
| $x$  | -1                                                                                                       | 0 | 1 |
| $y'$ | ?                                                                                                        | 0 | ? |
| $y$  | <div> <div>-2</div> <div>↘</div> </div> <div> <div>?</div> <div>↗</div> </div> <div> <div>0</div> </div> |   |   |

Hình 1.7

Tổng quát, ta có định nghĩa sau:

Cho hàm số  $y = f(x)$  xác định và liên tục trên khoảng  $(a; b)$  ( $a$  có thể là  $-\infty$ ,  $b$  có thể là  $+\infty$ ) và điểm  $x_0 \in (a; b)$ .

- Nếu tồn tại số  $h > 0$  sao cho  $f(x) < f(x_0)$  với mọi  $x \in (x_0 - h; x_0 + h) \subset (a; b)$  và  $x \neq x_0$  thì ta nói hàm số  $f(x)$  đạt **cực đại** tại  $x_0$ .
- Nếu tồn tại số  $h > 0$  sao cho  $f(x) > f(x_0)$  với mọi  $x \in (x_0 - h; x_0 + h) \subset (a; b)$  và  $x \neq x_0$  thì ta nói hàm số  $f(x)$  đạt **cực tiểu** tại  $x_0$ .

###### Chú ý

- Nếu hàm số  $y = f(x)$  đạt cực đại tại  $x_0$  thì  $x_0$  được gọi là **điểm cực đại** của hàm số  $f(x)$ . Khi đó,  $f(x_0)$  được gọi là **giá trị cực đại** của hàm số  $f(x)$  và kí hiệu là  $f_{CB}$  hay  $y_{CB}$ . Điểm  $M_0(x_0; f(x_0))$  được gọi là **điểm cực đại** của đồ thị hàm số.
- Nếu hàm số  $y = f(x)$  đạt cực tiểu tại  $x_0$  thì  $x_0$  được gọi là **điểm cực tiểu** của hàm số  $f(x)$ . Khi đó,  $f(x_0)$  được gọi là **giá trị cực tiểu** của hàm số  $f(x)$  và kí hiệu là  $f_{CT}$  hay  $y_{CT}$ . Điểm  $M_0(x_0; f(x_0))$  được gọi là **điểm cực tiểu** của đồ thị hàm số.
- Các điểm cực đại và điểm cực tiểu được gọi chung là **điểm cực trị**. Giá trị cực đại và giá trị cực tiểu được gọi chung là **giá trị cực trị** (hay **cực trị**) của hàm số.

» **Ví dụ 5.** Hình 1.8 là đồ thị của hàm số  $y = f(x)$ . Hãy tìm các cực trị của hàm số.

**Giải**

Từ đồ thị hàm số, ta có:

Hàm số đạt cực tiểu tại  $x = -1$  và  $y_{CT} = y(-1) = 2$ .

Hàm số đạt cực đại tại  $x = 0$  và  $y_{CD} = y(0) = 3$ .

Hàm số đạt cực tiểu tại  $x = 1$  và  $y_{CT} = y(1) = 2$ .

Hình 1.8

» **Luyện tập 4.** Hình 1.9 là đồ thị của hàm số  $y = f(x)$ . Hãy tìm các cực trị của hàm số.

Hình 1.9

##### b) Cách tìm cực trị của hàm số

» **HĐ5.** Nhận biết cách tìm cực trị của hàm số

Cho hàm số  $y = \frac{1}{3}x^3 - 3x^2 + 8x + 1$ .

- Tính đạo hàm  $f'(x)$  và tìm các điểm mà tại đó đạo hàm  $f'(x)$  bằng 0.
- Lập bảng biến thiên của hàm số.
- Từ bảng biến thiên suy ra các điểm cực trị của hàm số.

##### ĐỊNH LÍ

Giả sử hàm số  $y = f(x)$  liên tục trên khoảng  $(a; b)$  chứa điểm  $x_0$  và có đạo hàm trên các khoảng  $(a; x_0)$  và  $(x_0; b)$ . Khi đó:

- Nếu  $f'(x) < 0$  với mọi  $x \in (a; x_0)$  và  $f'(x) > 0$  với mọi  $x \in (x_0; b)$  thì  $x_0$  là một điểm cực tiểu của hàm số  $f(x)$ .
- Nếu  $f'(x) > 0$  với mọi  $x \in (a; x_0)$  và  $f'(x) < 0$  với mọi  $x \in (x_0; b)$  thì  $x_0$  là một điểm cực đại của hàm số  $f(x)$ .

**?** Giải thích vì sao nếu  $f'(x)$  không đổi dấu khi  $x$  qua  $x_0$  thì  $x_0$  không phải là điểm cực trị của hàm số  $f(x)$ ?

Định lí trên được viết gọn lại trong hai bảng biến thiên sau:

|         |                                                 |       |     |
|---------|-------------------------------------------------|-------|-----|
| $x$     | $a$                                             | $x_0$ | $b$ |
| $f'(x)$ | -                                               |       | +   |
| $f(x)$  | <div> <math>f(x_0)</math><br/>(Cực tiểu) </div> |       |     |

  

|         |                                                |       |     |
|---------|------------------------------------------------|-------|-----|
| $x$     | $a$                                            | $x_0$ | $b$ |
| $f'(x)$ | +                                              | -     |     |
| $f(x)$  | <div> <math>f(x_0)</math><br/>(Cực đại) </div> |       |     |

**Chú ý.** Từ định lí trên ta có các bước tìm cực trị của hàm số  $y = f(x)$  như sau:

1. Tìm tập xác định của hàm số.
2. Tính đạo hàm  $f'(x)$ . Tìm các điểm mà tại đó đạo hàm  $f'(x)$  bằng 0 hoặc đạo hàm không tồn tại.
3. Lập bảng biến thiên của hàm số.
4. Từ bảng biến thiên suy ra các cực trị của hàm số.

» **Ví dụ 6.** Tìm cực trị của hàm số  $y = x^3 - 6x^2 + 9x + 30$ .

**Giải**

Tập xác định của hàm số là  $\mathbb{R}$ .

Ta có:  $y' = 3x^2 - 12x + 9$ ;  $y' = 0 \Leftrightarrow x = 1$  hoặc  $x = 3$ .

Lập bảng biến thiên của hàm số:

|      |                                              |   |   |           |
|------|----------------------------------------------|---|---|-----------|
| $x$  | $-\infty$                                    | 1 | 3 | $+\infty$ |
| $y'$ | +                                            | 0 | - | 0         |
| $y$  | <div> <math>34</math> <math>30</math> </div> |   |   |           |

Từ bảng biến thiên, ta có:

Hàm số đạt cực đại tại  $x = 1$  và  $y_{CD} = y(1) = 34$ .

Hàm số đạt cực tiểu tại  $x = 3$  và  $y_{CT} = y(3) = 30$ .

**Chú ý.** Nếu  $f'(x_0) = 0$  nhưng  $f'(x)$  không đổi dấu khi  $x$  qua  $x_0$  thì  $x_0$  không phải là điểm cực trị của hàm số. Chẳng hạn, hàm số  $f(x) = x^3$  có  $f'(x) = 3x^2$ ,  $f'(0) = 0$ , nhưng  $x = 0$  không phải là điểm cực trị của hàm số (H.1.10).

Hình 1.10

» **Ví dụ 7.** Tìm cực trị của hàm số  $y = \frac{x^2 - 2x + 9}{x - 2}$ .

**Giải**

Tập xác định của hàm số là  $\mathbb{R} \setminus \{2\}$ .

Ta có:  $y' = \frac{(2x-2)(x-2) - (x^2-2x+9)}{(x-2)^2} = \frac{x^2-4x-5}{(x-2)^2}$ ;  $y' = 0 \Leftrightarrow x = -1$  hoặc  $x = 5$ .

Lập bảng biến thiên của hàm số:

|      |            |      |           |            |           |            |
|------|------------|------|-----------|------------|-----------|------------|
| $x$  | $-\infty$  | $-1$ | $2$       | $5$        | $+\infty$ |            |
| $y'$ | $+$        | $0$  | $-$       | $-$        | $0$       | $+$        |
| $y$  | $\nearrow$ |      | $-4$      | $\searrow$ |           | $-\infty$  |
|      | $-\infty$  |      | $+\infty$ |            | $8$       | $\nearrow$ |
|      |            |      | $+\infty$ |            | $8$       |            |
|      |            |      |           |            | $+\infty$ |            |

Từ bảng biến thiên, ta có:

Hàm số đạt cực đại tại  $x = -1$  và  $y_{CD} = y(-1) = -4$ .

Hàm số đạt cực tiểu tại  $x = 5$  và  $y_{CT} = y(5) = 8$ .

» **Ví dụ 8.** Tìm cực trị của hàm số  $y = \frac{x+1}{x-1}$ .

**Giải**

Tập xác định của hàm số là  $\mathbb{R} \setminus \{1\}$ .

Ta có:  $y' = \frac{(x-1) - (x+1)}{(x-1)^2} = \frac{-2}{(x-1)^2} < 0$ , với mọi  $x \neq 1$ .

Lập bảng biến thiên của hàm số:

|      |           |            |           |
|------|-----------|------------|-----------|
| $x$  | $-\infty$ | $1$        | $+\infty$ |
| $y'$ | $-$       | $-$        | $-$       |
| $y$  | $1$       | $\searrow$ |           |
|      | $-\infty$ |            | $1$       |

Từ bảng biến thiên suy ra hàm số không có cực trị.

» **Luyện tập 5.** Tìm cực trị của các hàm số sau:

a)  $y = x^4 - 3x^2 + 1$ ;

b)  $y = \frac{-x^2 + 2x - 1}{x + 2}$ .

» **Vận dụng 2.** Một vật được phóng thẳng đứng lên trên từ độ cao 2 m với vận tốc ban đầu là 24,5 m/s. Trong Vật lí, ta biết rằng khi bỏ qua sức cản của không khí thì độ cao  $h$  (mét) của vật sau  $t$  (giây) được cho bởi công thức

$$h(t) = 2 + 24,5t - 4,9t^2.$$

Hỏi tại thời điểm nào thì vật đạt độ cao lớn nhất?

## Bài 2. Giá trị lớn nhất và giá trị nhỏ nhất của hàm số

#### THUẬT NGỮ

- Giá trị lớn nhất
- Giá trị nhỏ nhất

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết giá trị lớn nhất, giá trị nhỏ nhất của hàm số trên một tập xác định cho trước.
- Xác định giá trị lớn nhất, giá trị nhỏ nhất của hàm số bằng đạo hàm trong những trường hợp đơn giản.

Từ một tấm bìa carton hình vuông có độ dài cạnh bằng 60 cm, người ta cắt bốn hình vuông bằng nhau ở bốn góc rồi gập thành một chiếc hộp có dạng hình hộp chữ nhật không có nắp (H.1.14). Tính cạnh của các hình vuông bị cắt sao cho thể tích của chiếc hộp là lớn nhất.

Hình 1.14

#### 1. ĐỊNH NGHĨA

» **H01.** Nhận biết khái niệm giá trị lớn nhất, giá trị nhỏ nhất của hàm số

Cho hàm số  $y = f(x) = x^2 - 2x$  với  $x \in [0; 3]$ , có đồ thị như Hình 1.15.

a) Giá trị lớn nhất  $M$  của hàm số trên đoạn  $[0; 3]$  là bao nhiêu? Tìm  $x_0$  sao cho  $f(x_0) = M$ .

b) Giá trị nhỏ nhất  $m$  của hàm số trên đoạn  $[0; 3]$  là bao nhiêu? Tìm  $x_0$  sao cho  $f(x_0) = m$ .

Hình 1.15

Cho hàm số  $y = f(x)$  xác định trên tập  $D$ .

- Số  $M$  được gọi là **giá trị lớn nhất** của hàm số  $y = f(x)$  trên tập  $D$  nếu  $f(x) \leq M$  với mọi  $x \in D$  và tồn tại  $x_0 \in D$  sao cho  $f(x_0) = M$ .

Kí hiệu  $M = \max_{x \in D} f(x)$  hoặc  $M = \max_D f(x)$ .

- Số  $m$  được gọi là **giá trị nhỏ nhất** của hàm số  $y = f(x)$  trên tập  $D$  nếu  $f(x) \geq m$  với mọi  $x \in D$  và tồn tại  $x_0 \in D$  sao cho  $f(x_0) = m$ .

Kí hiệu  $m = \min_{x \in D} f(x)$  hoặc  $m = \min_D f(x)$ .

###### Chú ý

- Ta quy ước rằng khi nói giá trị lớn nhất và giá trị nhỏ nhất của hàm số  $f(x)$  (mà không nói “trên tập  $D$ ”) thì ta hiểu đó là giá trị lớn nhất hay giá trị nhỏ nhất của  $f(x)$  trên tập xác định của hàm số.
- Để tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số trên tập  $D$ , ta thường lập bảng biến thiên của hàm số trên tập  $D$  để kết luận.

» **Ví dụ 1.** Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số  $y = f(x) = \sqrt{1-x^2}$ .

**Giải**

Tập xác định của hàm số là  $[-1; 1]$ .

**Cách 1.** Sử dụng định nghĩa.

Ta có:

- $f(x) = \sqrt{1-x^2} \geq 0$ ; dấu bằng xảy ra khi  $1-x^2 = 0$ , tức là khi  $x = -1$  hoặc  $x = 1$ .

Do đó  $\min_{[-1; 1]} f(x) = f(-1) = f(1) = 0$ .

- $f(x) = \sqrt{1-x^2} \leq 1$ ; dấu bằng xảy ra khi  $1-x^2 = 1$ , tức là khi  $x = 0$ . Do đó  $\max_{[-1; 1]} f(x) = f(0) = 1$ .

**Cách 2.** Sử dụng bảng biến thiên.

Với  $x \in (-1; 1)$ , ta có:  $y' = \frac{(1-x^2)'}{2\sqrt{1-x^2}} = -\frac{x}{\sqrt{1-x^2}}$ ;  $y' = 0 \Leftrightarrow x = 0$ .

Lập bảng biến thiên của hàm số trên đoạn  $[-1; 1]$ :

|      |    |   |   |
|------|----|---|---|
| $x$  | -1 | 0 | 1 |
| $y'$ |    | + |   |
| $y$  | 0  | 1 | 0 |

Từ bảng biến thiên, ta được:  $\min_{[-1; 1]} f(x) = f(-1) = f(1) = 0$ ;  $\max_{[-1; 1]} f(x) = f(0) = 1$ .

**Chú ý.** Trong thực hành, ta cũng dùng các kí hiệu  $\min_D y$ ,  $\max_D y$  để chỉ giá trị nhỏ nhất, giá trị lớn nhất (nếu có) của hàm số  $y = f(x)$  trên tập  $D$ . Do đó, trong Ví dụ 1 ta có thể viết:

$$\min_{[-1; 1]} y = y(-1) = y(1) = 0; \max_{[-1; 1]} y = y(0) = 1.$$

» **Ví dụ 2.** Tìm giá trị lớn nhất và giá trị nhỏ nhất (nếu có) của hàm số  $y = x - 2 + \frac{1}{x}$  trên khoảng  $(0; +\infty)$ .

**Giải**

Ta có:  $y' = 1 - \frac{1}{x^2}$ ;  $y' = 0 \Leftrightarrow x = 1$  (vì  $x > 0$ ).

Tính các giới hạn:

$$\lim_{x \rightarrow 0^+} y = \lim_{x \rightarrow 0^+} \left( x - 2 + \frac{1}{x} \right) = +\infty; \quad \lim_{x \rightarrow +\infty} y = \lim_{x \rightarrow +\infty} \left( x - 2 + \frac{1}{x} \right) = +\infty.$$

Lập bảng biến thiên của hàm số trên khoảng  $(0; +\infty)$ :

|      |           |   |           |
|------|-----------|---|-----------|
| $x$  | 0         | 1 | $+\infty$ |
| $y'$ | -         | 0 | +         |
| $y$  | $+\infty$ | 0 | $+\infty$ |

Từ bảng biến thiên, ta được:  $\min_{(0; +\infty)} y = y(1) = 0$ ; hàm số không có giá trị lớn nhất trên khoảng  $(0; +\infty)$ .

##### » **Ví dụ 3.** Giải bài toán trong tình huống mở đầu.

**Giải**

Gọi  $x$  (cm) là độ dài cạnh của các hình vuông nhỏ được cắt ở bốn góc của tấm bìa. Điều kiện:  $0 < x < 30$ . Khi cắt bỏ bốn hình vuông nhỏ có cạnh  $x$  (cm) ở bốn góc và gập lên thì ta được một chiếc hộp chữ nhật không có nắp, có đáy là hình vuông với độ dài cạnh bằng  $(60 - 2x)$  (cm) và chiều cao bằng  $x$  (cm). Thể tích của chiếc hộp này là

$$V(x) = (60 - 2x)^2 \cdot x = 4x^3 - 240x^2 + 3600x \text{ (cm}^3\text{)}.$$

Ta có:  $V'(x) = 12x^2 - 480x + 3600$ ;  $V'(x) = 0 \Leftrightarrow x^2 - 40x + 300 = 0 \Leftrightarrow x = 10$  (thoả mãn điều kiện) hoặc  $x = 30$  (loại).

Lập bảng biến thiên:

|         |   |        |    |
|---------|---|--------|----|
| $x$     | 0 | 10     | 30 |
| $V'(x)$ | + | 0      | -  |
| $V(x)$  | 0 | 16 000 | 0  |

Vậy để thể tích của chiếc hộp là lớn nhất thì độ dài cạnh của các hình vuông nhỏ phải cắt là 10 cm.

##### » **Luyện tập 1.** Tìm giá trị lớn nhất và giá trị nhỏ nhất (nếu có) của các hàm số sau:

a)  $y = \sqrt{2x - x^2}$ ;

b)  $y = -x + \frac{1}{x-1}$  trên khoảng  $(1; +\infty)$ .

#### 2. CÁCH Tìm GIÁ TRỊ LỚN NHẤT VÀ GIÁ TRỊ NHỎ NHẤT CỦA HÀM SỐ TRÊN MỘT ĐOẠN

##### » **HĐ2.** Hình thành các bước tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số trên một đoạn

Xét hàm số  $y = f(x) = x^3 - 2x^2 + 1$  trên đoạn  $[-1; 2]$ , với đồ thị như Hình 1.16.

a) Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số trên đoạn  $[-1; 2]$ .

Hình 1.16

b) Tính đạo hàm  $f'(x)$  và tìm các điểm  $x \in (-1; 2)$  mà  $f'(x) = 0$ .

c) Tính giá trị của hàm số tại hai đầu mút của đoạn  $[-1; 2]$  và tại các điểm  $x$  đã tìm ở câu b.  
So sánh số nhỏ nhất trong các giá trị này với  $\min_{[-1; 2]} f(x)$ , số lớn nhất trong các giá trị này với  $\max_{[-1; 2]} f(x)$ .

Giả sử  $y = f(x)$  là hàm số liên tục trên  $[a; b]$  và có đạo hàm trên  $(a; b)$ , có thể trừ ra tại một số hữu hạn điểm mà tại đó hàm số không có đạo hàm. Giả sử chỉ có hữu hạn điểm trong đoạn  $[a; b]$  mà đạo hàm  $f'(x)$  bằng 0.

Các bước tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số  $f(x)$  trên đoạn  $[a; b]$ :

1. Tìm các điểm  $x_1, x_2, \dots, x_n \in (a; b)$ , tại đó  $f'(x)$  bằng 0 hoặc không tồn tại.
2. Tính  $f(x_1), f(x_2), \dots, f(x_n), f(a)$  và  $f(b)$ .
3. Tìm số lớn nhất  $M$  và số nhỏ nhất  $m$  trong các số trên. Ta có:

$$M = \max_{[a; b]} f(x); \quad m = \min_{[a; b]} f(x).$$

» **Ví dụ 4.** Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số  $y = x^4 - 4x^2 + 3$  trên đoạn  $[0; 4]$ .

Giải

Ta có:  $y' = 4x^3 - 8x = 4x(x^2 - 2)$ ;  $y' = 0 \Leftrightarrow x = 0$  hoặc  $x = \sqrt{2}$  (vì  $x \in [0; 4]$ );

$$y(0) = 3; \quad y(4) = 195; \quad y(\sqrt{2}) = -1.$$

Do đó:  $\max_{[0; 4]} y = y(4) = 195$ ;  $\min_{[0; 4]} y = y(\sqrt{2}) = -1$ .

» **Ví dụ 5.** Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số  $y = \sin x + \cos x$  trên đoạn  $[0; 2\pi]$ .

Giải

Ta có:  $y' = \cos x - \sin x$ ;  $y' = 0 \Leftrightarrow \cos x = \sin x \Leftrightarrow x = \frac{\pi}{4}$  hoặc  $x = \frac{5\pi}{4}$  (vì  $x \in [0; 2\pi]$ );

$$y(0) = 1; \quad y(2\pi) = 1; \quad y\left(\frac{\pi}{4}\right) = \sqrt{2}; \quad y\left(\frac{5\pi}{4}\right) = -\sqrt{2}.$$

Do đó:  $\max_{[0; 2\pi]} y = y\left(\frac{\pi}{4}\right) = \sqrt{2}$ ;  $\min_{[0; 2\pi]} y = y\left(\frac{5\pi}{4}\right) = -\sqrt{2}$ .

» **Luyện tập 2.** Tìm giá trị lớn nhất và giá trị nhỏ nhất của các hàm số sau:

a)  $y = 2x^3 - 3x^2 + 5x + 2$  trên đoạn  $[0; 2]$ ;

b)  $y = (x + 1)e^{-x}$  trên đoạn  $[-1; 1]$ .

» **Vận dụng.** Giả sử sự lây lan của một loại virus ở một địa phương có thể được mô hình hoá bằng hàm số  $N(t) = -t^3 + 12t^2$ ,  $0 \leq t \leq 12$ , trong đó  $N$  là số người bị nhiễm bệnh (tính bằng trăm người) và  $t$  là thời gian (tuần).

a) Hãy ước tính số người tối đa bị nhiễm bệnh ở địa phương đó.

b) Đạo hàm  $N'(t)$  biểu thị tốc độ lây lan của virus (còn gọi là tốc độ truyền bệnh). Hỏi virus sẽ lây lan nhanh nhất khi nào?

## Bài 3. Đường tiệm cận của đồ thị hàm số

#### THUẬT NGỮ

- Tiệm cận ngang
- Tiệm cận đứng
- Tiệm cận xiên

#### KIẾN THỨC, KĨ NĂNG

Nhận biết hình ảnh hình học của đường tiệm cận ngang, đường tiệm cận đứng, đường tiệm cận xiên của đồ thị hàm số.

Giả sử khối lượng còn lại của một chất phóng xạ (gam) sau  $t$  ngày phân rã được cho bởi hàm số

$$m(t) = 15e^{-0,012t}.$$

Khối lượng  $m(t)$  thay đổi ra sao khi  $t \rightarrow +\infty$ ? Điều này thể hiện trên Hình 1.18 như thế nào?

Hình 1.18

#### 1. ĐƯỜNG TIỆM CẬN NGANG

##### HĐ1. Nhận biết đường tiệm cận ngang

Cho hàm số  $y = f(x) = \frac{2x+1}{x}$  có đồ thị (C). Với  $x > 0$ , xét điểm  $M(x; f(x))$  thuộc (C). Gọi  $H$  là hình chiếu vuông góc của  $M$  trên đường thẳng  $y = 2$  (H.1.19).

Hình 1.19

a) Tính khoảng cách  $MH$ .

b) Có nhận xét gì về khoảng cách  $MH$  khi  $x \rightarrow +\infty$ ?

Đường thẳng  $y = y_0$  gọi là **đường tiệm cận ngang** (gọi tắt là tiệm cận ngang) của đồ thị hàm số  $y = f(x)$  nếu

$$\lim_{x \rightarrow +\infty} f(x) = y_0 \text{ hoặc } \lim_{x \rightarrow -\infty} f(x) = y_0.$$

Đường thẳng  $y = y_0$  là tiệm cận ngang của đồ thị (khi  $x \rightarrow +\infty$ ).

Đường thẳng  $y = y_0$  là tiệm cận ngang của đồ thị (khi  $x \rightarrow -\infty$ ).

Hình 1.20

» **Ví dụ 1.** Tìm tiệm cận ngang của đồ thị hàm số  $y = f(x) = \frac{3x-2}{x+1}$ .

**Giải**

Ta có:  $\lim_{x \rightarrow +\infty} f(x) = \lim_{x \rightarrow +\infty} \frac{3x-2}{x+1} = \lim_{x \rightarrow +\infty} \frac{3 - \frac{2}{x}}{1 + \frac{1}{x}} = 3$ . Tương tự,  $\lim_{x \rightarrow -\infty} f(x) = 3$ .

Vậy đồ thị hàm số  $f(x)$  có tiệm cận ngang là đường thẳng  $y = 3$ .

» **Ví dụ 2.** Tìm các tiệm cận ngang của đồ thị hàm số  $y = f(x) = \frac{\sqrt{x^2+1}}{x}$ .

**Giải**

Ta có:

$$\lim_{x \rightarrow +\infty} f(x) = \lim_{x \rightarrow +\infty} \frac{\sqrt{x^2+1}}{x} = \lim_{x \rightarrow +\infty} \sqrt{\frac{x^2+1}{x^2}} = \lim_{x \rightarrow +\infty} \sqrt{1 + \frac{1}{x^2}} = 1;$$

$$\lim_{x \rightarrow -\infty} f(x) = \lim_{x \rightarrow -\infty} \frac{\sqrt{x^2+1}}{x} = \lim_{x \rightarrow -\infty} \left( -\sqrt{\frac{x^2+1}{x^2}} \right) = \lim_{x \rightarrow -\infty} \left( -\sqrt{1 + \frac{1}{x^2}} \right) = -1.$$

Vậy đồ thị hàm số  $f(x)$  có hai tiệm cận ngang là  $y = 1$  và  $y = -1$ .

Nhận xét. Đồ thị hàm số  $f(x)$  như Hình 1.21.

Hình 1.21

» **Luyện tập 1.** Tìm tiệm cận ngang của đồ thị hàm số  $y = f(x) = \frac{2x-1}{x-1}$ .

» **Vận dụng 1.** Giải bài toán trong tình huống mở đầu.

#### 2. ĐƯỜNG TIỆM CẬN ĐỨNG

» **HĐ2.** Nhận biết đường tiệm cận đứng

Cho hàm số  $y = f(x) = \frac{x}{x-1}$  có đồ thị (C). Với  $x > 1$ , xét

điểm  $M(x; f(x))$  thuộc (C). Gọi  $H$  là hình chiếu vuông góc của  $M$  trên đường thẳng  $x = 1$  (H.1.22).

a) Tính khoảng cách  $MH$ .

b) Khi  $M$  thay đổi trên (C) sao cho khoảng cách  $MH$  dần đến 0, có nhận xét gì về tung độ của điểm  $M$ ?

Hình 1.22

Đường thẳng  $x = x_0$  gọi là **đường tiệm cận đứng** (gọi tắt là tiệm cận đứng) của đồ thị hàm số  $y = f(x)$  nếu ít nhất một trong các điều kiện sau được thoả mãn:

$$\lim_{x \rightarrow x_0^+} f(x) = +\infty;$$

$$\lim_{x \rightarrow x_0^+} f(x) = -\infty;$$

$$\lim_{x \rightarrow x_0^-} f(x) = +\infty;$$

$$\lim_{x \rightarrow x_0^-} f(x) = -\infty.$$

a) và c). Đường thẳng  $x = x_0$  là tiệm cận đứng của đồ thị (khi  $x \rightarrow x_0^-$ ).

b) và d). Đường thẳng  $x = x_0$  là tiệm cận đứng của đồ thị (khi  $x \rightarrow x_0^+$ ).

Hình 1.23

» **Ví dụ 3.** Tìm tiệm cận đứng của đồ thị hàm số  $y = f(x) = \frac{3-x}{x+2}$ .

Giải

Ta có:  $\lim_{x \rightarrow -2^+} f(x) = \lim_{x \rightarrow -2^+} \frac{3-x}{x+2} = +\infty$ . Tương tự,  $\lim_{x \rightarrow -2^-} f(x) = -\infty$ . Vậy đồ thị hàm số  $f(x)$  có tiệm cận đứng là đường thẳng  $x = -2$ .

» **Ví dụ 4.** Tìm tiệm cận đứng của đồ thị hàm số  $y = f(x) = \frac{x^2+2}{x}$ .

Giải

Ta có:  $\lim_{x \rightarrow 0^+} f(x) = \lim_{x \rightarrow 0^+} \frac{x^2+2}{x} = +\infty$ . Tương tự,  $\lim_{x \rightarrow 0^-} f(x) = -\infty$ . Vậy đồ thị hàm số  $f(x)$  có tiệm cận đứng là đường thẳng  $x = 0$ .

» **Luyện tập 2.** Tìm các tiệm cận ngang và tiệm cận đứng của đồ thị hàm số  $y = f(x) = \frac{2x+1}{x-4}$ .

» **Vận dụng 2.** Để loại bỏ  $p\%$  một loài tảo độc khỏi một hồ nước, người ta ước tính chi phí bỏ ra là

$$C(p) = \frac{45p}{100-p} \text{ (triệu đồng), với } 0 \leq p < 100.$$

Tìm tiệm cận đứng của đồ thị hàm số  $C(p)$  và nêu ý nghĩa thực tiễn của đường tiệm cận này.

#### 3. ĐƯỜNG TIỆM CẬN XIÊN

##### » H03. Nhận biết đường tiệm cận xiên

Cho hàm số  $y = f(x) = x - 1 + \frac{2}{x+1}$  có đồ thị (C) và đường thẳng  $y = x - 1$  như Hình 1.24.

a) Với  $x > -1$ , xét điểm  $M(x; f(x))$  thuộc (C). Gọi  $H$  là hình chiếu vuông góc của  $M$  trên đường thẳng  $y = x - 1$ . Có nhận xét gì về khoảng cách  $MH$  khi  $x \rightarrow +\infty$ ?

b) Chứng tỏ rằng  $\lim_{x \rightarrow +\infty} [f(x) - (x - 1)] = 0$ . Tính chất này thể hiện trên Hình 1.24 như thế nào?

Hình 1.24

Đường thẳng  $y = ax + b$  ( $a \neq 0$ ) gọi là **đường tiệm cận xiên** (gọi tắt là tiệm cận xiên) của đồ thị hàm số  $y = f(x)$  nếu

$$\lim_{x \rightarrow +\infty} [f(x) - (ax + b)] = 0 \text{ hoặc } \lim_{x \rightarrow -\infty} [f(x) - (ax + b)] = 0.$$

Đường thẳng  $y = ax + b$  là tiệm cận xiên của đồ thị (khi  $x \rightarrow +\infty$ ).

Đường thẳng  $y = ax + b$  là tiệm cận xiên của đồ thị (khi  $x \rightarrow -\infty$ ).

Hình 1.25

» **Ví dụ 5.** Cho hàm số  $y = f(x) = x + \frac{1}{x+2}$ . Tìm tiệm cận xiên của đồ thị hàm số  $f(x)$ .

**Giải**

Ta có:  $\lim_{x \rightarrow +\infty} [f(x) - x] = \lim_{x \rightarrow +\infty} \frac{1}{x+2} = 0$ . Tương tự  $\lim_{x \rightarrow -\infty} [f(x) - x] = 0$ .

Vậy đồ thị hàm số  $f(x)$  có tiệm cận xiên là đường thẳng  $y = x$ .

$$\lim_{x \rightarrow +\infty} \frac{1}{x} = \lim_{x \rightarrow -\infty} \frac{1}{x} = 0.$$

**Chú ý.** Ta biết rằng nếu đường thẳng  $y = ax + b$  ( $a \neq 0$ ) là tiệm cận xiên của đồ thị hàm số  $y = f(x)$  thì  $\lim_{x \rightarrow +\infty} [f(x) - (ax + b)] = 0$  hoặc  $\lim_{x \rightarrow -\infty} [f(x) - (ax + b)] = 0$ .

Do đó  $\lim_{x \rightarrow +\infty} [f(x) - (ax + b)] \cdot \frac{1}{x} = 0$  hoặc  $\lim_{x \rightarrow -\infty} [f(x) - (ax + b)] \cdot \frac{1}{x} = 0$ .

Từ đây suy ra  $a = \lim_{x \rightarrow +\infty} \frac{f(x)}{x}$  hoặc  $a = \lim_{x \rightarrow -\infty} \frac{f(x)}{x}$ .

Khi đó, ta có  $b = \lim_{x \rightarrow +\infty} [f(x) - ax]$  hoặc  $b = \lim_{x \rightarrow -\infty} [f(x) - ax]$ .

Ngược lại, với  $a$  và  $b$  xác định như trên, đường thẳng  $y = ax + b$  ( $a \neq 0$ ) là một tiệm cận xiên của đồ thị hàm số  $y = f(x)$ . Đặc biệt, nếu  $a = 0$  thì đồ thị hàm số có tiệm cận ngang.

» **Ví dụ 6.** Tìm tiệm cận xiên của đồ thị hàm số  $y = f(x) = \frac{x^2 - x + 2}{x + 1}$ .

**Giải**

Ta có:

$$a = \lim_{x \rightarrow +\infty} \frac{f(x)}{x} = \lim_{x \rightarrow +\infty} \frac{x^2 - x + 2}{x^2 + x} = 1;$$

$$b = \lim_{x \rightarrow +\infty} [f(x) - x] = \lim_{x \rightarrow +\infty} \frac{-2x + 2}{x + 1} = -2.$$

(Tương tự,  $\lim_{x \rightarrow -\infty} \frac{f(x)}{x} = 1$ ,  $\lim_{x \rightarrow -\infty} [f(x) - x] = -2$ .)

Vậy đồ thị hàm số  $f(x)$  có tiệm cận xiên là đường thẳng  $y = x - 2$ .

**Nhận xét.** Trong thực hành, để tìm tiệm cận xiên của hàm phân thức trong Ví dụ 6, ta viết:

$$y = f(x) = \frac{x^2 - x + 2}{x + 1} = x - 2 + \frac{4}{x + 1}.$$

Ta có:  $\lim_{x \rightarrow +\infty} [f(x) - (x - 2)] = \lim_{x \rightarrow +\infty} \frac{4}{x + 1} = 0;$

$$\lim_{x \rightarrow -\infty} [f(x) - (x - 2)] = \lim_{x \rightarrow -\infty} \frac{4}{x + 1} = 0.$$

Do đó, đồ thị hàm số  $f(x)$  có tiệm cận xiên là đường thẳng  $y = x - 2$ .

» **Luyện tập 3.** Tìm các tiệm cận đứng và tiệm cận xiên của đồ thị hàm số  $y = f(x) = \frac{x^2 - 4x + 2}{1 - x}$ .

## Bài 4. Khảo sát sự biến thiên và vẽ đồ thị của hàm số

#### THUẬT NGỮ

- Chiều biến thiên
- Bảng biến thiên
- Cực trị
- Tiệm cận
- Đồ thị
- Tâm đối xứng
- Trục đối xứng

#### KIẾN THỨC, KĨ NĂNG

- Mô tả sơ đồ tổng quát để khảo sát hàm số (tìm tập xác định, xét chiều biến thiên, tìm cực trị, tìm tiệm cận, lập bảng biến thiên, vẽ đồ thị).
- Khảo sát tập xác định, chiều biến thiên, cực trị, tiệm cận, bảng biến thiên và vẽ đồ thị của các hàm số: hàm bậc ba, hàm phân thức hữu tỉ đơn giản.
- Nhận biết tính đối xứng (trục đối xứng, tâm đối xứng) của đồ thị các hàm số trên.

Một đơn vị sản xuất hàng tiêu dùng ước tính chi phí để sản xuất  $x$  đơn vị sản phẩm là  $C(x) = 2x + 45$  (triệu đồng). Khi đó, chi phí trung bình cho mỗi đơn vị sản phẩm là  $f(x) = \frac{C(x)}{x}$ . Hãy giải thích tại sao chi phí trung bình giảm theo  $x$  nhưng luôn lớn hơn 2 triệu đồng/sản phẩm. Điều này thể hiện trên đồ thị của hàm số  $f(x)$  trong Hình 1.27 như thế nào?

Hình 1.27

#### 1. SƠ ĐỒ KHÁO SÁT HÀM SỐ

##### » HĐ1. Làm quen với việc khảo sát và vẽ đồ thị hàm số

Cho hàm số  $y = x^2 - 4x + 3$ . Thực hiện lần lượt các yêu cầu sau:

- Tính  $y'$  và tìm các điểm tại đó  $y' = 0$ .
- Xét dấu  $y'$  để tìm các khoảng đồng biến, khoảng nghịch biến và cực trị của hàm số.
- Tính  $\lim_{x \rightarrow -\infty} y$ ,  $\lim_{x \rightarrow +\infty} y$  và lập bảng biến thiên của hàm số.
- Vẽ đồ thị của hàm số và nhận xét về tính đối xứng của đồ thị.

Sơ đồ khảo sát hàm số  $y = f(x)$ :

- Tìm tập xác định của hàm số.
- Khảo sát sự biến thiên của hàm số:
  - Tính đạo hàm  $y'$ . Tìm các điểm tại đó  $y'$  bằng 0 hoặc đạo hàm không tồn tại.
  - Xét dấu  $y'$  để chỉ ra các khoảng đơn điệu của hàm số.
  - Tìm cực trị của hàm số.
  - Tìm các giới hạn tại vô cực, giới hạn vô cực và tìm tiệm cận của đồ thị hàm số (nếu có).
  - Lập bảng biến thiên của hàm số.
- Vẽ đồ thị của hàm số dựa vào bảng biến thiên.

**Chú ý.** Khi vẽ đồ thị, nên xác định thêm một số điểm đặc biệt của đồ thị, chẳng hạn tìm giao điểm của đồ thị với các trục toạ độ (khi có và việc tìm không quá phức tạp). Ngoài ra, cần lưu ý đến tính đối xứng của đồ thị (đối xứng tâm, đối xứng trục).

#### 2. KHÁO SÁT VÀ VẼ ĐỒ THỊ HÀM SỐ ĐA THỨC BẬC BA

Trong mục này, ta sử dụng sơ đồ tổng quát ở Mục 1 để khảo sát sự biến thiên và vẽ đồ thị của hàm số bậc ba.

» **Ví dụ 1.** Khảo sát sự biến thiên và vẽ đồ thị của hàm số  $y = -x^3 + 3x^2 - 4$ .

**Giải**

1. Tập xác định của hàm số:  $\mathbb{R}$ .

2. Sự biến thiên:

- Ta có:  $y' = -3x^2 + 6x$ . Vậy  $y' = 0$  khi  $x = 0$  hoặc  $x = 2$ .
- Trên khoảng  $(0; 2)$ ,  $y' > 0$  nên hàm số đồng biến. Trên các khoảng  $(-\infty; 0)$  và  $(2; +\infty)$ ,  $y' < 0$  nên hàm số nghịch biến trên mỗi khoảng đó.
- Hàm số đạt cực tiểu tại  $x = 0$ , giá trị cực tiểu  $y_{CT} = -4$ . Hàm số đạt cực đại tại  $x = 2$ , giá trị cực đại  $y_{CD} = 0$ .
- Giới hạn tại vô cực:  $\lim_{x \rightarrow -\infty} y = \lim_{x \rightarrow -\infty} x^3 \left( -1 + \frac{3}{x} - \frac{4}{x^3} \right) = +\infty$ ;  $\lim_{x \rightarrow +\infty} y = \lim_{x \rightarrow +\infty} x^3 \left( -1 + \frac{3}{x} - \frac{4}{x^3} \right) = -\infty$ .
- Bảng biến thiên:

|      |           |   |    |   |   |   |           |
|------|-----------|---|----|---|---|---|-----------|
| $x$  | $-\infty$ |   | 0  |   | 2 |   | $+\infty$ |
| $y'$ |           | - | 0  | + | 0 | - |           |
| $y$  | $+\infty$ | ↘ |    | ↗ |   | ↘ |           |
|      |           |   |    |   |   |   |           |
|      |           |   | -4 |   | 0 |   | $-\infty$ |

3. Đồ thị (H.1.28):

- Giao điểm của đồ thị hàm số với trục tung là điểm  $(0; -4)$ .
- Ta có  $y = 0 \Leftrightarrow -x^3 + 3x^2 - 4 = 0 \Leftrightarrow -(x-2)^2(x+1) = 0 \Leftrightarrow x = -1$  hoặc  $x = 2$ . Do đó giao điểm của đồ thị hàm số với trục hoành là các điểm  $(-1; 0)$  và  $(2; 0)$ .
- Đồ thị hàm số có tâm đối xứng là điểm  $(1; -2)$ .

**Chú ý.** Đồ thị của hàm số bậc ba  $y = ax^3 + bx^2 + cx + d$  ( $a \neq 0$ ):

- Có tâm đối xứng là điểm có hoành độ thoả mãn  $y'' = 0$ , hay  $x = -\frac{b}{3a}$ .
- Không có tiệm cận.

Hình 1.28

» **Ví dụ 2.** Khảo sát sự biến thiên và vẽ đồ thị của hàm số  $y = x^3 - 2x^2 + 2x - 1$ .

**Giải**

1. Tập xác định của hàm số:  $\mathbb{R}$ .

2. Sự biến thiên:

- Ta có:  $y' = 3x^2 - 4x + 2$ . Vậy  $y' > 0$  với mọi  $x \in \mathbb{R}$ .
- Hàm số đồng biến trên khoảng  $(-\infty; +\infty)$ .
- Hàm số không có cực trị.
- Giới hạn tại vô cực:  $\lim_{x \rightarrow -\infty} y = \lim_{x \rightarrow -\infty} x^3 \left(1 - \frac{2}{x} + \frac{2}{x^2} - \frac{1}{x^3}\right) = -\infty$ ;

$$\lim_{x \rightarrow +\infty} y = \lim_{x \rightarrow +\infty} x^3 \left(1 - \frac{2}{x} + \frac{2}{x^2} - \frac{1}{x^3}\right) = +\infty.$$

- Bảng biến thiên:

|      |           |           |
|------|-----------|-----------|
| $x$  | $-\infty$ | $+\infty$ |
| $y'$ | +         |           |
| $y$  | $-\infty$ | $+\infty$ |

3. Đồ thị (H.1.29):

- Giao điểm của đồ thị hàm số với trục tung là điểm  $(0; -1)$ .
- Ta có  $y = 0 \Leftrightarrow x^3 - 2x^2 + 2x - 1 = 0$   
 $\Leftrightarrow (x-1)(x^2 - x + 1) = 0 \Leftrightarrow x = 1$ .

Do đó giao điểm của đồ thị hàm số với trục hoành là điểm  $(1; 0)$ .

- Đồ thị hàm số có tâm đối xứng là điểm  $\left(\frac{2}{3}; -\frac{7}{27}\right)$ .

Hình 1.29

» **Luyện tập 1.** Khảo sát sự biến thiên và vẽ đồ thị của hàm số  $y = -2x^3 + 3x^2 - 5x$ .

#### 3. KHÁO SÁT VÀ VẼ ĐỒ THỊ HÀM SỐ PHÂN THỨC HỮU TỈ

Trong mục này, ta sử dụng sơ đồ tổng quát ở Mục 1 để khảo sát sự biến thiên và vẽ đồ thị của một số hàm phân thức hữu tỉ đơn giản.

**a) Hàm số phân thức  $y = \frac{ax + b}{cx + d}$  ( $c \neq 0$ ,  $ad - bc \neq 0$ )**

» **Ví dụ 3.** Khảo sát sự biến thiên và vẽ đồ thị của hàm số  $y = \frac{x+1}{x-2}$ .

**Giải**

1. Tập xác định của hàm số:  $\mathbb{R} \setminus \{2\}$ .

##### 2. Sự biến thiên:

- Ta có:  $y' = -\frac{3}{(x-2)^2} < 0$  với mọi  $x \neq 2$ .
- Hàm số nghịch biến trên từng khoảng  $(-\infty; 2)$  và  $(2; +\infty)$ .
- Hàm số không có cực trị.
- Tiệm cận:  $\lim_{x \rightarrow 2^-} y = \lim_{x \rightarrow 2^-} \frac{x+1}{x-2} = -\infty$ ;  $\lim_{x \rightarrow 2^+} y = \lim_{x \rightarrow 2^+} \frac{x+1}{x-2} = +\infty$ ;  
 $\lim_{x \rightarrow +\infty} y = \lim_{x \rightarrow +\infty} \frac{x+1}{x-2} = 1$ ;  $\lim_{x \rightarrow -\infty} y = \lim_{x \rightarrow -\infty} \frac{x+1}{x-2} = 1$ .

Do đó, đồ thị của hàm số có tiệm cận đứng là đường thẳng  $x = 2$ , tiệm cận ngang là đường thẳng  $y = 1$ .

- Bảng biến thiên:

|      |           |            |           |           |              |
|------|-----------|------------|-----------|-----------|--------------|
| $x$  | $-\infty$ |            | 2         |           | $+\infty$    |
| $y'$ |           | -          |           | -         |              |
| $y$  | 1         | $\searrow$ | $-\infty$ | $+\infty$ | $\nearrow$ 1 |

##### 3. Đồ thị (H.1.30):

- Giao điểm của đồ thị hàm số với trục tung là điểm  $(0; -\frac{1}{2})$ .
- Giao điểm của đồ thị hàm số với trục hoành là điểm  $(-1; 0)$ .
- Đồ thị hàm số nhận giao điểm  $I(2; 1)$  của hai đường tiệm cận làm tâm đối xứng và nhận hai đường phân giác của các góc tạo bởi hai đường tiệm cận này làm trục đối xứng.

Hình 1.30

**Chú ý.** Đồ thị của hàm số phân thức  $y = \frac{ax+b}{cx+d}$  ( $c \neq 0, ad - bc \neq 0$ ):

- Nhận giao điểm của tiệm cận đứng và tiệm cận ngang làm tâm đối xứng;
- Nhận hai đường phân giác của các góc tạo bởi hai đường tiệm cận này làm các trục đối xứng.

» **Luyện tập 2.** Giải bài toán ở tình huống mở đầu, coi  $f(x)$  là hàm số xác định với  $x \geq 1$ .

» **Vận dụng.** Một bể chứa ban đầu có 200 lít nước. Sau đó, cứ mỗi phút người ta bơm thêm 40 lít nước, đồng thời cho vào bể 20 gam chất khử trùng (hoà tan).

- Tính thể tích nước và khối lượng chất khử trùng có trong bể sau  $t$  phút. Từ đó tính nồng độ chất khử trùng (gam/lít) trong bể sau  $t$  phút.

- b) Coi nồng độ chất khử trùng là hàm số  $f(t)$  với  $t \geq 0$ . Khảo sát sự biến thiên và vẽ đồ thị của hàm số này.
- c) Hãy giải thích tại sao nồng độ chất khử trùng tăng theo  $t$  nhưng không vượt ngưỡng 0,5 gam/lít.

##### **b) Hàm số phân thức $y = \frac{ax^2 + bx + c}{px + q}$ ( $a \neq 0, p \neq 0$ , đa thức tử không chia hết cho đa thức mẫu)**

» **Ví dụ 4.** Khảo sát và vẽ đồ thị của hàm số  $y = \frac{x^2 - x - 1}{x - 2}$ .

**Giải**

1. Tập xác định của hàm số:  $\mathbb{R} \setminus \{2\}$ .

2. Sự biến thiên: Viết  $y = x + 1 + \frac{1}{x - 2}$ .

- Ta có:  $y' = 1 - \frac{1}{(x - 2)^2} = \frac{x^2 - 4x + 3}{(x - 2)^2}$ . Vậy  $y' = 0 \Leftrightarrow \frac{x^2 - 4x + 3}{(x - 2)^2} = 0 \Leftrightarrow x = 1$  hoặc  $x = 3$ .
- Trên các khoảng  $(-\infty; 1)$  và  $(3; +\infty)$ ,  $y' > 0$  nên hàm số đồng biến trên từng khoảng này. Trên các khoảng  $(1; 2)$  và  $(2; 3)$ ,  $y' < 0$  nên hàm số nghịch biến trên từng khoảng này.
- Hàm số đạt cực đại tại  $x = 1$  với  $y_{CD} = 1$ ; hàm số đạt cực tiểu tại  $x = 3$  với  $y_{CT} = 5$ .
- $\lim_{x \rightarrow -\infty} y = \lim_{x \rightarrow -\infty} \frac{x^2 - x - 1}{x - 2} = \lim_{x \rightarrow -\infty} \frac{x - 1 - \frac{1}{x}}{1 - \frac{2}{x}} = -\infty$ ;  $\lim_{x \rightarrow +\infty} y = \lim_{x \rightarrow +\infty} \frac{x^2 - x - 1}{x - 2} = \lim_{x \rightarrow +\infty} \frac{x - 1 - \frac{1}{x}}{1 - \frac{2}{x}} = +\infty$ .
- Tiệm cận:  $\lim_{x \rightarrow 2^-} y = \lim_{x \rightarrow 2^-} \left( x + 1 + \frac{1}{x - 2} \right) = -\infty$ ;  $\lim_{x \rightarrow 2^+} y = \lim_{x \rightarrow 2^+} \left( x + 1 + \frac{1}{x - 2} \right) = +\infty$ ;  
 $\lim_{x \rightarrow +\infty} [y - (x + 1)] = \lim_{x \rightarrow +\infty} \frac{1}{x - 2} = 0$ ;  $\lim_{x \rightarrow -\infty} [y - (x + 1)] = \lim_{x \rightarrow -\infty} \frac{1}{x - 2} = 0$ .

Do đó, đồ thị hàm số có tiệm cận đứng là đường thẳng  $x = 2$ , tiệm cận xiên là đường thẳng  $y = x + 1$ .

• Bảng biến thiên:

|      |                         |   |                         |   |           |   |
|------|-------------------------|---|-------------------------|---|-----------|---|
| $x$  | $-\infty$               | 1 | 2                       | 3 | $+\infty$ |   |
| $y'$ | +                       | 0 | -                       | - | 0         | + |
| $y$  | $\nearrow$ 1 $\searrow$ |   | $\nearrow$ 5 $\searrow$ |   | $+\infty$ |   |
|      | $-\infty$               |   |                         |   | $+\infty$ |   |

3. Đồ thị (H.1.31):

- Giao điểm của đồ thị hàm số với trục tung là điểm  $\left(0; \frac{1}{2}\right)$ .

Hình 1.31

- Ta có  $y = 0 \Leftrightarrow \frac{x^2 - x - 1}{x - 2} = 0 \Leftrightarrow x = \frac{1 - \sqrt{5}}{2}$  hoặc  $x = \frac{1 + \sqrt{5}}{2}$ . Do đó giao điểm của đồ thị

hàm số với trục hoành là các điểm  $\left(\frac{1 - \sqrt{5}}{2}; 0\right)$  và  $\left(\frac{1 + \sqrt{5}}{2}; 0\right)$ .

- Đồ thị hàm số nhận giao điểm  $I(2; 3)$  của hai đường tiệm cận làm tâm đối xứng và nhận hai đường phân giác của các góc tạo bởi hai đường tiệm cận này làm các trục đối xứng.

###### » **Ví dụ 5.** Khảo sát sự biến thiên và vẽ đồ thị của hàm số $y = \frac{x^2 + x - 2}{x + 1}$ .

**Giải**

1. Tập xác định của hàm số:  $\mathbb{R} \setminus \{-1\}$ .

2. Sự biến thiên:

- Viết  $y = x - \frac{2}{x+1}$ , ta có  $y' = 1 + \frac{2}{(x+1)^2} > 0$  với mọi  $x \neq -1$ .

- Hàm số đồng biến trên từng khoảng  $(-\infty; -1)$  và  $(-1; +\infty)$ .

- Hàm số không có cực trị.

- $\lim_{x \rightarrow -\infty} y = \lim_{x \rightarrow -\infty} \frac{x^2 + x - 2}{x + 1} = \lim_{x \rightarrow -\infty} \frac{x+1 - \frac{2}{x}}{1 + \frac{1}{x}} = -\infty$ ;  $\lim_{x \rightarrow +\infty} y = \lim_{x \rightarrow +\infty} \frac{x^2 + x - 2}{x + 1} = \lim_{x \rightarrow +\infty} \frac{x+1 - \frac{2}{x}}{1 + \frac{1}{x}} = +\infty$ .

- Tiệm cận:  $\lim_{x \rightarrow -1^-} y = \lim_{x \rightarrow -1^-} \left(x - \frac{2}{x+1}\right) = +\infty$ ;  $\lim_{x \rightarrow -1^+} y = \lim_{x \rightarrow -1^+} \left(x - \frac{2}{x+1}\right) = -\infty$ ;

$$\lim_{x \rightarrow +\infty} [y - x] = \lim_{x \rightarrow +\infty} \left(-\frac{2}{x+1}\right) = 0; \lim_{x \rightarrow -\infty} [y - x] = \lim_{x \rightarrow -\infty} \left(-\frac{2}{x+1}\right) = 0.$$

Do đó, đồ thị hàm số có tiệm cận đứng là đường thẳng  $x = -1$ , tiệm cận xiên là đường thẳng  $y = x$ .

- Bảng biến thiên:

|      |           |                    |           |                    |           |
|------|-----------|--------------------|-----------|--------------------|-----------|
| $x$  | $-\infty$ |                    | $-1$      |                    | $+\infty$ |
| $y'$ |           | +                  |           | +                  |           |
| $y$  |           | $\nearrow +\infty$ |           | $\nearrow +\infty$ |           |
|      | $-\infty$ |                    | $-\infty$ |                    |           |

3. Đồ thị (H.1.32):

- Giao điểm của đồ thị hàm số với trục tung là điểm  $(0; -2)$ .

- Ta có  $y = 0 \Leftrightarrow \frac{x^2 + x - 2}{x + 1} = 0 \Leftrightarrow x = -2$  hoặc  $x = 1$ .

Do đó giao điểm của đồ thị hàm số với trục hoành là các điểm  $(-2; 0)$  và  $(1; 0)$ .

Hình 1.32

- Đồ thị hàm số nhận giao điểm  $l(-1; -1)$  của hai đường tiệm cận làm tâm đối xứng và nhận hai đường phân giác của góc tạo bởi hai đường tiệm cận này làm các trục đối xứng.

**Chú ý.** Đồ thị của hàm số phân thức  $y = \frac{ax^2 + bx + c}{px + q}$  ( $a \neq 0, p \neq 0$ , đa thức tử không chia hết cho đa thức mẫu):

- Nhận giao điểm của tiệm cận đứng và tiệm cận xiên làm tâm đối xứng;
- Nhận hai đường phân giác của các góc tạo bởi hai đường tiệm cận này làm các trục đối xứng.

» **Luyện tập 3.** Khảo sát sự biến thiên và vẽ đồ thị của hàm số  $y = \frac{-x^2 + 3x - 1}{x - 2}$ .

## Bài 5. Ứng dụng đạo hàm để giải quyết một số vấn đề liên quan đến thực tiễn

#### **THUẬT NGỮ**

- Tốc độ thay đổi tức thời
- Bài toán tối ưu hoá

#### **KIẾN THỨC, KĨ NĂNG**

Vận dụng đạo hàm và khảo sát hàm số để giải quyết một số vấn đề liên quan đến thực tiễn.

Một đội bóng đá thi đấu trong một sân vận động có sức chứa 55 000 khán giả. Với giá mỗi vé là 100 nghìn đồng, số khán giả trung bình là 27 000 người. Qua thăm dò dư luận, người ta thấy rằng mỗi khi giá vé giảm thêm 10 nghìn đồng, sẽ có thêm khoảng 3 000 khán giả. Hỏi ban tổ chức nên đặt giá vé là bao nhiêu để doanh thu từ tiền bán vé là lớn nhất?

#### **1. TỐC ĐỘ THAY ĐỔI CỦA MỘT ĐẠI LƯỢNG**

Giả sử  $y$  là một hàm số của  $x$  và ta viết  $y = f(x)$ . Nếu  $x$  thay đổi từ  $x_1$  đến  $x_2$ , thì sự thay đổi của  $x$  là

$$\Delta x = x_2 - x_1,$$

và sự thay đổi tương ứng của  $y$  là

$$\Delta y = f(x_2) - f(x_1).$$

Tỉ số  $\frac{\Delta y}{\Delta x} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$  được gọi là *tốc độ thay đổi trung bình* của  $y$  đối với  $x$  trên đoạn  $[x_1; x_2]$ .

Giới hạn  $\lim_{\Delta x \rightarrow 0} \frac{\Delta y}{\Delta x} = \lim_{x_2 \rightarrow x_1} \frac{f(x_2) - f(x_1)}{x_2 - x_1}$  được gọi là *tốc độ thay đổi tức thời* của  $y$  đối với  $x$  tại điểm  $x = x_1$ .

Như vậy, đạo hàm  $f'(a)$  là tốc độ thay đổi tức thời của đại lượng  $y = f(x)$  đối với  $x$  tại điểm  $x = a$ . Dưới đây, chúng ta xem xét một số ứng dụng của ý tưởng này đối với vật lí, hoá học, sinh học và kinh tế:

- Nếu  $s = s(t)$  là *hàm vị trí* của một vật chuyển động trên một đường thẳng thì  $v = s'(t)$  biểu thị *vận tốc tức thời* của vật (tốc độ thay đổi của độ dịch chuyển theo thời gian). Tốc độ thay đổi tức thời của vận tốc theo thời gian là *gia tốc tức thời* của vật:

$$a(t) = v'(t) = s''(t).$$

- Nếu  $C = C(t)$  là nồng độ của một chất tham gia phản ứng hoá học tại thời điểm  $t$ , thì  $C'(t)$  là *tốc độ phản ứng tức thời* (tức là độ thay đổi nồng độ) của chất đó tại thời điểm  $t$ .
- Nếu  $P = P(t)$  là số lượng cá thể trong một quần thể động vật hoặc thực vật tại thời điểm  $t$ , thì  $P'(t)$  biểu thị *tốc độ tăng trưởng tức thời* của quần thể tại thời điểm  $t$ .

- Nếu  $C = C(x)$  là hàm chi phí, tức là tổng chi phí khi sản xuất  $x$  đơn vị hàng hoá, thì tốc độ thay đổi tức thời  $C'(x)$  của chi phí đối với số lượng đơn vị hàng được sản xuất được gọi là chi phí biên.
- Về ý nghĩa kinh tế, chi phí biên  $C'(x)$  xấp xỉ với chi phí để sản xuất thêm một đơn vị hàng hoá tiếp theo, tức là đơn vị hàng hoá thứ  $x + 1$  (xem SGK *Toán 11 tập hai*, trang 87, bộ sách *Kết nối tri thức với cuộc sống*).

» **Ví dụ 1.** Khi bỏ qua sức cản của không khí, độ cao (mét) của một vật được phóng thẳng đứng lên trên từ điểm cách mặt đất 2 m với vận tốc ban đầu 24,5 m/s là  $h(t) = 2 + 24,5t - 4,9t^2$  (theo *Vật lí đại cương*, NXB Giáo dục Việt Nam, 2016).

- Tìm vận tốc của vật sau 2 giây.
- Khi nào vật đạt độ cao lớn nhất và độ cao lớn nhất đó là bao nhiêu?
- Khi nào thì vật chạm đất và vận tốc của vật lúc chạm đất là bao nhiêu?

**Giải**

- Theo ý nghĩa cơ học của đạo hàm, vận tốc của vật là  $v = h'(t) = 24,5 - 9,8t$  (m/s).

Do đó, vận tốc của vật sau 2 giây là  $v(2) = 24,5 - 9,8 \cdot 2 = 4,9$  (m/s).

- Vì  $h(t)$  là hàm số bậc hai có hệ số  $a = -4,9 < 0$  nên  $h(t)$  đạt giá trị lớn nhất tại

$$t = -\frac{b}{2a} = \frac{24,5}{2 \cdot 4,9} = 2,5 \text{ (giây)}. \text{ Khi đó, độ cao lớn nhất của vật là } h(2,5) = 32,625 \text{ (m)}.$$

- Vật chạm đất khi độ cao bằng 0, tức là  $h = 2 + 24,5t - 4,9t^2 = 0$ , hay  $t \approx 5,08$  (giây).

Vận tốc của vật lúc chạm đất là  $v(5,08) = 24,5 - 9,8 \cdot 5,08 = -25,284$  (m/s).

Vận tốc âm chứng tỏ chiều chuyển động của vật là ngược chiều dương (hướng lên trên) của trục đã chọn (khi lập phương trình chuyển động của vật).

» **Ví dụ 2.** Giả sử số lượng của một quần thể nấm men tại môi trường nuôi cấy trong phòng thí nghiệm được mô hình hoá bằng hàm số  $P(t) = \frac{a}{b + e^{-0,75t}}$ , trong đó thời gian  $t$  được tính bằng giờ. Tại thời điểm ban đầu  $t = 0$ , quần thể có 20 tế bào và tăng với tốc độ 12 tế bào/giờ. Tìm các giá trị của  $a$  và  $b$ . Theo mô hình này, điều gì xảy ra với quần thể nấm men về lâu dài?

**Giải**

Ta có:  $P'(t) = \frac{0,75ae^{-0,75t}}{(b + e^{-0,75t})^2}$ ,  $t \geq 0$ .

Theo đề bài, ta có:  $P(0) = 20$  và  $P'(0) = 12$ . Do đó, ta có hệ phương trình:

$$\begin{cases} \frac{a}{b+1} = 20 \\ \frac{0,75a}{(b+1)^2} = 12 \end{cases} \Leftrightarrow \begin{cases} a = 20(b+1) \\ \frac{15}{b+1} = 12. \end{cases}$$

Giải hệ phương trình này, ta được  $a = 25$  và  $b = \frac{1}{4}$ .

Khi đó,  $P'(t) = \frac{18,75e^{-0,75t}}{\left(\frac{1}{4} + e^{-0,75t}\right)^2} > 0, \forall t \geq 0$ , tức là số lượng quần thể nấm men luôn tăng.

Tuy nhiên, do  $\lim_{t \rightarrow +\infty} P(t) = \lim_{t \rightarrow +\infty} \frac{25}{\frac{1}{4} + e^{-0,75t}} = 100$  nên số lượng quần thể nấm men tăng nhưng

không vượt quá 100 tế bào.

» **Ví dụ 3.** Giả sử chi phí  $C(x)$  (nghìn đồng) để sản xuất  $x$  đơn vị của một loại hàng hoá nào đó được cho bởi hàm số  $C(x) = 30\,000 + 300x - 2,5x^2 + 0,125x^3$ .

a) Tìm hàm chi phí biên.

b) Tìm  $C'(200)$  và giải thích ý nghĩa.

c) So sánh  $C'(200)$  với chi phí sản xuất đơn vị hàng hoá thứ 201.

**Giải**

a) Hàm chi phí biên là  $C'(x) = 300 - 5x + 0,375x^2$ .

b) Ta có:  $C'(200) = 300 - 5 \cdot 200 + 0,375 \cdot 200^2 = 14\,300$ .

Chi phí biên tại  $x = 200$  là 14 300 nghìn đồng, nghĩa là chi phí để sản xuất thêm một đơn vị hàng hoá tiếp theo (đơn vị hàng hoá thứ 201) là khoảng 14 300 nghìn đồng.

c) Chi phí sản xuất đơn vị hàng hoá thứ 201 là

$$C(201) - C(200) = 1\,004\,372,625 - 990\,000 = 14\,372,625 \text{ (nghìn đồng)}.$$

Giá trị này xấp xỉ với chi phí biên  $C'(200)$  đã tính ở câu b.

» **Ví dụ 4.** Để loại bỏ  $x\%$  chất gây ô nhiễm không khí từ khí thải của một nhà máy, người ta ước tính chi phí cần bỏ ra là

$$C(x) = \frac{300x}{100 - x} \text{ (triệu đồng), } 0 \leq x < 100.$$

Khảo sát sự biến thiên và vẽ đồ thị của hàm số  $y = C(x)$ . Từ đó, hãy cho biết:

a) Chi phí cần bỏ ra sẽ thay đổi như thế nào khi  $x$  tăng?

b) Có thể loại bỏ được 100% chất gây ô nhiễm không khí không? Vì sao?

**Giải**

Xét hàm số  $y = C(x) = \frac{300x}{100 - x}$ ,  $0 \leq x < 100$ .

Ta có:

$$\bullet \quad y' = \frac{30\,000}{(100 - x)^2} > 0, \text{ với mọi } x \in [0; 100).$$

Do đó hàm số luôn đồng biến trên nửa khoảng  $[0; 100)$ .

$$\bullet \quad \lim_{x \rightarrow 100^-} C(x) = \lim_{x \rightarrow 100^-} \frac{300x}{100 - x} = +\infty, \text{ nên đồ thị hàm số có tiệm cận đứng là } x = 100.$$

Bảng biến thiên:

|         |                                                                                   |     |
|---------|-----------------------------------------------------------------------------------|-----|
| $x$     | 0                                                                                 | 100 |
| $C'(x)$ | +                                                                                 |     |
| $C(x)$  | <img data-bbox="319 207 787 267" src="875c93198d1f1909986ca8010c41eb15_img.jpg"/> |     |

Đồ thị hàm số như Hình 1.34.

a) Chi phí cần bỏ ra  $C(x)$  sẽ luôn tăng khi  $x$  tăng.

b) Vì  $\lim_{x \rightarrow 100^-} C(x) = +\infty$  (hàm số  $C(x)$  không xác định khi  $x = 100$ ) nên nhà máy không thể loại bỏ 100% chất gây ô nhiễm không khí (dù bỏ ra chi phí là bao nhiêu đi chăng nữa).

» **Luyện tập 1.** Khi máu di chuyển từ tim qua các động mạch chính rồi đến các mao mạch và quay trở lại qua các tĩnh mạch, huyết áp tâm thu (tức là áp lực của máu lên động mạch khi tim co bóp) liên tục giảm xuống. Giả sử một người có huyết áp tâm thu  $P$  (tính bằng mmHg) được cho bởi hàm số

$$P(t) = \frac{25t^2 + 125}{t^2 + 1}, \quad 0 \leq t \leq 10,$$

trong đó thời gian  $t$  được tính bằng giây. Tính tốc độ thay đổi của huyết áp sau 5 giây kể từ khi máu rời tim.

Hình 1.34

#### 2. MỘT VÀI BÀI TOÁN TỐI ƯU HOÁ ĐƠN giản

Một trong những ứng dụng phổ biến nhất của đạo hàm là cung cấp một phương pháp tổng quát, hiệu quả để giải những bài toán tối ưu hoá. Trong mục này, chúng ta sẽ giải quyết những vấn đề thường gặp như tối đa hoá diện tích, khối lượng, lợi nhuận, cũng như tối thiểu hoá khoảng cách, thời gian, chi phí.

Khi giải những bài toán như vậy, khó khăn lớn nhất thường là việc chuyển đổi bài toán thực tế cho bằng lời thành bài toán tối ưu hoá toán học bằng cách thiết lập một hàm số phù hợp mà ta cần tìm giá trị lớn nhất hoặc giá trị nhỏ nhất của nó, trên miền biến thiên phù hợp của biến số.

Quy trình giải một bài toán tối ưu hoá:

**Bước 1.** Xác định đại lượng  $Q$  mà ta cần làm cho giá trị của đại lượng ấy lớn nhất hoặc nhỏ nhất và biểu diễn nó qua các đại lượng khác trong bài toán.

Bước 2. Chọn một đại lượng thích hợp nào đó, kí hiệu là  $x$ , và biểu diễn các đại lượng khác ở Bước 1 theo  $x$ . Khi đó, đại lượng  $Q$  sẽ là hàm số của một biến  $x$ . Tìm tập xác định của hàm số  $Q = Q(x)$ .

Bước 3. Tìm giá trị lớn nhất hoặc giá trị nhỏ nhất của hàm số  $Q = Q(x)$  bằng các phương pháp đã biết và kết luận.

» **Ví dụ 5.** Một nhà sản xuất cần làm những hộp đựng hình trụ có thể tích 1 lít. Tìm các kích thước của hộp đựng để chi phí vật liệu dùng để sản xuất là nhỏ nhất (kết quả được tính theo centimét và làm tròn đến chữ số thập phân thứ hai).

**Giải**

Đổi 1 lít = 1 000 cm<sup>3</sup>.

Gọi  $r$  (cm) là bán kính đáy của hình trụ,  $h$  (cm) là chiều cao của hình trụ.

Diện tích toàn phần của hình trụ là:  $S = 2\pi r^2 + 2\pi rh$ .

Do thể tích của hình trụ là 1 000 cm<sup>3</sup> nên ta có:  $1\,000 = V = \pi r^2 h$ , hay  $h = \frac{1\,000}{\pi r^2}$ .

Do đó, diện tích toàn phần của hình trụ là:  $S = 2\pi r^2 + \frac{2\,000}{r}$ ,  $r > 0$ .

Ta cần tìm  $r$  sao cho  $S$  đạt giá trị nhỏ nhất. Ta có:

$$S' = 4\pi r - \frac{2\,000}{r^2} = \frac{4\pi r^3 - 2\,000}{r^2}; \quad S' = 0 \Leftrightarrow \pi r^3 = 500 \Leftrightarrow r = \sqrt[3]{\frac{500}{\pi}}.$$

Bảng biến thiên:

|         |           |                                           |           |
|---------|-----------|-------------------------------------------|-----------|
| $r$     | 0         | $\sqrt[3]{\frac{500}{\pi}}$               | $+\infty$ |
| $S'(r)$ |           | - 0 +                                     |           |
| $S(r)$  | $+\infty$ | $S\left(\sqrt[3]{\frac{500}{\pi}}\right)$ | $+\infty$ |

Khi đó:  $h = \frac{1\,000}{\pi r^2} = \frac{1\,000}{\pi \sqrt[3]{\frac{500}{\pi}}^2} = \frac{100}{\sqrt[3]{250\pi}}$ .

Vậy cần sản xuất các hộp đựng hình trụ có bán kính đáy  $r = \sqrt[3]{\frac{500}{\pi}} \approx 5,42$  (cm) và chiều cao  $h = \frac{100}{\sqrt[3]{250\pi}} \approx 10,84$  (cm).

**Chú ý.** Từ lời giải Ví dụ 5 ta thấy: Nếu hình trụ có thể tích  $V$  không đổi thì diện tích bề mặt của hình trụ nhỏ nhất khi chiều cao bằng đường kính đáy.

» **Luyện tập 2.** Anh An chèo thuyền từ điểm A trên bờ một con sông thẳng rộng 3 km và muốn đến điểm B ở bờ đối diện cách 8 km về phía hạ lưu càng nhanh càng tốt (H.1.35). Anh An có thể chèo thuyền trực tiếp qua sông đến điểm C rồi chạy bộ đến B, hoặc anh có thể chèo thuyền thẳng đến B, hoặc anh cũng có thể chèo thuyền đến một điểm D nào đó giữa C và B rồi chạy bộ đến B. Nếu vận tốc chèo thuyền là 6 km/h và vận tốc chạy bộ là 8 km/h thì anh An phải chèo thuyền sang bờ ở điểm nào để đến được B càng sớm càng tốt? (Giả sử rằng vận tốc của nước là không đáng kể so với vận tốc chèo thuyền của anh An).

Hình 1.35

Nhắc lại rằng nếu  $C(x)$  là hàm chi phí, tức là chi phí sản xuất  $x$  đơn vị của một sản phẩm nào đó, thì chi phí biên là tốc độ thay đổi của  $C$  đối với  $x$ , tức là đạo hàm  $C'(x)$ .

Gọi  $p(x)$  là giá bán mỗi đơn vị mà công ty có thể tính nếu bán  $x$  đơn vị. Khi đó,  $p$  được gọi là hàm cầu (hay hàm giá) và chúng ta mong đợi đó là một hàm giảm của  $x$ . Nếu  $x$  đơn vị được bán và giá mỗi đơn vị là  $p(x)$  thì tổng doanh thu là

$$R(x) = x \cdot p(x)$$

và  $R(x)$  được gọi là hàm doanh thu. Đạo hàm  $R'(x)$  của hàm doanh thu được gọi là hàm doanh thu biên và là tốc độ thay đổi của doanh thu đối với số lượng đơn vị sản phẩm bán ra.

Nếu  $x$  đơn vị được bán, thì tổng lợi nhuận là

$$P(x) = R(x) - C(x)$$

và  $P(x)$  được gọi là hàm lợi nhuận. Hàm lợi nhuận biên là đạo hàm  $P'(x)$  của hàm lợi nhuận.

» **Ví dụ 6.** Giải bài toán trong tình huống mở đầu.

**Giải**

Gọi  $p$  (nghìn đồng) là giá của mỗi vé;  $x$  là số khán giả mua vé. Ta cần xác định hàm cầu  $p = p(x)$ . Theo giả thiết, tốc độ thay đổi của  $x$  tỉ lệ với tốc độ thay đổi của  $p$  nên hàm số  $p = p(x)$  là hàm số bậc nhất.

Giá vé  $p_1 = 100$  ứng với  $x_1 = 27\,000$  và giá vé  $p_2 = 90$  ứng với  $x_2 = 27\,000 + 3\,000 = 30\,000$ .

Do đó, phương trình đường thẳng  $p = ax + b$  đi qua hai điểm  $(27\,000; 100)$  và  $(30\,000; 90)$

$$\text{là } p - 100 = \frac{100 - 90}{27\,000 - 30\,000}(x - 27\,000), \text{ hay } p - 100 = -\frac{1}{300}(x - 27\,000),$$

tức là  $x = -300p + 57\,000$ .

Hàm doanh thu từ tiền bán vé là

$$R(p) = px = p(-300p + 57\,000) = -300p^2 + 57\,000p.$$

Ta cần tìm  $p$  sao cho  $R$  đạt giá trị lớn nhất. Ta có:

$$R'(p) = -600p + 57\,000; R'(p) = 0 \Leftrightarrow p = 95.$$

Bảng biến thiên:

|         |   |           |           |
|---------|---|-----------|-----------|
| $p$     | 0 | 95        | $+\infty$ |
| $R'(p)$ | + | 0         | -         |
| $R(p)$  | 0 | 2 707 500 | $-\infty$ |

Vậy với giá vé là 95 nghìn đồng một vé thì doanh thu bán vé là lớn nhất.

» **Ví dụ 7.** Một nhà phân tích thị trường làm việc cho một công ty sản xuất thiết bị gia dụng nhận thấy rằng nếu công ty sản xuất và bán  $x$  chiếc máy xay sinh tố hằng tháng thì lợi nhuận thu được (nghìn đồng) là

$$P(x) = -0,3x^3 + 36x^2 + 1800x - 48\,000.$$

Khảo sát sự biến thiên và vẽ đồ thị hàm số  $y = P(x)$ ,  $x \geq 0$ . Sử dụng đồ thị đã vẽ để trả lời các câu hỏi sau:

- a) Khi chỉ sản xuất một vài máy xay sinh tố, công ty sẽ bị lỗ (vì lúc này lợi nhuận âm). Hỏi hằng tháng công ty phải sản xuất ít nhất bao nhiêu chiếc máy xay sinh tố để hoà vốn?
- b) Lợi nhuận lớn nhất mà công ty có thể đạt được là bao nhiêu? Công ty có nên sản xuất 200 chiếc máy xay sinh tố hằng tháng hay không?

**Giải**

Xét hàm số  $y = P(x) = -0,3x^3 + 36x^2 + 1800x - 48\,000$ ,  $x \geq 0$ .

Ta có:

- $y' = P'(x) = -0,9x^2 + 72x + 1800$ ;  $y' = 0 \Leftrightarrow x = 100$  (vì  $x \geq 0$ ).  
 $P'(x) > 0$  với mọi  $x \in [0; 100)$ ,  $P'(x) < 0$  với mọi  $x \in (100; +\infty)$ .  
 Do đó hàm số đồng biến trên nửa khoảng  $[0; 100)$  và nghịch biến trên khoảng  $(100; +\infty)$ .  
 Tại  $x = 100$ , hàm số đạt cực đại và  $y_{CD} = y(100) = 192\,000$ .
- $\lim_{x \rightarrow +\infty} P(x) = -\infty$ .

Bảng biến thiên:

|         |         |         |           |
|---------|---------|---------|-----------|
| $x$     | 0       | 100     | $+\infty$ |
| $P'(x)$ | +       | 0       | -         |
| $P(x)$  | -48 000 | 192 000 | $-\infty$ |

Đồ thị hàm số như Hình 1.36 (ở đây ta lấy một đơn vị trên trục hoành bằng 1 000 đơn vị trên trục tung).

Từ đồ thị đã vẽ suy ra:

- Đồ thị xuất phát từ điểm  $(0; -48\ 000)$ , ở phía dưới trục hoành (tức là công ty đang bị lỗ), và giao với trục hoành tại điểm đầu tiên có hoành độ  $x = 20$ . Do đó, hằng tháng công ty cần sản xuất ít nhất 20 chiếc máy xay sinh tố để hoà vốn.
- Từ đồ thị ta thấy khi sản xuất hơn 100 chiếc máy xay sinh tố mỗi tháng thì càng sản xuất nhiều lợi nhuận càng giảm. Do đó, công ty không nên sản xuất 200 chiếc máy xay sinh tố hằng tháng.

Hình 1.36

Lợi nhuận lớn nhất mà công ty có thể thu được là  $y_{CD} = y(100) = 192\ 000$  (nghìn đồng), tức là 192 triệu đồng, đạt được khi sản xuất đúng 100 chiếc máy xay sinh tố mỗi tháng.

» **Vận dụng.** Một nhà sản xuất trung bình bán được 1 000 ti vi màn hình phẳng mỗi tuần với giá 14 triệu đồng một chiếc. Một cuộc khảo sát thị trường chỉ ra rằng nếu cứ giảm giá bán 500 nghìn đồng, số lượng ti vi bán ra sẽ tăng thêm khoảng 100 ti vi mỗi tuần.

- Tìm hàm cầu.
- Công ty nên giảm giá bao nhiêu cho người mua để doanh thu là lớn nhất?
- Nếu hàm chi phí hằng tuần là  $C(x) = 12\ 000 - 3x$  (triệu đồng), trong đó  $x$  là số ti vi bán ra trong tuần, nhà sản xuất nên đặt giá bán như thế nào để lợi nhuận là lớn nhất?

# CHƯƠNG II. VECTƠ VÀ HỆ TRỤC TOẠ ĐỘ TRONG KHÔNG GIAN

## Bài 6. Vectơ trong không gian

#### THUẬT NGỮ

Vectơ trong không gian

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết vectơ trong không gian.
- Nhận biết và thực hiện các phép toán vectơ trong không gian.

Ở lớp 10, ta đã biết về vectơ trong mặt phẳng và biết sử dụng vectơ để biểu thị các đại lượng có hướng và độ lớn trong mặt phẳng, ví dụ như vận tốc hay lực. Đối với các đại lượng có hướng trong không gian, ta có thể sử dụng vectơ để biểu diễn chúng hay không? Các phép toán vectơ trong trường hợp này giống và khác như thế nào với các phép toán vectơ trong mặt phẳng?

Hình 2.1. Các mũi tên chỉ đường gợi lên hình ảnh về vectơ trong không gian.

#### 1. VECTƠ TRONG KHÔNG GIAN

##### » HØ1. Nhận biết vectơ trong không gian

Trong Hình 2.2, lực căng dây (được tạo ra bởi sức nặng của kiện hàng) được thể hiện bởi các đoạn thẳng có mũi tên màu đỏ.

- a) Các đoạn thẳng này cho biết gì về hướng và độ lớn của các lực căng dây?
- b) Các đoạn thẳng này có cùng nằm trong một mặt phẳng không?

Hình 2.2

- Vectơ trong không gian là một đoạn thẳng có hướng.
- Độ dài của vectơ trong không gian là khoảng cách giữa điểm đầu và điểm cuối của vectơ đó.

**?** Hình 2.3 cho ta ví dụ về một số đại lượng có thể được biểu diễn bởi vectơ trong không gian. Hãy tìm thêm một số ví dụ tương tự.

Hình 2.3. Vận tốc gió và vận tốc của máy bay có thể được biểu diễn bởi vectơ trong không gian.

**Chú ý.** Tương tự như vectơ trong mặt phẳng, đối với vectơ trong không gian ta cũng có các kí hiệu và khái niệm sau:

- Vectơ có điểm đầu là  $A$  và điểm cuối là  $B$  được kí hiệu là  $\overrightarrow{AB}$ .
- Khi không cần chỉ rõ điểm đầu và điểm cuối của vectơ thì vectơ còn được kí hiệu là  $\vec{a}$ ,  $\vec{b}$ ,  $\vec{x}$ ,  $\vec{y}$ ,...
- Độ dài của vectơ  $\overrightarrow{AB}$  được kí hiệu là  $|\overrightarrow{AB}|$ , độ dài của vectơ  $\vec{a}$  được kí hiệu là  $|\vec{a}|$ .
- Đường thẳng đi qua điểm đầu và điểm cuối của một vectơ được gọi là giá của vectơ đó (H.2.4).

Hình 2.4. Đường thẳng  $d$  là giá của vectơ  $\vec{a}$ .

» **Ví dụ 1.** Cho tứ diện  $ABCD$  có độ dài mỗi cạnh bằng 1 (H.2.5).

- Có bao nhiêu vectơ có điểm đầu là  $A$  và điểm cuối là một trong các đỉnh còn lại của tứ diện?
- Trong các vectơ tìm được ở câu a, những vectơ nào có giá nằm trong mặt phẳng  $(ABC)$ ?
- Tính độ dài của các vectơ tìm được ở câu a.

**Giải**

- Có ba vectơ là  $\overrightarrow{AB}$ ,  $\overrightarrow{AC}$  và  $\overrightarrow{AD}$ .
- Trong ba vectơ  $\overrightarrow{AB}$ ,  $\overrightarrow{AC}$  và  $\overrightarrow{AD}$  chỉ có hai vectơ  $\overrightarrow{AB}$  và  $\overrightarrow{AC}$  có giá nằm trong mặt phẳng  $(ABC)$ .
- Vì tứ diện  $ABCD$  có độ dài mỗi cạnh bằng 1 nên  $|\overrightarrow{AB}| = |\overrightarrow{AC}| = |\overrightarrow{AD}| = 1$ .

Hình 2.5

» **Luyện tập 1.** Cho hình lập phương  $ABCD.A'B'C'D'$  (H.2.6).

Trong các vectơ  $\overrightarrow{AC}$ ,  $\overrightarrow{AD}$ ,  $\overrightarrow{A'D'}$ :

- Hai vectơ nào có giá cùng nằm trong mặt phẳng  $(ABCD)$ ?
- Hai vectơ nào có cùng độ dài?

Hình 2.6

» **HĐ 2.** Hình thành khái niệm hai vectơ cùng phương, cùng hướng/ngược hướng, hai vectơ bằng nhau trong không gian

Cho hình hộp  $ABCD.A'B'C'D'$  (H.2.7).

- So sánh độ dài của hai vectơ  $\overrightarrow{AB}$  và  $\overrightarrow{D'C'}$ .
- Nhận xét về giá của hai vectơ  $\overrightarrow{AB}$  và  $\overrightarrow{D'C'}$ .
- Hai vectơ  $\overrightarrow{AB}$  và  $\overrightarrow{D'C'}$  có cùng phương không? Có cùng hướng không?

Hình 2.7

Tương tự như trường hợp của vectơ trong mặt phẳng, ta có các khái niệm sau đối với vectơ trong không gian:

- Hai vectơ được gọi là cùng phương nếu chúng có giá song song hoặc trùng nhau.
- Nếu hai vectơ cùng phương thì chúng cùng hướng hoặc ngược hướng.
- Hai vectơ  $\vec{a}$  và  $\vec{b}$  được gọi là bằng nhau, kí hiệu  $\vec{a} = \vec{b}$ , nếu chúng có cùng độ dài và cùng hướng.

**?** Nếu hai vectơ cùng bằng một vectơ thứ ba thì hai vectơ đó có bằng nhau không?

**Chú ý.** Tương tự như vectơ trong mặt phẳng, ta có tính chất và các quy ước sau đối với vectơ trong không gian:

- Trong không gian, với mỗi điểm  $O$  và vectơ  $\vec{a}$  cho trước, có duy nhất điểm  $M$  sao cho  $\overrightarrow{OM} = \vec{a}$ .

- Các vectơ có điểm đầu và điểm cuối trùng nhau, ví dụ như  $\overrightarrow{AA}, \overrightarrow{BB}, \dots$  gọi là các vectơ-không.
- Ta quy ước vectơ-không có độ dài là 0, cùng hướng (và vì vậy cùng phương) với mọi vectơ. Do đó, các vectơ-không đều bằng nhau và được kí hiệu chung là  $\vec{0}$ .

» **Ví dụ 2.** Cho hình lăng trụ  $ABC.A'B'C'$  (H.2.8).

- Trong ba vectơ  $\overrightarrow{BC}, \overrightarrow{CC'}$  và  $\overrightarrow{B'B}$ , vectơ nào bằng vectơ  $\overrightarrow{AA'}$ ? Giải thích vì sao.
- Gọi  $M$  là trung điểm của cạnh  $BC$ . Xác định điểm  $M'$  sao cho  $\overrightarrow{MM'} = \overrightarrow{AA'}$ .

**Giải**

- Hai đường thẳng  $AA'$  và  $BC$  chéo nhau nên hai vectơ  $\overrightarrow{AA'}$  và  $\overrightarrow{BC}$  không cùng phương. Do đó, hai vectơ  $\overrightarrow{AA'}$  và  $\overrightarrow{BC}$  không bằng nhau.

Tứ giác  $ACC'A'$  là hình bình hành nên  $AA' \parallel CC'$  và  $AA' = CC'$ . Hai vectơ  $\overrightarrow{AA'}$  và  $\overrightarrow{CC'}$  có cùng độ dài và cùng hướng nên hai vectơ đó bằng nhau.

Tương tự, hai vectơ  $\overrightarrow{AA'}$  và  $\overrightarrow{B'B}$  có cùng độ dài và ngược hướng nên hai vectơ  $\overrightarrow{AA'}$  và  $\overrightarrow{B'B}$  không bằng nhau.

- Gọi  $M'$  là trung điểm của cạnh  $B'C'$ . Vì tứ giác  $BCC'B'$  là hình bình hành nên  $MM' \parallel BB'$  và  $MM' = BB'$ . Hình lăng trụ  $ABC.A'B'C'$  có  $AA' \parallel BB'$  và  $AA' = BB'$ , suy ra  $MM' \parallel AA'$  và  $MM' = AA'$ . Hai vectơ  $\overrightarrow{MM'}$  và  $\overrightarrow{AA'}$  có cùng độ dài và cùng hướng nên  $\overrightarrow{MM'} = \overrightarrow{AA'}$ . Vậy trung điểm của cạnh  $B'C'$  là điểm  $M'$  cần tìm.

Hình 2.8

» **Luyện tập 2.** Cho hình chóp  $S.ABCD$  có đáy  $ABCD$  là hình bình hành.

- Trong ba vectơ  $\overrightarrow{SC}, \overrightarrow{AD}$  và  $\overrightarrow{DC}$ , vectơ nào bằng vectơ  $\overrightarrow{AB}$ ?
- Gọi  $M$  là một điểm thuộc cạnh  $AD$ . Xác định điểm  $N$  sao cho  $\overrightarrow{MN} = \overrightarrow{AB}$ .

» **Vận dụng 1.** Một toà nhà có chiều cao của các tầng là như nhau. Một chiếc thang máy di chuyển từ tầng 15 lên tầng 22 của toà nhà, sau đó di chuyển từ tầng 22 lên tầng 29. Các vectơ biểu diễn độ dịch chuyển của thang máy trong hai lần di chuyển đó có bằng nhau không? Giải thích vì sao.

Hình 2.9

#### 2. TỔNG VÀ HIỆU CỦA HAI VECTƠ TRONG KHÔNG GIAN

##### a) Tổng của hai vectơ trong không gian

###### » HĐ3. Hình thành khái niệm tổng của hai vectơ trong không gian

Trong không gian, cho hai vectơ  $\vec{a}$  và  $\vec{b}$  không cùng phương. Lấy điểm  $A$  và vẽ các vectơ  $\overrightarrow{AB} = \vec{a}$ ,  $\overrightarrow{BC} = \vec{b}$ . Lấy điểm  $A'$  khác  $A$  và vẽ các vectơ  $\overrightarrow{A'B'} = \vec{a}$ ,  $\overrightarrow{B'C'} = \vec{b}$  (H.2.10).

a) Giải thích vì sao  $\overrightarrow{AA'} = \overrightarrow{BB'}$  và  $\overrightarrow{BB'} = \overrightarrow{CC'}$ .

b) Giải thích vì sao  $AA'C'C$  là hình bình hành, từ đó suy ra  $\overrightarrow{AC} = \overrightarrow{A'C'}$ .

Bốn điểm  $A, B, A', B'$  đồng phẳng và tứ giác  $ABB'A'$  là hình bình hành.

Hình 2.10

Trong không gian, cho hai vectơ  $\vec{a}$  và  $\vec{b}$ . Lấy một điểm  $A$  bất kì và các điểm  $B, C$  sao cho  $\overrightarrow{AB} = \vec{a}$ ,  $\overrightarrow{BC} = \vec{b}$ . Khi đó, vectơ  $\overrightarrow{AC}$  được gọi là **tổng của hai vectơ**  $\vec{a}$  và  $\vec{b}$ , kí hiệu là  $\vec{a} + \vec{b}$ .

Trong không gian, phép lấy tổng của hai vectơ được gọi là **phép cộng vectơ**.

Hình 2.11

**Nhận xét.** Quy tắc ba điểm và quy tắc hình bình hành trong mặt phẳng vẫn đúng trong không gian:

- Nếu  $A, B, C$  là ba điểm bất kì thì  $\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$ ;
- Nếu  $ABCD$  là hình bình hành thì  $\overrightarrow{AB} + \overrightarrow{AD} = \overrightarrow{AC}$ .

###### » Ví dụ 3. Cho hình lập phương $ABCD.A'B'C'D'$ có độ dài mỗi cạnh bằng 1 (H.2.12). Tính độ dài của vectơ $\overrightarrow{BC} + \overrightarrow{DD'}$ .

**Giải**

Tứ giác  $ABCD$  là hình vuông nên  $\overrightarrow{BC} = \overrightarrow{AD}$ .

Do đó  $\overrightarrow{BC} + \overrightarrow{DD'} = \overrightarrow{AD} + \overrightarrow{DD'} = \overrightarrow{AD'}$ .

Tứ giác  $ADD'A'$  là hình vuông nên  $AD' = \sqrt{AD^2 + DD'^2} = \sqrt{2}$ , suy ra  $|\overrightarrow{BC} + \overrightarrow{DD'}| = \sqrt{2}$ .

Hình 2.12

» **Luyện tập 3.** Trong Ví dụ 3, hãy tính độ dài của vectơ  $\overrightarrow{AC} + \overrightarrow{C'D'}$ .

**Chú ý.** Tương tự như phép cộng vectơ trong mặt phẳng, phép cộng vectơ trong không gian có các tính chất sau:

- Tính chất giao hoán: Nếu  $\vec{a}$  và  $\vec{b}$  là hai vectơ bất kì thì  $\vec{a} + \vec{b} = \vec{b} + \vec{a}$ .
- Tính chất kết hợp: Nếu  $\vec{a}, \vec{b}$  và  $\vec{c}$  là ba vectơ bất kì thì  $(\vec{a} + \vec{b}) + \vec{c} = \vec{a} + (\vec{b} + \vec{c})$ .
- Tính chất cộng với vectơ  $\vec{0}$ : Nếu  $\vec{a}$  là một vectơ bất kì thì  $\vec{a} + \vec{0} = \vec{0} + \vec{a} = \vec{a}$ .

Từ tính chất kết hợp của phép cộng vectơ trong không gian, ta có thể viết tổng của ba vectơ  $\vec{a}, \vec{b}$  và  $\vec{c}$  là  $\vec{a} + \vec{b} + \vec{c}$  mà không cần sử dụng các dấu ngoặc. Tương tự đối với tổng của nhiều vectơ trong không gian.

» **Ví dụ 4.** Cho tứ diện  $ABCD$  (H.2.13). Chứng minh rằng  $\overrightarrow{AC} + \overrightarrow{BD} = \overrightarrow{AD} + \overrightarrow{BC}$ .

**Giải**

Theo quy tắc ba điểm trong không gian, ta có  $\overrightarrow{AC} = \overrightarrow{AD} + \overrightarrow{DC}$ .

Từ đó lần lượt áp dụng tính chất của phép cộng vectơ trong không gian, ta được:

$$\begin{aligned}\overrightarrow{AC} + \overrightarrow{BD} &= (\overrightarrow{AD} + \overrightarrow{DC}) + \overrightarrow{BD} = \overrightarrow{AD} + (\overrightarrow{DC} + \overrightarrow{BD}) \\ &= \overrightarrow{AD} + (\overrightarrow{BD} + \overrightarrow{DC}) = \overrightarrow{AD} + \overrightarrow{BC}.\end{aligned}$$

Hình 2.13

» **Luyện tập 4.** Cho tứ diện  $ABCD$  (H.2.13). Chứng minh rằng  $\overrightarrow{AB} + \overrightarrow{CD} = \overrightarrow{AD} + \overrightarrow{CB}$ .

» **HĐ4. Thiết lập quy tắc hình hộp**

Cho hình hộp  $ABCD.A'B'C'D'$  (H.2.14).

- Hai vectơ  $\overrightarrow{AB} + \overrightarrow{AD}$  và  $\overrightarrow{AC}$  có bằng nhau hay không?
- Hai vectơ  $\overrightarrow{AB} + \overrightarrow{AD} + \overrightarrow{AA'}$  và  $\overrightarrow{AC'}$  có bằng nhau hay không?

Hình 2.14

Ta có thể áp dụng quy tắc hình bình hành trong không gian.

Kết quả sau đây được gọi là **quy tắc hình hộp**.

Cho hình hộp  $ABCD.A'B'C'D'$ . Khi đó, ta có  $\overrightarrow{AB} + \overrightarrow{AD} + \overrightarrow{AA'} = \overrightarrow{AC'}$ .

**?** Trong Hình 2.14, hãy phát biểu quy tắc hình hộp với các vectơ có điểm đầu là B.

» **Ví dụ 5.** Cho hình hộp  $ABCD.A'B'C'D'$  (H.2.14). Chứng minh rằng  $\overrightarrow{BC} + \overrightarrow{DC} + \overrightarrow{AA'} = \overrightarrow{AC'}$ .

**Giải**

Vì tứ giác  $ABCD$  là hình bình hành nên  $\overrightarrow{BC} = \overrightarrow{AD}$  và  $\overrightarrow{DC} = \overrightarrow{AB}$ . Áp dụng quy tắc hình hộp suy ra  $\overrightarrow{BC} + \overrightarrow{DC} + \overrightarrow{AA'} = \overrightarrow{AD} + \overrightarrow{AB} + \overrightarrow{AA'} = \overrightarrow{AC'}$ .

» **Luyện tập 5.** Cho hình hộp chữ nhật  $ABCD.A'B'C'D'$ . Chứng minh rằng  $\overrightarrow{BB'} + \overrightarrow{CD} + \overrightarrow{AD} = \overrightarrow{BD'}$ .

##### b) Hiệu của hai vectơ trong không gian

###### » H05. Nhận biết vectơ đối của một vectơ trong không gian

Hình 2.15 mô tả một lọ hoa được đặt trên bàn, trọng lượng của lọ hoa tạo nên một lực tác dụng lên mặt bàn và một phản lực từ mặt bàn lên lọ hoa. Có nhận xét gì về độ dài và hướng của các vectơ biểu diễn hai lực đó?

Hình 2.15

Theo Định luật III Newton, lực tác dụng và phản lực là hai lực cùng phương, ngược hướng và có độ lớn bằng nhau.

Trong không gian, vectơ có cùng độ dài và ngược hướng với vectơ  $\vec{a}$  được gọi là vectơ đối của vectơ  $\vec{a}$ , kí hiệu là  $-\vec{a}$ .

###### Chú ý

- Hai vectơ là đối nhau nếu và chỉ nếu tổng của chúng bằng  $\vec{0}$ .
- Vectơ  $\overrightarrow{BA}$  là một vectơ đối của vectơ  $\overrightarrow{AB}$ .
- Vectơ  $\vec{0}$  được coi là vectơ đối của chính nó.

Tương tự như hiệu của hai vectơ trong mặt phẳng, ta có định nghĩa về hiệu của hai vectơ trong không gian:

Vectơ  $\vec{a} + (-\vec{b})$  được gọi là **hiệu của hai vectơ**  $\vec{a}$  và  $\vec{b}$  và kí hiệu là  $\vec{a} - \vec{b}$ .

Trong không gian, phép lấy hiệu của hai vectơ được gọi là **phép trừ vectơ**.

**Nhận xét.** Với ba điểm  $O, A, B$  bất kì trong không gian, ta có  $\overrightarrow{OB} - \overrightarrow{OA} = \overrightarrow{AB}$ .

###### » Ví dụ 6. Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Gọi $M, N$ lần lượt là trung điểm của $AB, CD$ (H.2.16). Chứng minh rằng:

- $\overrightarrow{AM}$  và  $\overrightarrow{CN}$  là hai vectơ đối nhau;
- $\overrightarrow{SC} - \overrightarrow{AM} - \overrightarrow{AN} = \overrightarrow{SA}$ .

Hình 2.16

###### Giải

a) Tứ giác  $ABCD$  là hình bình hành nên  $AB = CD$  và  $AB \parallel CD$ , suy ra  $AM = CN$  và  $AM \parallel CN$ .

Hai vectơ  $\overrightarrow{AM}$  và  $\overrightarrow{CN}$  có cùng độ dài và ngược hướng nên chúng là hai vectơ đối nhau.

b) Từ câu a, ta có  $\overrightarrow{CN} = -\overrightarrow{AM}$ .

Suy ra  $\overrightarrow{SC} - \overrightarrow{AM} - \overrightarrow{AN} = \overrightarrow{SC} + \overrightarrow{CN} - \overrightarrow{AN} = \overrightarrow{SN} - \overrightarrow{AN} = \overrightarrow{SN} + \overrightarrow{NA} = \overrightarrow{SA}$ .

» **Luyện tập 6.** Trong Ví dụ 6, chứng minh rằng:

a)  $\overrightarrow{BN}$  và  $\overrightarrow{DM}$  là hai vectơ đối nhau;

b)  $\overrightarrow{SD} - \overrightarrow{BN} - \overrightarrow{CM} = \overrightarrow{SC}$ .

» **Vận dụng 2.** Thang cuốn tại các trung tâm thương mại, siêu thị lớn hay nhà ga, sân bay thường có hai làn, trong đó có một làn lên và một làn xuống. Khi thang cuốn chuyển động, vectơ biểu diễn vận tốc của mỗi làn có là hai vectơ đối nhau hay không? Giải thích vì sao.

Tốc độ di chuyển của thang cuốn thường từ 0,5 m/s đến 0,75 m/s. Khi sử dụng thang cuốn cần giữ tay vịn, tránh để trang phục vướng vào thang và chú ý giám sát trẻ nhỏ đi cùng.

#### 3. TÍCH CỦA MỘT SỐ VỚI MỘT VECTƠ TRONG KHÔNG GIAN

» **HĐ6.** Hình thành khái niệm tích của một số với một vectơ trong không gian

Cho hình lăng trụ tam giác  $ABC.A'B'C'$ . Gọi  $M, N$  lần lượt là trung điểm của  $AB, AC$  (H.2.17).

a) Hai vectơ  $\overrightarrow{MN}$  và  $\overrightarrow{B'C'}$  có cùng phương không? Có cùng hướng không?

b) Giải thích vì sao  $|\overrightarrow{MN}| = \frac{1}{2}|\overrightarrow{B'C'}|$ .

Hình 2.17

Tương tự như tích của một số với một vectơ trong mặt phẳng, ta có định nghĩa về tích của một số với một vectơ trong không gian:

Trong không gian, tích của một số thực  $k \neq 0$  với một vectơ  $\vec{a} \neq \vec{0}$  là một vectơ, kí hiệu là  $k\vec{a}$ , được xác định như sau:

- Cùng hướng với vectơ  $\vec{a}$  nếu  $k > 0$ ; ngược hướng với vectơ  $\vec{a}$  nếu  $k < 0$ ;
- Có độ dài bằng  $|k| \cdot |\vec{a}|$ .

Trong không gian, phép lấy tích của một số với một vectơ được gọi là **phép nhân một số với một vectơ**.

Hai vectơ  $1\vec{a}$  và  $\vec{a}$  có bằng nhau không? Hai vectơ  $(-1)\vec{a}$  và  $-\vec{a}$  có bằng nhau không?

###### **Chú ý**

- Quy ước  $k\vec{a} = \vec{0}$  nếu  $k = 0$  hoặc  $\vec{a} = \vec{0}$ .
- Nếu  $k\vec{a} = \vec{0}$  thì  $k = 0$  hoặc  $\vec{a} = \vec{0}$ .
- Trong không gian, điều kiện cần và đủ để hai vectơ  $\vec{a}$  và  $\vec{b}$  ( $\vec{b} \neq \vec{0}$ ) cùng phương là có một số thực  $k$  sao cho  $\vec{a} = k\vec{b}$ .

» **Ví dụ 7.** Trong HĐ6, gọi  $O$  là giao điểm của  $AB'$  và  $A'B$  (H.2.18).

Chứng minh rằng  $\vec{CC'} = (-2)\vec{OM}$ .

###### **Giải**

Vì  $O$  là trung điểm của  $AB'$  nên  $OM$  là đường trung bình của tam giác  $AB'B$ . Suy ra  $B'B \parallel OM$  và  $B'B = 2OM$ . Từ giác  $BCC'B'$  là hình bình hành nên  $B'B \parallel C'C$  và  $B'B = C'C$ . Do đó  $C'C \parallel OM$  và  $C'C = 2OM$ . Vì hai vectơ  $\vec{CC'}$  và  $\vec{OM}$  ngược hướng nên  $\vec{CC'} = (-2)\vec{OM}$ .

Hình 2.18

» **Luyện tập 7.** Cho hình chóp  $S.ABCD$  có đáy  $ABCD$  là hình bình hành. Gọi  $E, F$  lần lượt là các điểm thuộc các cạnh  $SA, SB$  sao cho  $SE = \frac{1}{3}SA$ ;  $SF = \frac{1}{3}SB$ . Chứng minh rằng  $\vec{EF} = \frac{1}{3}\vec{DC}$ .

**Chú ý.** Tương tự như phép nhân một số với một vectơ trong mặt phẳng, phép nhân một số với một vectơ trong không gian có các tính chất sau:

- Tính chất kết hợp: Nếu  $h, k$  là hai số thực và  $\vec{a}$  là một vectơ bất kì thì  $h(k\vec{a}) = (hk)\vec{a}$ .
- Tính chất phân phối: Nếu  $h, k$  là hai số thực và  $\vec{a}, \vec{b}$  là hai vectơ bất kì thì  $(h + k)\vec{a} = h\vec{a} + k\vec{a}$  và  $k(\vec{a} + \vec{b}) = k\vec{a} + k\vec{b}$ .
- Tính chất nhân với 1 và -1: Nếu  $\vec{a}$  là một vectơ bất kì thì  $1\vec{a} = \vec{a}$  và  $(-1)\vec{a} = -\vec{a}$ .

» **Ví dụ 8.** Cho tứ diện  $ABCD$ . Gọi  $G$  là trọng tâm của tam giác  $BCD$  (H.2.19). Chứng minh rằng  $\overrightarrow{AB} + \overrightarrow{AC} + \overrightarrow{AD} = 3\overrightarrow{AG}$ .

**Giải**

Vì  $G$  là trọng tâm của tam giác  $BCD$  nên  $\overrightarrow{GB} + \overrightarrow{GC} + \overrightarrow{GD} = \vec{0}$ .

Do đó ta có:  $\overrightarrow{AB} + \overrightarrow{AC} + \overrightarrow{AD} = \overrightarrow{AG} + \overrightarrow{GB} + \overrightarrow{AG} + \overrightarrow{GC} + \overrightarrow{AG} + \overrightarrow{GD}$   
 $= 3\overrightarrow{AG} + (\overrightarrow{GB} + \overrightarrow{GC} + \overrightarrow{GD}) = 3\overrightarrow{AG} + \vec{0} = 3\overrightarrow{AG}$ .

**Chú ý.** Tương tự như trong mặt phẳng, nếu  $G$  là trọng tâm của tam giác  $ABC$  thì với điểm  $O$  tuỳ ý, ta có

$$\overrightarrow{OA} + \overrightarrow{OB} + \overrightarrow{OC} = 3\overrightarrow{OG}.$$

Hình 2.19

» **Luyện tập 8.** Trong Ví dụ 8, gọi  $I$  là điểm thuộc đoạn thẳng  $AG$  sao cho  $\overrightarrow{AI} = 3\overrightarrow{IG}$  (H.2.19). Chứng minh rằng

$$\overrightarrow{IA} + \overrightarrow{IB} + \overrightarrow{IC} + \overrightarrow{ID} = \vec{0}.$$

Điểm  $I$  trong Luyện tập 8 được gọi là **trọng tâm** của tứ diện  $ABCD$ .

» **Vận dụng 3.** Khi chuyển động trong không gian, máy bay luôn chịu tác động của bốn lực chính: lực đẩy của động cơ, lực cản của không khí, trọng lực và lực nâng khí động học (H.2.20). Lực cản của không khí ngược hướng với lực đẩy của động cơ và có độ lớn tỉ lệ thuận với bình phương vận tốc máy bay. Một chiếc máy bay tăng vận tốc từ 900 km/h lên 920 km/h, trong quá trình tăng tốc máy bay giữ nguyên hướng bay. Lực cản của không khí khi máy bay đạt vận tốc 900 km/h và 920 km/h lần lượt được biểu diễn bởi hai vectơ  $\vec{F}_1$  và  $\vec{F}_2$ . Hãy giải thích vì sao  $\vec{F}_1 = k\vec{F}_2$  với  $k$  là một số thực dương nào đó. Tính giá trị của  $k$  (làm tròn kết quả đến chữ số thập phân thứ hai).

Hình 2.20

#### 4. TÍCH VÔ HƯỚNG CỦA HAI VECTƠ TRONG KHÔNG GIAN

##### a) Góc giữa hai vectơ trong không gian

» **HĐ7.** Hình thành khái niệm góc giữa hai vectơ trong không gian

Trong không gian, cho hai vectơ  $\vec{a}$ ,  $\vec{b}$  khác  $\vec{0}$ . Lấy điểm  $O$  và vẽ các vectơ  $\overrightarrow{OA} = \vec{a}$ ,  $\overrightarrow{OB} = \vec{b}$ . Lấy điểm  $O'$  khác  $O$  và vẽ các vectơ  $\overrightarrow{O'A'} = \vec{a}$ ,  $\overrightarrow{O'B'} = \vec{b}$  (H.2.21).

a) Giải thích vì sao  $\overrightarrow{AB} = \overrightarrow{A'B'}$ .

b) Áp dụng định lí côsin cho hai tam giác  $OAB$  và  $O'A'B'$  để giải thích vì sao  $\widehat{AOB} = \widehat{A'O'B'}$ .

Hình 2.21

Áp dụng định lí côsin cho tam giác  $OAB$ , ta có:

$$\cos \widehat{AOB} = \frac{OA^2 + OB^2 - AB^2}{2OA \cdot OB}$$

Trong không gian, cho hai vectơ  $\vec{a}, \vec{b}$  khác  $\vec{0}$ . Lấy một điểm  $O$  bất kì và gọi  $A, B$  là hai điểm sao cho  $\overrightarrow{OA} = \vec{a}, \overrightarrow{OB} = \vec{b}$ . Khi đó, góc  $\widehat{AOB}$  ( $0^\circ \leq \widehat{AOB} \leq 180^\circ$ ) được gọi là **góc giữa hai vectơ  $\vec{a}$  và  $\vec{b}$** , kí hiệu là  $(\vec{a}, \vec{b})$ .

Hình 2.22

Nếu góc giữa hai vectơ  $\vec{a}$  và  $\vec{b}$  là  $90^\circ$  thì ta nói hai vectơ  $\vec{a}$  và  $\vec{b}$  vuông góc với nhau và kí hiệu là  $\vec{a} \perp \vec{b}$ .

###### Chú ý

- Để xác định góc giữa hai vectơ  $\overrightarrow{AB}$  và  $\overrightarrow{CD}$  trong không gian ta có thể lấy điểm  $E$  sao cho  $\overrightarrow{AE} = \overrightarrow{CD}$ , khi đó  $(\overrightarrow{AB}, \overrightarrow{CD}) = \widehat{BAE}$  (H.2.23).
- Quy ước góc giữa một vectơ bất kì và  $\vec{0}$  có thể nhận một giá trị tuỳ ý từ  $0^\circ$  đến  $180^\circ$ .

Hình 2.23

Xác định góc giữa hai vectơ cùng hướng (và khác  $\vec{0}$ ), góc giữa hai vectơ ngược hướng trong không gian.

» **Ví dụ 9.** Cho hình lập phương  $ABCD.A'B'C'D'$  (H.2.24). Tính góc giữa các cặp vectơ sau:

- a)  $\overrightarrow{AD}$  và  $\overrightarrow{B'C'}$ ;      b)  $\overrightarrow{AC}$  và  $\overrightarrow{A'D'}$ .

**Giải**

- a) Hai vectơ  $\overrightarrow{AD}$  và  $\overrightarrow{B'C'}$  cùng hướng nên  $(\overrightarrow{AD}, \overrightarrow{B'C'}) = 0^\circ$ .  
 b) Vì tứ giác  $ADD'A'$  là hình bình hành nên  $\overrightarrow{AD} = \overrightarrow{A'D'}$ .  
 Do đó  $(\overrightarrow{AC}, \overrightarrow{A'D'}) = (\overrightarrow{AC}, \overrightarrow{AD}) = \widehat{CAD}$ . Tam giác  $ADC$  vuông cân tại  $D$  nên  $\widehat{CAD} = 45^\circ$ , vì vậy  $(\overrightarrow{AC}, \overrightarrow{A'D'}) = 45^\circ$ .

» **Luyện tập 9.** Cho hình lăng trụ tam giác đều  $ABC.A'B'C'$  (H.2.25). Tính các góc  $(\overrightarrow{AA'}, \overrightarrow{BC})$  và  $(\overrightarrow{AB}, \overrightarrow{A'C'})$ .

Hình 2.24

Hình 2.25

##### b) Tích vô hướng của hai vectơ trong không gian

» **HĐ8.** Nhận biết khái niệm tích vô hướng của hai vectơ trong không gian

Hãy nhắc lại công thức xác định tích vô hướng của hai vectơ trong mặt phẳng.

Trong không gian, cho hai vectơ  $\vec{a}, \vec{b}$  đều khác  $\vec{0}$ . **Tích vô hướng** của hai vectơ  $\vec{a}$  và  $\vec{b}$  là một số, kí hiệu là  $\vec{a} \cdot \vec{b}$ , được xác định bởi công thức:

$$\vec{a} \cdot \vec{b} = |\vec{a}| \cdot |\vec{b}| \cdot \cos(\vec{a}, \vec{b}).$$

**Chú ý**

- Quy ước nếu  $\vec{a} = \vec{0}$  hoặc  $\vec{b} = \vec{0}$  thì  $\vec{a} \cdot \vec{b} = 0$ .
- Cho hai vectơ  $\vec{a}, \vec{b}$  đều khác  $\vec{0}$ . Khi đó:  $\vec{a} \perp \vec{b} \Leftrightarrow \vec{a} \cdot \vec{b} = 0$ .
- Với mọi vectơ  $\vec{a}$ , ta có  $\vec{a}^2 = |\vec{a}|^2$ .
- Nếu  $\vec{a}, \vec{b}$  là hai vectơ khác  $\vec{0}$  thì  $\cos(\vec{a}, \vec{b}) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ .

» **Ví dụ 10.** Cho hình chóp tứ giác đều  $S.ABCD$  có độ dài tất cả các cạnh bằng  $a$  (H.2.26). Tính các tích vô hướng sau:

- a)  $\overrightarrow{AS} \cdot \overrightarrow{BC}$ ;      b)  $\overrightarrow{AS} \cdot \overrightarrow{AC}$ .

**Giải**

- a) Tam giác  $SAD$  có ba cạnh bằng nhau nên là tam giác đều, suy ra  $\widehat{SAD} = 60^\circ$ . Tứ giác  $ABCD$  là hình vuông nên  $\overrightarrow{AD} = \overrightarrow{BC}$ , suy ra  $(\overrightarrow{AS}, \overrightarrow{BC}) = (\overrightarrow{AS}, \overrightarrow{AD}) = \widehat{SAD} = 60^\circ$ . Do đó  $\overrightarrow{AS} \cdot \overrightarrow{BC} = |\overrightarrow{AS}| \cdot |\overrightarrow{BC}| \cdot \cos 60^\circ = a \cdot a \cdot \frac{1}{2} = \frac{a^2}{2}$ .

Hình 2.26

b) Tứ giác  $ABCD$  là hình vuông có độ dài mỗi cạnh là  $a$  nên độ dài đường chéo  $AC$  là  $\sqrt{2}a$ .  
 Tam giác  $SAC$  có  $SA = SC = a$  và  $AC = \sqrt{2}a$  nên tam giác  $SAC$  vuông cân tại  $S$ , suy ra  $\widehat{SAC} = 45^\circ$ . Do đó  $\overline{AS} \cdot \overline{AC} = |\overline{AS}| \cdot |\overline{AC}| \cdot \cos \widehat{SAC} = a \cdot \sqrt{2}a \cdot \frac{\sqrt{2}}{2} = a^2$ .

» **Luyện tập 10.** Trong Ví dụ 10, hãy tính các tích vô hướng  $\overline{AS} \cdot \overline{BD}$  và  $\overline{AS} \cdot \overline{CD}$ .

**Nhận xét.** Tích vô hướng của hai vectơ trong không gian cũng có các tính chất giống như các tính chất của tích vô hướng của hai vectơ trong mặt phẳng. Cụ thể, nếu  $\vec{a}, \vec{b}, \vec{c}$  là các vectơ trong không gian và  $k$  là một số thực thì ta có:

- $\vec{a} \cdot \vec{b} = \vec{b} \cdot \vec{a}$ ;
- $k(\vec{a} \cdot \vec{b}) = (k\vec{a}) \cdot \vec{b} = \vec{a} \cdot (k\vec{b})$ ;
- $\vec{a} \cdot (\vec{b} + \vec{c}) = \vec{a} \cdot \vec{b} + \vec{a} \cdot \vec{c}$ .

» **Ví dụ 11.** Cho tứ diện  $ABCD$  có  $AC$  và  $BD$  cùng vuông góc với  $AB$ . Gọi  $M, N$  lần lượt là trung điểm của hai cạnh  $AB, CD$  (H.2.27). Chứng minh rằng:

a)  $\overline{MN} = \frac{1}{2}(\overline{AC} + \overline{BD})$ ;

b)  $\overline{MN} \cdot \overline{AB} = 0$ .

**Giải**

a) Ta có:  $\overline{MN} = \overline{MA} + \overline{AC} + \overline{CN}$  và  $\overline{MN} = \overline{MB} + \overline{BD} + \overline{DN}$ .

Do đó  $2\overline{MN} = (\overline{MA} + \overline{MB}) + (\overline{AC} + \overline{BD}) + (\overline{CN} + \overline{DN})$ .

Vì  $M, N$  lần lượt là trung điểm của  $AB, CD$  nên  $\overline{MA} + \overline{MB} = \overline{CN} + \overline{DN} = \vec{0}$ .

Suy ra  $2\overline{MN} = \overline{AC} + \overline{BD}$ , hay  $\overline{MN} = \frac{1}{2}(\overline{AC} + \overline{BD})$ .

b) Từ giả thiết, ta có  $\overline{AC} \cdot \overline{AB} = \overline{BD} \cdot \overline{AB} = 0$ .

Vì vậy,  $\overline{MN} \cdot \overline{AB} = \frac{1}{2}(\overline{AC} + \overline{BD}) \cdot \overline{AB} = \frac{1}{2}\overline{AC} \cdot \overline{AB} + \frac{1}{2}\overline{BD} \cdot \overline{AB} = 0$ .

Hình 2.27

» **Luyện tập 11.** Cho hình lập phương  $ABCD.A'B'C'D'$ . Chứng minh rằng  $\overline{A'C} \cdot \overline{B'D'} = 0$ .

» **Vận dụng 4.** Như đã biết, nếu có một lực  $\vec{F}$  tác động vào một vật tại điểm  $M$  và làm cho vật đó di chuyển một quãng đường  $MN$  thì công  $A$  sinh ra được tính theo công thức  $A = \vec{F} \cdot \overline{MN}$ , trong đó lực  $F$  có độ lớn tính bằng Newton, quãng đường  $MN$  tính bằng mét và công  $A$  tính bằng Jun (H.2.28). Do đó, nếu dùng một lực  $\vec{F}$  có độ lớn không đổi để làm một vật di chuyển một quãng đường không đổi thì công sinh ra sẽ lớn nhất khi lực tác động cùng hướng với chuyển động của vật. Hãy giải thích vì sao.

Kết quả trên có thể được áp dụng như thế nào khi kéo (hoặc đẩy) các vật nặng?

Hình 2.28

## Bài 7. Hệ trục toạ độ trong không gian

#### THUẬT NGỮ

- Hệ trục toạ độ trong không gian
- Toạ độ của điểm trong không gian
- Toạ độ của vectơ trong không gian

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết toạ độ của điểm, của vectơ đối với hệ trục toạ độ.
- Vận dụng toạ độ của vectơ để giải một số bài toán có liên quan đến thực tiễn.

Trong Hình 2.34, một chiếc bóng đèn được treo cách sàn nhà là 2 m, cách hai bức tường lần lượt là 1 m và 1,5 m. Kiến thức toán học nào giúp mô tả chính xác và ngắn gọn vị trí của chiếc bóng đèn trong không gian?

Hình 2.34

#### 1. HỆ TRỤC TOẠ ĐỘ TRONG KHÔNG GIAN

##### » HĐ1. Hình thành khái niệm hệ trục toạ độ trong không gian

Trong không gian, xét ba trục  $Ox$ ,  $Oy$ ,  $Oz$  có chung gốc  $O$  và đôi một vuông góc với nhau. Gọi  $\vec{i}$ ,  $\vec{j}$ ,  $\vec{k}$  là các vectơ đơn vị trên các trục đó (H.2.35).

- a) Gọi tên các mặt phẳng toạ độ có trong Hình 2.35.
- b) Các mặt phẳng toạ độ trong Hình 2.35 có đôi một vuông góc với nhau không?

Hình 2.35

Trong không gian, ba trục  $Ox$ ,  $Oy$ ,  $Oz$  đôi một vuông góc với nhau tại gốc  $O$  của mỗi trục. Gọi  $\vec{i}$ ,  $\vec{j}$ ,  $\vec{k}$  lần lượt là các vectơ đơn vị trên các trục  $Ox$ ,  $Oy$ ,  $Oz$ .

- Hệ ba trục như vậy được gọi là **hệ trục toạ độ Descartes vuông góc**  $Oxyz$ , hay đơn giản là **hệ toạ độ**  $Oxyz$ .
- Điểm  $O$  được gọi là **gốc toạ độ**.
- Các mặt phẳng  $(Oxy)$ ,  $(Oyz)$ ,  $(Ozx)$  đôi một vuông góc với nhau được gọi là các **mặt phẳng toạ độ**.

Không gian với hệ toạ độ  $Oxyz$  còn được gọi là không gian  $Oxyz$ .

**?** Góc căn phòng trong Hình 2.34 có gợi lên hình ảnh về hệ toạ độ  $Oxyz$  trong không gian hay không? Nếu có, hãy mô tả góc toạ độ và các mặt phẳng toạ độ trong hình ảnh đó.

**» Ví dụ 1.** Cho hình lập phương  $ABCD.A'B'C'D'$  có độ dài mỗi cạnh bằng 1 (H.2.36). Có thể lập một hệ toạ độ  $Oxyz$  có gốc  $O$  trùng với đỉnh  $B'$  và các vectơ  $\vec{i}, \vec{j}, \vec{k}$  lần lượt là các vectơ  $\overrightarrow{B'A'}$ ,  $\overrightarrow{B'C'}$ ,  $\overrightarrow{B'B}$  không? Giải thích vì sao.

**Giải**

Hình lập phương  $ABCD.A'B'C'D'$  có các cạnh  $B'A'$ ,  $B'C'$  và  $B'B$  đôi một vuông góc với nhau.

Vì hình lập phương có độ dài mỗi cạnh bằng 1 nên các vectơ  $\overrightarrow{B'A'}$ ,  $\overrightarrow{B'C'}$ ,  $\overrightarrow{B'B}$  cùng có điểm đầu là  $B'$  và đều có độ dài bằng 1.

Từ các điều trên, suy ra có thể lập một hệ toạ độ  $Oxyz$  có gốc  $O$  trùng với đỉnh  $B'$  và các vectơ  $\vec{i}, \vec{j}, \vec{k}$  lần lượt là các vectơ  $\overrightarrow{B'A'}$ ,  $\overrightarrow{B'C'}$ ,  $\overrightarrow{B'B}$ .

Hình 2.36

**» Luyện tập 1.** Cho hình hộp chữ nhật  $ABCD.A'B'C'D'$ . Có thể lập một hệ toạ độ  $Oxyz$  có gốc  $O$  trùng với đỉnh  $C$  và các vectơ  $\vec{i}, \vec{j}, \vec{k}$  lần lượt cùng hướng với các vectơ  $\overrightarrow{CB}$ ,  $\overrightarrow{CD}$ ,  $\overrightarrow{CC'}$  không? Giải thích vì sao.

#### 2. TOẠ ĐỘ CỦA ĐIỂM, TOẠ ĐỘ CỦA VECTO TRONG KHÔNG GIAN

**» HD2.** Hình thành khái niệm toạ độ của điểm trong không gian

Trong không gian  $Oxyz$ , cho một điểm  $M$  không thuộc các mặt phẳng toạ độ. Vẽ hình hộp chữ nhật  $OADB.CFME$  có ba đỉnh  $A, B, C$  lần lượt thuộc các tia  $Ox, Oy, Oz$  (H.2.37).

a) Hai vectơ  $\overrightarrow{OM}$  và  $\overrightarrow{OA} + \overrightarrow{OB} + \overrightarrow{OC}$  có bằng nhau hay không?

b) Giải thích vì sao có thể viết  $\overrightarrow{OM} = x\vec{i} + y\vec{j} + z\vec{k}$  với  $x, y, z$  là các số thực.

Hình 2.37

Người ta chứng minh được rằng với điểm  $M$  tuỳ ý, bộ ba số  $(x; y; z)$  trong HD2 là duy nhất. Ngược lại nếu  $\overrightarrow{OM} = x\vec{i} + y\vec{j} + z\vec{k}$  thì điểm  $M$  xác định duy nhất.

Trong không gian  $Oxyz$ , cho một điểm  $M$  tuỳ ý. Bộ ba số  $(x; y; z)$  duy nhất sao cho  $\overrightarrow{OM} = x\vec{i} + y\vec{j} + z\vec{k}$  được gọi là **toạ độ** của điểm  $M$  đối với hệ toạ độ  $Oxyz$ . Khi đó, ta viết  $M = (x; y; z)$  hoặc  $M(x; y; z)$ , trong đó  $x$  là **hoành độ**,  $y$  là **tung độ** và  $z$  là **cao độ** của  $M$ .

**?** Hãy tìm toạ độ của gốc  $O$ .

» **Ví dụ 2.** Hình 2.38 minh hoạ một hệ toạ độ  $Oxyz$  trong không gian cùng với các hình vuông có cạnh bằng 1 đơn vị. Tìm toạ độ của điểm  $M$ .

**Giải**

Trong Hình 2.38,  $ABCM.FODE$  là hình hộp chữ nhật.

Áp dụng quy tắc hình hộp suy ra

$$\overrightarrow{OM} = \overrightarrow{OF} + \overrightarrow{OD} + \overrightarrow{OB} = 3\vec{i} + 4\vec{j} + 3\vec{k}.$$

Vì vậy, toạ độ của điểm  $M$  là  $(3; 4; 3)$ .

Hình 2.38

» **Luyện tập 2.** Tìm toạ độ của điểm  $N$  trong Hình 2.39.

» **Ví dụ 3.** Trong không gian  $Oxyz$ , cho hình hộp chữ nhật  $ABCD.A'B'C'D'$  có đỉnh  $A'$  trùng với gốc  $O$  và các đỉnh  $D', B', A$  lần lượt thuộc các tia  $Ox, Oy, Oz$  (H.2.40). Giả sử đỉnh  $C$  có toạ độ là  $(2; 3; 5)$  đối với hệ toạ độ  $Oxyz$ , hãy tìm toạ độ của các đỉnh  $D', B', A$  đối với hệ toạ độ đó.

**Giải**

Vì đỉnh  $D'$  thuộc tia  $Ox$  nên hai vectơ  $\overrightarrow{OD'}$  và  $\vec{i}$  cùng phương, suy ra có số thực  $m$  sao cho  $\overrightarrow{OD'} = m\vec{i}$ . Tương tự, có các số thực  $n, p$  sao cho  $\overrightarrow{OB'} = n\vec{j}$  và  $\overrightarrow{OA} = p\vec{k}$ . Theo quy tắc hình hộp, suy ra  $\overrightarrow{OC} = \overrightarrow{OD'} + \overrightarrow{OB'} + \overrightarrow{OA} = m\vec{i} + n\vec{j} + p\vec{k}$  và do đó điểm  $C$  có toạ độ là  $(m; n; p)$ .

Mặt khác, đỉnh  $C$  có toạ độ là  $(2; 3; 5)$  nên  $m = 2, n = 3, p = 5$ , tức là  $\overrightarrow{OD'} = 2\vec{i}, \overrightarrow{OB'} = 3\vec{j}$  và  $\overrightarrow{OA} = 5\vec{k}$ .

Từ đây suy ra  $D'(2; 0; 0), B'(0; 3; 0)$  và  $A(0; 0; 5)$ .

Hình 2.39

Hình 2.40

» **Luyện tập 3.** Trong Ví dụ 3, hãy xác định toạ độ của các điểm  $B, D$  và  $C'$ .

**Nhận xét.** Nếu điểm  $M$  có toạ độ  $(x; y; z)$  đối với hệ toạ độ  $Oxyz$  thì:

- Hình chiếu vuông góc của  $M$  trên các trục  $Ox, Oy$  và  $Oz$  có toạ độ lần lượt là  $(x; 0; 0), (0; y; 0)$  và  $(0; 0; z)$ .
- Hình chiếu vuông góc của  $M$  trên các mặt phẳng  $(Oxy), (Oyz)$  và  $(Ozx)$  có toạ độ lần lượt là  $(x; y; 0), (0; y; z)$  và  $(x; 0; z)$ .

» **Vận dụng 1.** Trong tình huống mở đầu, hãy chọn một hệ toạ độ phù hợp và xác định toạ độ của chiếc bóng đèn đối với hệ toạ độ đó.

» **HĐ3.** Hình thành khái niệm toạ độ của vectơ trong không gian

Trong không gian  $Oxyz$ , cho vectơ  $\vec{a}$  tuỳ ý (H.2.41).

Lấy điểm  $M$  sao cho  $\overrightarrow{OM} = \vec{a}$  và giải thích vì sao có bộ ba số  $(x; y; z)$  sao cho  $\vec{a} = x\vec{i} + y\vec{j} + z\vec{k}$ .

Hình 2.41

Người ta chứng minh được rằng bộ ba số  $(x; y; z)$  trong  $HĐ3$  là duy nhất.

Trong không gian  $Oxyz$ , cho vectơ  $\vec{a}$  tuỳ ý. Bộ ba số  $(x; y; z)$  duy nhất sao cho  $\vec{a} = x\vec{i} + y\vec{j} + z\vec{k}$  được gọi là **toạ độ của vectơ**  $\vec{a}$  đối với hệ toạ độ  $Oxyz$ . Khi đó, ta viết  $\vec{a} = (x; y; z)$  hoặc  $\vec{a} (x; y; z)$ .

##### Nhận xét

- Toạ độ của vectơ  $\vec{a}$  cũng là toạ độ của điểm  $M$  sao cho  $\vec{OM} = \vec{a}$ .
- Trong không gian, cho hai vectơ  $\vec{a} = (x; y; z)$  và  $\vec{b} = (x'; y'; z')$ . Khi đó,  $\vec{a} = \vec{b}$  nếu và chỉ nếu 
$$\begin{cases} x = x' \\ y = y' \\ z = z' \end{cases}$$

» **Ví dụ 4.** Trong không gian  $Oxyz$ , hãy tìm toạ độ của các vectơ  $\vec{i}, \vec{j}$  và  $\vec{k}$ .

**Giải**

Vì  $\vec{i} = 1 \cdot \vec{i} + 0 \cdot \vec{j} + 0 \cdot \vec{k}$  nên  $\vec{i} = (1; 0; 0)$ .

Vì  $\vec{j} = 0 \cdot \vec{i} + 1 \cdot \vec{j} + 0 \cdot \vec{k}$  nên  $\vec{j} = (0; 1; 0)$ .

Vì  $\vec{k} = 0 \cdot \vec{i} + 0 \cdot \vec{j} + 1 \cdot \vec{k}$  nên  $\vec{k} = (0; 0; 1)$ .

» **Luyện tập 4.** Trong không gian  $Oxyz$ , hãy xác định toạ độ của vectơ  $\vec{i} + 2\vec{j} + 5\vec{k}$ .

» **HĐ4.** Thiết lập toạ độ của vectơ theo toạ độ hai đầu mút

Trong không gian  $Oxyz$ , cho hai điểm  $M(x_M; y_M; z_M)$  và  $N(x_N; y_N; z_N)$ .

a) Hãy biểu diễn hai vectơ  $\vec{OM}$  và  $\vec{ON}$  qua các vectơ  $\vec{i}, \vec{j}$  và  $\vec{k}$ .

b) Xác định toạ độ của vectơ  $\vec{MN}$ .

Trong không gian  $Oxyz$ , cho hai điểm  $M(x_M; y_M; z_M)$  và  $N(x_N; y_N; z_N)$ . Khi đó:

$$\vec{MN} = (x_N - x_M; y_N - y_M; z_N - z_M).$$

» **Ví dụ 5.** Trong không gian  $Oxyz$ , cho hình lăng trụ tam giác  $ABC.A'B'C'$  có  $A(1; 0; 2)$ ,  $B(3; 2; 5)$ ,  $C(7; -3; 9)$  và  $A'(5; 0; 1)$ .

a) Tìm toạ độ của  $\vec{AA'}$ .

b) Tìm toạ độ của các điểm  $B'$ ,  $C'$ .

**Giải** (H.2.42)

a) Ta có:  $\vec{AA'} = (x_{A'} - x_A; y_{A'} - y_A; z_{A'} - z_A) = (4; 0; -1)$ .

b) Gọi toạ độ của điểm  $B'$  là  $(x; y; z)$  thì  $\vec{BB'} = (x - 3; y - 2; z - 5)$ . Vì  $ABC.A'B'C'$  là hình lăng trụ nên  $ABB'A'$  là hình bình hành, suy ra  $\vec{AA'} = \vec{BB'}$ .

Hình 2.42

Do đó  $\begin{cases} x - 3 = 4 \\ y - 2 = 0 \\ z - 5 = -1 \end{cases}$  hay  $x = 7, y = 2$  và  $z = 4$ . Vậy  $B'(7; 2; 4)$ .

Lập luận tương tự suy ra  $C'(11; -3; 8)$ .

» **Luyện tập 5.** Trong Ví dụ 5, xác định toạ độ của các điểm  $D$  và  $D'$  sao cho  $ABCD.A'B'C'D'$  là hình hộp.

» **Vận dụng 2.** Để theo dõi hành trình của một chiếc máy bay, ta có thể lập hệ toạ độ  $Oxyz$  có gốc  $O$  trùng với vị trí của trung tâm kiểm soát không lưu, mặt phẳng  $(Oxy)$  trùng với mặt đất (được coi là phẳng) với trục  $Ox$  hướng về phía tây, trục  $Oy$  hướng về phía nam và trục  $Oz$  hướng thẳng đứng lên trời (H.2.43). Sau khi cất cánh và đạt độ cao nhất định, chiếc máy bay duy trì hướng bay về phía nam với tốc độ không đổi là 890 km/h trong nửa giờ. Xác định toạ độ của vectơ biểu diễn độ dịch chuyển của chiếc máy bay trong nửa giờ đó đối với hệ toạ độ đã chọn, biết rằng đơn vị đo trong không gian  $Oxyz$  được lấy theo kilômét.

Hình 2.43

## Bài 8. Biểu thức toạ độ của các phép toán vectơ

#### KIẾN THỨC, KĨ NĂNG

- Nhận biết biểu thức toạ độ của các phép toán vectơ trong không gian, thể hiện các phép toán vectơ theo toạ độ, xác định độ dài của một vectơ khi biết toạ độ hai đầu mút.
- Vận dụng biểu thức toạ độ của các phép toán vectơ để giải một số bài toán có liên quan đến thực tiễn.

Những căn nhà gỗ trong Hình 2.47a được phác thảo dưới dạng một hình lăng trụ đứng tam giác  $OAB.O'A'B'$  như trong Hình 2.47b. Với hệ trục toạ độ  $Oxyz$  thể hiện như Hình 2.47b (đơn vị đo lấy theo centimét), hai điểm  $A'$  và  $B'$  có toạ độ lần lượt là  $(240; 450; 0)$  và  $(120; 450; 300)$ . Từ những thông tin trên, có thể tính được kích thước mỗi chiều của những căn nhà gỗ hay không?

a)

b)

Hình 2.47

#### 1. BIỂU THỨC TOẠ ĐỘ CỦA PHÉP CỘNG HAI VECTO, PHÉP TRỪ HAI VECTO, PHÉP NHÂN MỘT SỐ VỚI MỘT VECTO

**HĐ1.** Hình thành biểu thức toạ độ của phép cộng hai vectơ, phép trừ hai vectơ, phép nhân một số với một vectơ trong không gian

Trong không gian  $Oxyz$ , cho hai vectơ  $\vec{a} = (1; 0; 5)$  và  $\vec{b} = (1; 3; 9)$ .

- Biểu diễn hai vectơ  $\vec{a}$  và  $\vec{b}$  qua các vectơ đơn vị  $\vec{i}, \vec{j}, \vec{k}$ .
- Biểu diễn hai vectơ  $\vec{a} + \vec{b}$  và  $2\vec{a}$  qua các vectơ đơn vị  $\vec{i}, \vec{j}, \vec{k}$ , từ đó xác định toạ độ của hai vectơ đó.

Trong không gian  $Oxyz$ , cho hai vectơ  $\vec{a} = (x; y; z)$  và  $\vec{b} = (x'; y'; z')$ . Ta có:

- $\vec{a} + \vec{b} = (x + x'; y + y'; z + z')$ ;
- $\vec{a} - \vec{b} = (x - x'; y - y'; z - z')$ ;
- $k\vec{a} = (kx; ky; kz)$  với  $k$  là một số thực.

Nếu toạ độ của vectơ  $\vec{a}$  là  $(x; y; z)$  thì toạ độ của vectơ đối của  $\vec{a}$  là gì?

**Nhận xét.** Vector  $\vec{a} = (x; y; z)$  cùng phương với vector  $\vec{b} = (x'; y'; z') \neq \vec{0}$  khi và chỉ khi tồn tại

số thực  $k$  sao cho 
$$\begin{cases} x = kx' \\ y = ky' \\ z = kz' \end{cases}$$

» **Ví dụ 1.** Trong không gian  $Oxyz$ , cho hai vector  $\vec{a} = (2; 1; 5)$  và  $\vec{b} = (2; 2; 1)$ . Tìm toạ độ của mỗi vector sau:

a)  $\vec{a} - \vec{b}$ ;                      b)  $3\vec{a} + 2\vec{b}$ .

**Giải**

a) Vì  $\vec{a} = (2; 1; 5)$  và  $\vec{b} = (2; 2; 1)$  nên  $\vec{a} - \vec{b} = (2 - 2; 1 - 2; 5 - 1) = (0; -1; 4)$ .

b) Ta có  $3\vec{a} = (3 \cdot 2; 3 \cdot 1; 3 \cdot 5) = (6; 3; 15)$  và  $2\vec{b} = (2 \cdot 2; 2 \cdot 2; 2 \cdot 1) = (4; 4; 2)$ .

Do đó  $3\vec{a} + 2\vec{b} = (6 + 4; 3 + 4; 15 + 2) = (10; 7; 17)$ .

» **Luyện tập 1.** Trong không gian  $Oxyz$ , cho ba vector  $\vec{u} = (1; 8; 6)$ ,  $\vec{v} = (-1; 3; -2)$  và  $\vec{w} = (0; 5; 4)$ . Tìm toạ độ của vector  $\vec{u} - 2\vec{v} + \vec{w}$ .

» **HĐ2. Thiết lập toạ độ trung điểm đoạn thẳng, toạ độ trọng tâm tam giác**

Trong không gian  $Oxyz$ , cho tam giác  $ABC$  có  $A(x_A; y_A; z_A)$ ,  $B(x_B; y_B; z_B)$  và  $C(x_C; y_C; z_C)$ .

a) Gọi  $M$  là trung điểm của đoạn thẳng  $AB$ . Tìm toạ độ của  $M$  theo toạ độ của  $A$  và  $B$ .

b) Gọi  $G$  là trọng tâm của tam giác  $ABC$ . Tìm toạ độ của  $G$  theo toạ độ của  $A$ ,  $B$  và  $C$ .

Ta đã biết:

$$\overrightarrow{OM} = \frac{1}{2}(\overrightarrow{OA} + \overrightarrow{OB});$$

$$\overrightarrow{OG} = \frac{1}{3}(\overrightarrow{OA} + \overrightarrow{OB} + \overrightarrow{OC}).$$

Trong không gian  $Oxyz$ , cho ba điểm không thẳng hàng  $A(x_A; y_A; z_A)$ ,  $B(x_B; y_B; z_B)$  và  $C(x_C; y_C; z_C)$ . Khi đó:

– Toạ độ trung điểm của đoạn thẳng  $AB$  là  $\left(\frac{x_A + x_B}{2}; \frac{y_A + y_B}{2}; \frac{z_A + z_B}{2}\right)$ ;

– Toạ độ trọng tâm của tam giác  $ABC$  là  $\left(\frac{x_A + x_B + x_C}{3}; \frac{y_A + y_B + y_C}{3}; \frac{z_A + z_B + z_C}{3}\right)$ .

» **Ví dụ 2.** Trong không gian  $Oxyz$ , cho ba điểm  $A(1; 2; 3)$ ,  $B(3; 2; 1)$  và  $C(2; -1; 5)$ . Tìm toạ độ trung điểm  $M$  của đoạn thẳng  $AB$  và toạ độ trọng tâm  $G$  của tam giác  $ABC$ .

**Giải**

Vì  $M$  là trung điểm của đoạn thẳng  $AB$  nên toạ độ của điểm  $M$  là  $\left(\frac{1+3}{2}; \frac{2+2}{2}; \frac{3+1}{2}\right)$ , suy ra  $M(2; 2; 2)$ .

Vì  $G$  là trọng tâm của tam giác  $ABC$  nên toạ độ của điểm  $G$  là  $\left(\frac{1+3+2}{3}; \frac{2+2+(-1)}{3}; \frac{3+1+5}{3}\right)$ , suy ra  $G(2; 1; 3)$ .

» **Luyện tập 2.** Trong không gian Oxyz, cho ba điểm  $A(2; 9; -1)$ ,  $B(9; 4; 5)$  và  $G(3; 0; 4)$ . Tìm toạ độ điểm C sao cho tam giác ABC nhận G là trọng tâm.

#### 2. BIỂU THỨC TOẠ ĐỘ CỦA TÍCH VÔ HƯỚNG

» **HĐ3.** Thiết lập biểu thức toạ độ của tích vô hướng trong không gian

Trong không gian Oxyz, cho hai vectơ  $\vec{a} = (x; y; z)$  và  $\vec{b} = (x'; y'; z')$ .

- Giải thích vì sao  $\vec{i} \cdot \vec{i} = 1$  và  $\vec{i} \cdot \vec{j} = \vec{i} \cdot \vec{k} = 0$ .
- Sử dụng biểu diễn  $\vec{a} = x\vec{i} + y\vec{j} + z\vec{k}$  để tính các tích vô hướng  $\vec{a} \cdot \vec{i}$ ,  $\vec{a} \cdot \vec{j}$  và  $\vec{a} \cdot \vec{k}$ .
- Sử dụng biểu diễn  $\vec{b} = x'\vec{i} + y'\vec{j} + z'\vec{k}$  để tính tích vô hướng  $\vec{a} \cdot \vec{b}$ .

Trong không gian Oxyz, tích vô hướng của hai vectơ  $\vec{a} = (x; y; z)$  và  $\vec{b} = (x'; y'; z')$  được xác định bởi công thức:

$$\vec{a} \cdot \vec{b} = xx' + yy' + zz'.$$

##### Nhận xét

- Hai vectơ  $\vec{a}$  và  $\vec{b}$  vuông góc với nhau nếu và chỉ nếu  $xx' + yy' + zz' = 0$ .
- Nếu  $\vec{a} = (x; y; z)$  thì  $|\vec{a}| = \sqrt{\vec{a} \cdot \vec{a}} = \sqrt{x^2 + y^2 + z^2}$ .
- Nếu  $\vec{a} = (x; y; z)$  và  $\vec{b} = (x'; y'; z')$  là hai vectơ khác  $\vec{0}$  thì

$$\cos(\vec{a}, \vec{b}) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|} = \frac{xx' + yy' + zz'}{\sqrt{x^2 + y^2 + z^2} \cdot \sqrt{x'^2 + y'^2 + z'^2}}.$$

» **Ví dụ 3.** Trong không gian Oxyz, cho hai vectơ  $\vec{a} = (1; 4; 2)$  và  $\vec{b} = (-4; 1; 0)$ .

- Tính  $\vec{a} \cdot \vec{b}$  và cho biết hai vectơ  $\vec{a}$  và  $\vec{b}$  có vuông góc với nhau hay không.
- Tính độ dài của vectơ  $\vec{a}$ .

###### Giải

- Ta có:  $\vec{a} \cdot \vec{b} = 1 \cdot (-4) + 4 \cdot 1 + 2 \cdot 0 = 0$ . Do đó, hai vectơ  $\vec{a}$  và  $\vec{b}$  vuông góc với nhau.
- Độ dài của vectơ  $\vec{a}$  là  $|\vec{a}| = \sqrt{1^2 + 4^2 + 2^2} = \sqrt{21}$ .

» **Luyện tập 3.** Trong Ví dụ 3, tính  $(\vec{a} + \vec{b})^2$ .

» **Ví dụ 4.** Cho hình chóp S.ABCD có đáy ABCD là hình chữ nhật và SA vuông góc với mặt phẳng (ABCD). Giả sử  $SA = 2$ ,  $AB = 3$ ,  $AD = 4$ . Xét hệ toạ độ Oxyz với O trùng A và các tia Ox, Oy, Oz lần lượt trùng với các tia AB, AD, AS (H.2.48).

- Xác định toạ độ của các điểm S, A, B, C, D.
- Tính BD và SC.
- Tính  $(\overrightarrow{BD}, \overrightarrow{SC})$ .

###### Giải

- Vì A trùng gốc toạ độ nên  $A(0; 0; 0)$ . Vì B thuộc tia Ox và  $AB = 3$  nên  $B(3; 0; 0)$ . Vì D thuộc tia Oy và  $AD = 4$  nên  $D(0; 4; 0)$ . Vì S thuộc tia Oz và  $AS = 2$  nên  $S(0; 0; 2)$ . Vì hình chiếu của C lên các trục Ox, Oy, Oz lần lượt là B, D, A nên  $C(3; 4; 0)$ .

Hình 2.48

b) Ta có  $\overrightarrow{BD} = (0 - 3; 4 - 0; 0 - 0) = (-3; 4; 0)$ , suy ra  $BD = |\overrightarrow{BD}| = \sqrt{(-3)^2 + 4^2 + 0^2} = 5$ .

Ta có  $\overrightarrow{SC} = (3 - 0; 4 - 0; 0 - 2) = (3; 4; -2)$ , suy ra  $SC = |\overrightarrow{SC}| = \sqrt{3^2 + 4^2 + (-2)^2} = \sqrt{29}$ .

c) Ta có  $\cos(\overrightarrow{BD}, \overrightarrow{SC}) = \frac{\overrightarrow{BD} \cdot \overrightarrow{SC}}{|\overrightarrow{BD}| \cdot |\overrightarrow{SC}|} = \frac{(-3) \cdot 3 + 4 \cdot 4 + 0 \cdot (-2)}{5\sqrt{29}} = \frac{7}{5\sqrt{29}}$ , suy ra  $(\overrightarrow{BD}, \overrightarrow{SC}) \approx 74,9^\circ$ .

**Chú ý.** Nếu  $A(x_A; y_A; z_A)$  và  $B(x_B; y_B; z_B)$  thì  $AB = |\overrightarrow{AB}| = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$ .

Đặc biệt, khi  $B$  trùng  $O$  ta nhận được công thức  $OA = \sqrt{x_A^2 + y_A^2 + z_A^2}$ .

» **Luyện tập 4.** Trong không gian  $Oxyz$ , cho  $A(0; 2; 1)$ ,  $B(3; -2; 1)$  và  $C(-2; 5; 7)$ .

a) Tính chu vi của tam giác  $ABC$ .

b) Tính  $\widehat{BAC}$ .

#### 3. VẬN DỤNG TOẠ ĐỘ CỦA VECTƠ TRONG MỘT SỐ BÀI TOÁN CÓ LIÊN QUAN ĐẾN THỰC TIỄN

» **Ví dụ 5.** Trong không gian với một hệ trục toạ độ cho trước (đơn vị đo lẩy theo kilômét), ra đa phát hiện một chiếc máy bay di chuyển với vận tốc và hướng không đổi từ điểm  $A(800; 500; 7)$  đến điểm  $B(940; 550; 8)$  trong 10 phút. Nếu máy bay tiếp tục giữ nguyên vận tốc và hướng bay thì toạ độ của máy bay sau 5 phút tiếp theo là gì?

Hình 2.49

**Giải** (H.2.49)

Gọi  $C(x; y; z)$  là vị trí của máy bay sau 5 phút tiếp theo. Vì hướng của máy bay không đổi nên  $\overrightarrow{AB}$  và  $\overrightarrow{BC}$  cùng hướng. Do vận tốc của máy bay không đổi và thời gian bay từ  $A$  đến  $B$  gấp đôi thời gian bay từ  $B$  đến  $C$  nên  $AB = 2BC$ .

$$\text{Do đó } \overrightarrow{BC} = \frac{1}{2} \overrightarrow{AB} = \left( \frac{940 - 800}{2}; \frac{550 - 500}{2}; \frac{8 - 7}{2} \right) = (70; 25; 0,5).$$

$$\text{Mặt khác, } \overrightarrow{BC} = (x - 940; y - 550; z - 8) \text{ nên } \begin{cases} x - 940 = 70 \\ y - 550 = 25 \\ z - 8 = 0,5. \end{cases}$$

$$\text{Từ đó } \begin{cases} x = 1010 \\ y = 575 \\ z = 8,5 \end{cases} \text{ và vì vậy } C(1010; 575; 8,5).$$

Vậy toạ độ của máy bay sau 5 phút tiếp theo là  $(1010; 575; 8,5)$ .

» **Luyện tập 5.** Với các giả thiết như trong Ví dụ 5, hãy xác định toạ độ của chiếc máy bay sau 10 phút tiếp theo (tính từ thời điểm máy bay ở điểm B).

» **Ví dụ 6.** Hãy trả lời câu hỏi trong tình huống mở đầu.

**Giải.** Vì điểm  $A'$  có toạ độ là  $(240; 450; 0)$  nên khoảng cách từ  $A'$  đến các trục  $Ox$ ,  $Oy$  lần lượt là 450 cm và 240 cm. Suy ra  $A'A = 450$  cm và  $A'O' = 240$  cm. Từ giả thiết suy ra  $\overrightarrow{A'B'} = (-120; 0; 300)$ , do đó  $A'B' = |\overrightarrow{A'B'}| = \sqrt{(-120)^2 + 0^2 + 300^2} = 60\sqrt{29} \approx 323$  (cm).

Vì  $O'O = A'A = 450$  cm và  $O'$  nằm trên trục  $Oy$  nên toạ độ của điểm  $O'$  là  $(0; 450; 0)$ .

Do đó  $\overrightarrow{O'B'} = (120; 0; 300)$  và  $O'B' = |\overrightarrow{O'B'}| = \sqrt{120^2 + 0^2 + 300^2} = 60\sqrt{29} \approx 323$  (cm).

Vậy mỗi căn nhà gỗ có chiều dài là 450 cm, chiều rộng là 240 cm, mỗi cạnh bên của mặt tiền có độ dài là 323 cm.

Góc  $\alpha$  chính là góc giữa mặt bên của căn nhà gỗ và mặt đất.

» **Luyện tập 6.** Trong tình huống mở đầu, hãy tính độ lớn của góc  $\alpha$ .

» **Ví dụ 7.** Hai chiếc khinh khí cầu bay lên từ cùng một địa điểm. Chiếc thứ nhất nằm cách điểm xuất phát 2 km về phía nam và 1 km về phía đông, đồng thời cách mặt đất 0,5 km. Chiếc thứ hai nằm cách điểm xuất phát 1 km về phía bắc và 1,5 km về phía tây, đồng thời cách mặt đất 0,8 km.

Chọn hệ trục toạ độ  $Oxyz$  với gốc  $O$  đặt tại điểm xuất phát của hai khinh khí cầu, mặt phẳng  $(Oxy)$  trùng với mặt đất với trục  $Ox$  hướng về phía nam, trục  $Oy$  hướng về phía đông và trục  $Oz$  hướng thẳng đứng lên trời (H.2.50), đơn vị đo lấy theo kilômét.

a) Tìm toạ độ của mỗi chiếc khinh khí cầu đối với hệ toạ độ đã chọn.

b) Xác định khoảng cách giữa hai khinh khí cầu (làm tròn kết quả đến chữ số thập phân thứ hai).

Hình 2.50

**Giải**

a) Chiếc khinh khí cầu thứ nhất và thứ hai có toạ độ lần lượt là  $(2; 1; 0,5)$  và  $(-1; -1,5; 0,8)$ .

b) Khoảng cách giữa hai chiếc khinh khí cầu là

$$\sqrt{(-1-2)^2 + (-1,5-1)^2 + (0,8-0,5)^2} = \sqrt{15,34} \approx 3,92 \text{ (km)}.$$

» **Luyện tập 7.** Trong Ví dụ 7, khinh khí cầu thứ nhất hay thứ hai ở xa điểm xuất phát hơn? Giải thích vì sao.

# CHƯƠNG III. CÁC SỐ ĐẶC TRƯNG ĐO MỨC ĐỘ PHÂN TÁN CỦA MẪU SỐ LIỆU GHÉP NHÓM

## Bài 9. Khoảng biến thiên và khoảng tứ phân vị

#### THUẬT NGỮ

- Khoảng biến thiên
- Khoảng tứ phân vị

#### KIẾN THỨC, KĨ NĂNG

- Tính khoảng biến thiên, khoảng tứ phân vị của mẫu số liệu ghép nhóm.
- Hiểu ý nghĩa, vai trò của khoảng biến thiên, khoảng tứ phân vị trong việc đo mức độ phân tán.

Thống kê số ngày trong tháng Sáu năm 2021 và năm 2022 theo nhiệt độ cao nhất trong ngày tại Hà Nội, người ta thu được bảng sau:

| Nhiệt độ (°C)              | [28; 30) | [30; 32) | [32; 34) | [34; 36) | [36; 38) | [38; 40) |
|----------------------------|----------|----------|----------|----------|----------|----------|
| Số ngày trong tháng 6/2021 | 0        | 2        | 8        | 5        | 6        | 9        |
| Số ngày trong tháng 6/2022 | 2        | 3        | 4        | 11       | 8        | 2        |

(Theo [accuweather.com](http://accuweather.com))

Hỏi tháng Sáu năm nào ở Hà Nội nhiệt độ cao nhất trong ngày biến đổi nhiều hơn?

Để biết tháng Sáu năm nào ở Hà Nội nhiệt độ cao nhất trong ngày biến đổi nhiều hơn, ta cần tính và so sánh các số đặc trưng đo mức độ phân tán của hai mẫu số liệu ghép nhóm trên. Chúng ta cùng tìm hiểu vấn đề này!

#### 1. KHOẢNG BIẾN THIÊN

» **HĐ1.** Trong tình huống mở đầu, gọi  $x_1, x_2, \dots, x_{30}$  là nhiệt độ cao nhất trong ngày của 30 ngày tháng Sáu năm 2021 (mẫu số liệu gốc).

- Có thể tính chính xác khoảng biến thiên cho mẫu số liệu gốc hay không?
- Giá trị lớn nhất, giá trị nhỏ nhất  $x_i$  có thể nhận là gì?
- Hãy đưa ra một giá trị xấp xỉ cho khoảng biến thiên của mẫu số liệu gốc.

Cho mẫu số liệu ghép nhóm:

| Nhóm   | $[a_1; a_2)$ | ... | $[a_i; a_{i+1})$ | ... | $[a_k; a_{k+1})$ |
|--------|--------------|-----|------------------|-----|------------------|
| Tần số | $m_1$        | ... | $m_i$            | ... | $m_k$            |

Bảng 3.1. Mẫu số liệu ghép nhóm

trong đó các tần số  $m_1 > 0$ ,  $m_k > 0$  và  $n = m_1 + \dots + m_k$  là cỡ mẫu.

Khoảng biến thiên của mẫu số liệu ghép nhóm trên là  $R = a_{k+1} - a_1$ .

**?** Chỉ ra rằng khoảng biến thiên của mẫu số liệu ghép nhóm trong Bảng 3.1 lớn hơn khoảng biến thiên của mẫu số liệu gốc.

**Ý nghĩa.** Khoảng biến thiên của mẫu số liệu ghép nhóm xấp xỉ cho khoảng biến thiên của mẫu số liệu gốc. Khoảng biến thiên được dùng để đo mức độ phân tán của mẫu số liệu ghép nhóm. Khoảng biến thiên càng lớn thì mẫu số liệu càng phân tán.

» **Ví dụ 1.** Thống kê thời gian sử dụng mạng xã hội trong ngày của các bạn Tỏ 1, Tỏ 2 lớp 12A, được kết quả như bảng sau:

| Thời gian sử dụng (phút) | $[0; 10)$ | $[10; 30)$ | $[30; 60)$ | $[60; 90)$ |
|--------------------------|-----------|------------|------------|------------|
| Số học sinh Tỏ 1         | 2         | 4          | 3          | 1          |
| Số học sinh Tỏ 2         | 5         | 1          | 3          | 0          |

Tìm khoảng biến thiên cho thời gian sử dụng mạng xã hội của học sinh mỗi tỗ và giải thích ý nghĩa.

**Giải**

Gọi  $R_1, R_2$  tương ứng là khoảng biến thiên của mẫu số liệu ghép nhóm về thời gian sử dụng mạng xã hội trong ngày của các bạn Tỏ 1 và Tỏ 2.

Ta có:  $R_1 = 90 - 0 = 90$  và  $R_2 = 60 - 0 = 60$ .

Do  $R_1 > R_2$  nên ta có thể kết luận rằng thời gian sử dụng mạng xã hội trong ngày của các bạn Tỏ 1 phân tán hơn thời gian sử dụng mạng xã hội của các bạn Tỏ 2.

» **Luyện tập 1.** Thời gian hoàn thành bài kiểm tra môn Toán của các bạn trong lớp 12C được cho trong bảng sau:

|                  |          |          |          |          |
|------------------|----------|----------|----------|----------|
| Thời gian (phút) | [25; 30) | [30; 35) | [35; 40) | [40; 45) |
| Số học sinh      | 8        | 16       | 4        | 2        |

- a) Tính khoảng biến thiên  $R$  cho mẫu số liệu ghép nhóm trên.  
 b) Nếu biết học sinh hoàn thành bài kiểm tra sớm nhất mất 27 phút và muộn nhất mất 43 phút thì khoảng biến thiên của mẫu số liệu gốc là bao nhiêu?

#### 2. KHOẢNG TỨ PHÂN VỊ

» **HĐ2.** Trong tình huống mở đầu, gọi  $y_1, y_2, \dots, y_{30}$  là nhiệt độ cao nhất trong ngày của 30 ngày tháng Sáu năm 2022 (mẫu số liệu gốc).

- a) Có thể tính chính xác khoảng tứ phân vị của mẫu số liệu gốc hay không?  
 b) Tìm tứ phân vị thứ nhất  $Q_1$  và tứ phân vị thứ ba  $Q_3$  cho mẫu số liệu ghép nhóm.  
 c) Hãy đưa ra một giá trị xấp xỉ cho khoảng tứ phân vị của mẫu số liệu gốc.

Xét mẫu số liệu ghép nhóm cho bởi Bảng 3.1.

Tứ phân vị thứ  $r$  là

$$Q_r = a_p + \frac{\frac{r \cdot n}{4} - (m_1 + \dots + m_{p-1})}{m_p} \cdot (a_{p+1} - a_p),$$

trong đó  $[a_p; a_{p+1})$  là nhóm chứa tứ phân vị thứ  $r$  với  $r = 1, 2, 3$ .

Khoảng tứ phân vị của mẫu số liệu ghép nhóm, kí hiệu là  $\Delta_Q$ , là hiệu số giữa tứ phân vị thứ ba  $Q_3$  và tứ phân vị thứ nhất  $Q_1$  của mẫu số liệu đó, tức là  $\Delta_Q = Q_3 - Q_1$ .

**Ý nghĩa.** Khoảng tứ phân vị của mẫu số liệu ghép nhóm xấp xỉ cho khoảng tứ phân vị của mẫu số liệu gốc. Khoảng tứ phân vị cũng được dùng để đo mức độ phân tán của mẫu số liệu ghép nhóm. Khoảng tứ phân vị càng lớn thì mẫu số liệu càng phân tán.

**Nhận xét.** Do khoảng tứ phân vị của mẫu số liệu ghép nhóm chỉ phụ thuộc vào nửa giữa của mẫu số liệu, nên không bị ảnh hưởng bởi các giá trị bất thường và có thể dùng đại lượng này để loại giá trị bất thường.

» **Ví dụ 2.** Thời gian chờ khám bệnh của các bệnh nhân tại phòng khám X được cho trong bảng sau:

|                  |        |         |          |          |
|------------------|--------|---------|----------|----------|
| Thời gian (phút) | [0; 5) | [5; 10) | [10; 15) | [15; 20) |
| Số bệnh nhân     | 3      | 12      | 15       | 8        |

- a) Tìm khoảng tứ phân vị của mẫu số liệu ghép nhóm này.  
 b) Từ một mẫu số liệu về thời gian chờ khám bệnh của các bệnh nhân tại phòng khám Y người ta tính được khoảng tứ phân vị bằng 9,23. Hỏi thời gian chờ của bệnh nhân tại phòng khám nào phân tán hơn?

###### Giải

a) Cỡ mẫu là  $n = 3 + 12 + 15 + 8 = 38$ . Gọi  $x_1, \dots, x_{38}$  là thời gian chờ khám bệnh của 38 bệnh nhân này và giả sử rằng dãy số liệu gốc này đã được sắp xếp theo thứ tự tăng dần.

Tứ phân vị thứ nhất của mẫu số liệu gốc là  $x_{10}$  nên nhóm chứa tứ phân vị thứ nhất là nhóm  $[5; 10)$  và ta có:

$$Q_1 = 5 + \left[ \frac{\frac{38}{4} - 3}{12} \right] \cdot 5 \approx 7,71.$$

Tứ phân vị thứ ba của mẫu số liệu gốc là  $x_{29}$  nên nhóm chứa tứ phân vị thứ ba là nhóm  $[10; 15)$  và ta có:

$$Q_3 = 10 + \left[ \frac{\frac{3 \cdot 38}{4} - 15}{15} \right] \cdot 5 = 14,5.$$

Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là:  $\Delta_Q = Q_3 - Q_1 \approx 14,5 - 7,71 = 6,79$ .

b) Do  $\Delta_Q = 6,79 < 9,23$  nên thời gian chờ của bệnh nhân tại phòng khám Y phân tán hơn thời gian chờ của bệnh nhân tại phòng khám X.

» **Luyện tập 2.** Một người ghi lại thời gian đàm thoại của một số cuộc gọi cho kết quả như bảng sau:

| Thời gian $t$ (phút) | Số cuộc gọi |
|----------------------|-------------|
| $0 \leq t < 1$       | 8           |
| $1 \leq t < 2$       | 17          |
| $2 \leq t < 3$       | 25          |
| $3 \leq t < 4$       | 20          |
| $4 \leq t < 5$       | 10          |

Tính khoảng tứ phân vị của mẫu số liệu ghép nhóm trên.

» **Vận dụng.** Hãy giải bài toán trong tình huống mở đầu bằng cách sử dụng khoảng biến thiên và khoảng tứ phân vị của mẫu số liệu ghép nhóm.

## Bài 10. Phương sai và độ lệch chuẩn

#### **THUẬT NGỮ**

- Phương sai
- Độ lệch chuẩn

#### **KIẾN THỨC, KĨ NĂNG**

- Tính phương sai, độ lệch chuẩn của mẫu số liệu ghép nhóm.
- Hiểu ý nghĩa, vai trò của phương sai, độ lệch chuẩn trong việc đo mức độ phân tán.

Để xác định độ ổn định của một máy đo độ ẩm không khí, người ta dùng máy này để đo 20 lần. Nếu độ lệch chuẩn của mẫu số liệu đo lớn hơn 0,15 thì người ta sẽ đưa máy đo đi sửa chữa. Trong một lần lấy mẫu, kĩ thuật viên có được mẫu số liệu ghép nhóm sau:

|           |            |              |              |              |              |
|-----------|------------|--------------|--------------|--------------|--------------|
| Độ ẩm (%) | [52; 52,1) | [52,1; 52,2) | [52,2; 52,3) | [52,3; 52,4) | [52,4; 52,5) |
| Tần số    | 1          | 5            | 8            | 4            | 2            |

Liệu có cần đưa máy đo này đi sửa chữa hay không?

#### **1. PHƯƠNG SAI VÀ ĐỘ LỆCH CHUẨN**

» **HĐ1.** Trở lại bài toán trong tình huống mở đầu. Gọi  $x_1, \dots, x_{20}$  là các kết quả đo (mẫu số liệu gốc).

- a) Có thể tính được chính xác phương sai và độ lệch chuẩn của mẫu số liệu gốc hay không?
- b) Thảo luận và đề xuất ước lượng cho phương sai và độ lệch chuẩn của mẫu số liệu gốc.

Xét mẫu số liệu ghép nhóm cho bởi Bảng 3.1.

- Phương sai của mẫu số liệu ghép nhóm, kí hiệu là  $s^2$ , là một số được tính theo công thức sau:

$$s^2 = \frac{m_1(x_1 - \bar{x})^2 + \dots + m_k(x_k - \bar{x})^2}{n};$$

trong đó,  $n = m_1 + \dots + m_k$ ;  $x_i = \frac{a_i + a_{i+1}}{2}$  với  $i = 1, 2, \dots, k$  là giá trị đại diện cho nhóm

$[a_i; a_{i+1})$  và  $\bar{x} = \frac{m_1x_1 + \dots + m_kx_k}{n}$  là số trung bình của mẫu số liệu ghép nhóm.

- Độ lệch chuẩn của mẫu số liệu ghép nhóm, kí hiệu là  $s$ , là căn bậc hai số học của phương sai của mẫu số liệu ghép nhóm, tức là  $s = \sqrt{s^2}$ .

**Nhận xét.** Ta có thể tính phương sai theo công thức:  $s^2 = \frac{1}{n}(m_1 \cdot x_1^2 + \dots + m_k \cdot x_k^2) - (\bar{x})^2$ .

Độ lệch chuẩn có cùng đơn vị với đơn vị của mẫu số liệu.

**Ý nghĩa.** Phương sai, độ lệch chuẩn của mẫu số liệu ghép nhóm là các xấp xỉ cho phương sai, độ lệch chuẩn của mẫu số liệu gốc. Chúng được dùng để đo mức độ phân tán của mẫu số liệu ghép nhóm xung quanh số trung bình của mẫu số liệu đó. Phương sai, độ lệch chuẩn càng lớn thì mẫu số liệu càng phân tán.

**Chú ý.** Người ta còn sử dụng các đại lượng sau để đo mức độ phân tán của mẫu số liệu ghép nhóm:

$$\hat{s}^2 = \frac{m_1(x_1 - \bar{x})^2 + \dots + m_k(x_k - \bar{x})^2}{n - 1}, \quad \hat{s} = \sqrt{\hat{s}^2}.$$

» **Ví dụ 1.** Người ta theo dõi sự thay đổi cân nặng, được tính bằng hiệu cân nặng trước và sau ba tháng áp dụng chế độ ăn kiêng của một số người cho kết quả như sau:

| Thay đổi cân nặng (kg) | [-1; 0) | [0; 1) | [1; 2) | [2; 3) | [3; 4) |
|------------------------|---------|--------|--------|--------|--------|
| Số người nam           | 2       | 3      | 5      | 3      | 2      |
| Số người nữ            | 2       | 7      | 12     | 7      | 2      |

Tính số trung bình, phương sai, độ lệch chuẩn và nhận xét về sự thay đổi cân nặng của người nam, người nữ sau ba tháng áp dụng chế độ ăn kiêng.

**Giải**

Chọn giá trị đại diện cho các nhóm số liệu, ta có:

| Giá trị đại diện | -0,5 | 0,5 | 1,5 | 2,5 | 3,5 |
|------------------|------|-----|-----|-----|-----|
| Số người nam     | 2    | 3   | 5   | 3   | 2   |
| Số người nữ      | 2    | 7   | 12  | 7   | 2   |

Tổng số người nam là:  $n_1 = 2 + 3 + 5 + 3 + 2 = 15$ .

Tổng số người nữ là:  $n_2 = 2 + 7 + 12 + 7 + 2 = 30$ .

Thay đổi cân nặng trung bình của người nam là:

$$\bar{x}_1 = \frac{1}{15} [2 \cdot (-0,5) + 3 \cdot 0,5 + 5 \cdot 1,5 + 3 \cdot 2,5 + 2 \cdot 3,5] = 1,5 \text{ (kg)}.$$

Thay đổi cân nặng trung bình của người nữ là:

$$\bar{x}_2 = \frac{1}{30} [2 \cdot (-0,5) + 7 \cdot 0,5 + 12 \cdot 1,5 + 7 \cdot 2,5 + 2 \cdot 3,5] = 1,5 \text{ (kg)}.$$

Phương sai và độ lệch chuẩn của mẫu số liệu về thay đổi cân nặng của người nam là:

$$s_1^2 = \frac{1}{15} [2 \cdot (-0,5)^2 + 3 \cdot 0,5^2 + 5 \cdot 1,5^2 + 3 \cdot 2,5^2 + 2 \cdot 3,5^2] - 1,5^2 \approx 1,21^2; \quad s_1 \approx 1,21.$$

Phương sai và độ lệch chuẩn của mẫu số liệu về thay đổi cân nặng của người nữ là:

$$s_2^2 = \frac{1}{30} [2 \cdot (-0,5)^2 + 7 \cdot 0,5^2 + 12 \cdot 1,5^2 + 7 \cdot 2,5^2 + 2 \cdot 3,5^2] - 1,5^2 \approx 2,06^2; \quad s_2 \approx 2,06.$$

Như vậy, sau ba tháng áp dụng chế độ ăn kiêng này, về trung bình sự thay đổi cân nặng của nam và nữ là như nhau. Tuy nhiên, sự biến động về thay đổi cân nặng của nữ nhiều hơn so với của nam.

» **Luyện tập 1.** Một vận động viên luyện tập chạy cự li 100 m đã ghi lại kết quả luyện tập như sau:

|                  |              |              |              |            |
|------------------|--------------|--------------|--------------|------------|
| Thời gian (giây) | [10,2; 10,4) | [10,4; 10,6) | [10,6; 10,8) | [10,8; 11) |
| Số vận động viên | 3            | 7            | 8            | 2          |

Tìm phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm này. Phương sai và độ lệch chuẩn cho biết điều gì?

» **Vận dụng.** Hãy tính độ lệch chuẩn của mẫu số liệu ghép nhóm cho bài toán trong tình huống mở đầu và cho biết có cần đưa máy đi sửa chữa hay không.

#### 2. SỬ DỤNG PHƯƠNG SAI, ĐỘ LỆCH CHUẨN ĐO ĐỘ RỦI RO

Trong tài chính, người ta có nhiều cách để đo độ rủi ro của một phương án đầu tư. Một trong các cách đó là sử dụng độ lệch chuẩn của lợi nhuận thu được theo phương án đầu tư. Độ lệch chuẩn càng lớn thì phương án đầu tư càng rủi ro.

» **Ví dụ 2.** Anh An đầu tư số tiền bằng nhau vào hai lĩnh vực kinh doanh A, B. Anh An thống kê số tiền thu được mỗi tháng trong vòng 60 tháng theo mỗi lĩnh vực cho kết quả như sau:

|                                |         |          |          |          |          |
|--------------------------------|---------|----------|----------|----------|----------|
| Số tiền (triệu đồng)           | [5; 10) | [10; 15) | [15; 20) | [20; 25) | [25; 30) |
| Số tháng đầu tư vào lĩnh vực A | 5       | 10       | 30       | 10       | 5        |
| Số tháng đầu tư vào lĩnh vực B | 20      | 5        | 10       | 5        | 20       |

So sánh giá trị trung bình và độ lệch chuẩn của số tiền thu được mỗi tháng khi đầu tư vào mỗi lĩnh vực A, B. Đầu tư vào lĩnh vực nào "rủi ro" hơn?

**Giải**

Chọn giá trị đại diện cho các nhóm số liệu ta có:

|                                |     |      |      |      |      |
|--------------------------------|-----|------|------|------|------|
| Giá trị đại diện               | 7,5 | 12,5 | 17,5 | 22,5 | 27,5 |
| Số tháng đầu tư vào lĩnh vực A | 5   | 10   | 30   | 10   | 5    |
| Số tháng đầu tư vào lĩnh vực B | 20  | 5    | 10   | 5    | 20   |

Số tiền trung bình thu được khi đầu tư vào các lĩnh vực A, B tương ứng là:

$$\bar{x}_A = \frac{1}{60}(5 \cdot 7,5 + \dots + 5 \cdot 27,5) = 17,5 \text{ (triệu đồng)};$$

$$\bar{x}_B = \frac{1}{60}(20 \cdot 7,5 + \dots + 20 \cdot 27,5) = 17,5 \text{ (triệu đồng)}.$$

Như vậy, về trung bình đầu tư vào các lĩnh vực A, B số tiền thu được hàng tháng như nhau. Độ lệch chuẩn của số tiền thu được hàng tháng khi đầu tư vào các lĩnh vực A, B tương ứng là:

$$s_A = \sqrt{\frac{1}{60}(5 \cdot 7,5^2 + \dots + 5 \cdot 27,5^2) - (17,5)^2} = 5;$$

$$s_B = \sqrt{\frac{1}{60}(20 \cdot 7,5^2 + \dots + 20 \cdot 27,5^2) - (17,5)^2} \approx 8,42.$$

Như vậy, độ lệch chuẩn của mẫu số liệu về số tiền thu được hàng tháng khi đầu tư vào lĩnh vực B cao hơn khi đầu tư vào lĩnh vực A. Người ta nói rằng, đầu tư vào lĩnh vực B là "rủi ro" hơn.

Ví dụ sau cho thấy không phải lúc nào ta cũng có thể dùng độ lệch chuẩn của lợi nhuận thu được để so sánh độ rủi ro của các phương án đầu tư.

» **Ví dụ 3.** Thống kê lợi nhuận hàng tháng (đơn vị: triệu đồng) trong 20 tháng của hai nhà đầu tư được cho như sau:

|           |          |          |          |          |          |
|-----------|----------|----------|----------|----------|----------|
| Lợi nhuận | [10; 20) | [20; 30) | [30; 40) | [40; 50) | [50; 60) |
| Số tháng  | 2        | 4        | 8        | 4        | 2        |

**Bảng 3.2. Lợi nhuận theo tháng của nhà đầu tư nhỏ**

|           |            |            |            |            |            |
|-----------|------------|------------|------------|------------|------------|
| Lợi nhuận | [510; 520) | [520; 530) | [530; 540) | [540; 550) | [550; 560) |
| Số tháng  | 4          | 3          | 6          | 3          | 4          |

**Bảng 3.3. Lợi nhuận theo tháng của nhà đầu tư lớn**

Tính độ lệch chuẩn của hai mẫu số liệu ghép nhóm trên. Có nên dựa vào độ lệch chuẩn để so sánh độ rủi ro của hai nhà đầu tư này không?

**Giải**

Chọn điểm đại diện cho các nhóm số liệu ta tính được các số đặc trưng như sau:

Lợi nhuận trung bình một tháng của các nhà đầu tư tương ứng là:

$$\bar{x}_A = \frac{1}{20}(2 \cdot 15 + \dots + 2 \cdot 55) = 35 \text{ (triệu đồng)}; \quad \bar{x}_B = \frac{1}{20}(4 \cdot 515 + \dots + 4 \cdot 555) = 535 \text{ (triệu đồng)}.$$

Độ lệch chuẩn của lợi nhuận hàng tháng của hai nhà đầu tư tương ứng là:

$$s_A = \sqrt{\frac{1}{20}(2 \cdot 15^2 + \dots + 2 \cdot 55^2) - (35)^2} \approx 10,95;$$

$$s_B = \sqrt{\frac{1}{20}(4 \cdot 515^2 + \dots + 4 \cdot 555^2) - (535)^2} \approx 13,78.$$

Độ lệch chuẩn cho lợi nhuận hàng tháng của nhà đầu tư lớn cao hơn của nhà đầu tư nhỏ. Lợi nhuận trung bình của hai nhà đầu tư khác nhau rất nhiều, do đó ta không nên dùng độ lệch chuẩn để so sánh mức độ rủi ro của hai nhà đầu tư này.

**Nhận xét.** Ta không nên dùng phương sai hay độ lệch chuẩn để so sánh độ rủi ro của hai phương án đầu tư khi lợi nhuận trung bình của hai phương án đầu tư này khác nhau rất nhiều.

##### ● **Em có biết?** ●

Để so sánh độ phân tán của hai mẫu số liệu khi đơn vị đo trên hai mẫu số liệu khác nhau hoặc giá trị trung bình của hai mẫu số liệu này khác nhau rất nhiều người ta dùng hệ số biến thiên CV (Coefficient of Variation). Hệ số biến thiên được tính theo công thức:

$$CV = \frac{s}{\bar{x}},$$

trong đó  $s$  là độ lệch chuẩn và  $\bar{x}$  là số trung bình của mẫu số liệu.
