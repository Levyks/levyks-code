<script lang="ts">
	const birth = new Date('2002-09-20T10:30:00Z');
	const today = new Date();

	const diffInMs = today.getTime() - birth.getTime();
	const age = Math.floor(diffInMs / (1000 * 3600 * 24 * 365.25));
</script>

{age}
