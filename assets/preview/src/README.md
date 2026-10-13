# Promo — video giới thiệu MASTER THPT

Phim 42,5 giây · 1920 × 1080 · 60 fps · H.264 / AAC stereo.

## Thay đổi chính

- Máy bay vào trạm nhanh hơn khoảng 17% và từ trạm sang bom nhanh hơn khoảng 16%; vẫn giữ thời gian đọc giao diện.
- Cảnh “Yếu chỗ nào. Luyện đúng chỗ đó.” kéo dài 6 giây (12–18 giây), thay cho 3 giây. Đường bay có nhịp chạm trạm, sang bom và rời khung hình rõ ràng.
- Tạo đề thi và Warrior chạy tốc độ gốc; bỏ các hệ số tăng tốc để ép thời lượng.
- Ting trạm tại 13,25 giây, ting bom tại 14,20 giây (máy bay bay nhanh hơn ~35%).
- Nhạc nền chạy liền mạch từ trợ lý sang Warrior, tắt dần trong 0,5 giây ngay sau ting level 3 (34,835 giây); nhạc đầy đủ tới 32 giây, sau đó bỏ arpeggio để chỉ 3 ting level vang. Từ đó chỉ còn SFX: chuyển cảnh, riser và chữ ký logo.
- Giữ luyện bom toàn màn hình, đồng hồ, gợi ý streaming hai mức rồi chọn B = 2; trợ lý streaming và click X; animation warrior.riv gốc.
- Câu kết: **Học đúng trọng tâm. Tiến bộ mỗi ngày.**

## Chạy và sửa

Cần Node.js 22+, FFmpeg trong PATH. ZIP không chứa node_modules.

```sh
npm ci
npm run studio
CHROME_PATH=/path/to/chrome node scripts/render.mjs qa
CHROME_PATH=/path/to/chrome node scripts/render.mjs video
```

Script xuất 5 đoạn với trình duyệt mới mỗi đoạn để kiểm soát bộ nhớ, rồi ghép hình không mã hóa lại và thêm nhạc một lần. Trung gian ở `src/.work/parts`; MP4 ở thư mục cha của project. Mặc định render lại toàn bộ. `RENDER_FROM_PART` chỉ dùng khi đã kiểm tra các đoạn trước thực sự không đổi.

## Timeline

| Giây | Nội dung |
|---|---|
| 0–4 | Câu hỏi mở đầu, hình vuông gấp thành máy bay |
| 4–8 | Onboarding, Xác định trình độ |
| 8–12 | Chọn sai và nhận diện điểm yếu |
| 12–15,5 | Lộ trình, chạm trạm và bom; máy bay bay ra là chuyển trang |
| 15,5–21,5 | Luyện bom: đồng hồ, gợi ý streaming, chọn B |
| 21,5–26,5 | Tạo đề theo chủ đề |
| 26,5–32,5 | Hỏi trợ lý, streaming và đóng bằng X |
| 32,5–36,5 | Warrior qua ba level |
| 36,5–42,5 | Hội tụ, logo MASTER THPT và câu kết |

## Cấu trúc source

- `src/Film.tsx`, `src/theme.ts`: timeline, chuyển cảnh và màu thương hiệu.
- `src/scenes.tsx`: dàn cảnh và đường bay; chuyển động tính theo thời gian video.
- `src/Flight.tsx`: đường Bézier, góc tiếp tuyến, tọa độ mũi máy bay.
- `src/BombPractice.tsx`: giao diện luyện bom toàn màn hình. Gợi ý chờ 0,12 giây, streaming 0,85 giây, khóa nút khi đang trả lời và tăng số mức khi hoàn tất.
- `src/NativeUI.tsx`, `src/native/`: React/SVG/CSS dựng theo web app. Không dùng screenshot cho UI.
- `src/Warrior.tsx`, `public/brand/warrior.riv`: state machine gốc, render xác định ở 60 Hz; trigger switch tại 1,0 / 2,0 / 2,33 giây của cảnh, khớp ting 33,5 / 34,5 / 34,835 giây.
- `public/fonts/`: Plus Jakarta Sans của ứng dụng, có tiếng Việt.
- `public/brand/`: logo và mascot gốc; hình mascot lộ trình ở tư thế mắt mở.
- `scripts/score.py`, `scripts/master-audio.sh`: nhạc/SFX gốc (Python + NumPy, FFmpeg).
- `cue-sheet.csv`: toàn bộ các mốc âm thanh.
- `QUALITY.md`: kiểm tra hình ảnh và phép đo MP4 cuối.

Bản 9 ở thư mục riêng; giữ nguyên các bản cũ và web app. UI, dữ liệu, con trỏ là minh họa tương tác. Bài toán có hai điểm cực trị; B = 2 là đáp án đúng. Chế độ bom chỉ thể hiện lựa chọn màu indigo, không tự ghép trạng thái chấm từng câu từ chế độ khác. Không có tính năng tạo phòng thi.
