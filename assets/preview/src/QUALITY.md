# Kiểm tra bản 9 — MASTER THPT

- Máy bay vào trạm ở 13,75 giây, tới bom ở 15,20 giây, ra khỏi khung ở 17,05 giây. Ting đồng bộ theo mốc mới.
- Giữ cảnh lộ trình 6 giây và tổng phim 44 giây.
- Nhạc nền liên tục từ Warrior qua hội tụ và logo, chỉ giữ ba ting level ở 35,65 / 36,30 / 36,95 giây.
- Hình từ 18 giây trở đi giữ nguyên, tái sử dụng các đoạn đã kiểm tra của bản 8.

## Kiểm tra

- Đã xem frame 825 / 912 / 1023: mũi máy bay chạm đúng tâm trạm, tới bom, sau đó rời khung.
- Đã kiểm tra mã nguồn và dependency lock.
- Nền âm thanh ở 38,5 giây tăng từ −27,31 dBFS RMS (bản 8) lên −17,90 dBFS RMS; các cửa sổ nửa giây từ 35–39,5 giây có nhạc liên tục, không có khoảng im lặng.

## File cuối

Đã giải mã toàn bộ MP4 bằng FFmpeg, không báo lỗi.

- Thời lượng: 44.000000 giây.
- Video: H.264, 1920 × 1080, 60 fps, 2.640 frame.
- Audio: AAC stereo, 48.000 Hz.
- Integrated loudness đo trên MP4: -13.89 LUFS.
- True peak: -2.25 dBTP.
- Loudness range: 3.50 LU.
- Ting trạm ở 13,75 giây; ting bom ở 15,20 giây; ba ting warrior ở 35,65 / 36,30 / 36,95 giây.

Các số loudness trên là input đo từ file bàn giao, không phải dự báo của bộ lọc loudnorm.
