import { SignUp } from '@clerk/nextjs';
import { AuthShell } from '@/components/auth-shell';

export default function SignUpPage() {
	return (
		<AuthShell title="Tạo hồ sơ để giữ lửa nha!" note="Có hồ sơ là lửa, XP và tiến độ được lưu lại. Mất chưa tới 1 phút.">
			<SignUp />
		</AuthShell>
	);
}
