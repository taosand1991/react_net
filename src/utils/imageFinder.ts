export const getImageUrl = (productName: string): string => {
	if (productName.toLocaleLowerCase().startsWith('samsung')) {
		return 'https://media.istockphoto.com/id/1199648781/photo/new-samsung-galaxy-note-10-android-smartphone.jpg?s=612x612&w=0&k=20&c=OVoepdXp3ibbBHm5KoouSxskXZ3pvg6zJnF1EPoR1Hc=';
	} else if (productName.toLocaleLowerCase().startsWith('iphone')) {
		return 'https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max';
	}
	return 'https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
};
