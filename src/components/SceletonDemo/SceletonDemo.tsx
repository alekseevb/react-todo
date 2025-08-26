import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonDemo() {
	return (
		<div className='flex justify-center items-center'>
			<Skeleton className='h-60 w-[700px] m-5' />
		</div>
	)
}
